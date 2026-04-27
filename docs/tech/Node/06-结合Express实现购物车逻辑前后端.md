# 购物车逻辑前后端

```js
//定义baseUrl (接口的域名)
const baseUrl = "http://localhost:8000"
```

## 一、首页业务逻辑

### 1. 初始化显示商品列表

#### 前端部分

```js

// ----------------------产品列表数据请求和渲染的方案
function render(data, el) {
    let htmlStr = ''
    data.forEach((item) => {
        htmlStr += `
            <li>
                <a href="detail.html?id=${item.id}">
                    <div class="pic">
                        <img src="${item.pic}" alt="">
                    </div>
                    <div class="info">
                        <p class="name">${item.name}</p>
                        <p class="desc">${item.description}</p>
                        <p class="tag">${item.tag}</p>
                        <p class="price">¥${item.price}</p>
                        <p class="sale">已销售${item.sales}万件</p>
                        <p class="buy" >
                            <img class="buy-icon" src="https://img02.hua.com/m/home/img/home_buy_btn.png" alt="" data-id="${item.Id}">
                        </p>
                    </div>
                </a>
            </li>
            `
    })
    el.innerHTML = htmlStr
}
// --------------------------------加载商品数据
function loadProductData() {
    axios.get(`${baseUrl}/product`)
        .then(res => {
            let data = res.data;
            if (data.code === 0) {
                //获取送恋人的数据
                let loverList = data.list.filter((item) => {
                    return item.scene == '送女友'
                })
                //获取送长辈的数据
                let elderList = data.list.filter((item) => {
                    return item.scene == '送长辈'
                })
                //渲染送恋人的商品列表
                render(loverList, document.querySelector(".lover ul"))
                //渲染送长辈的商品列表
                render(elderList, document.querySelector(".elder ul"))
            }

        })
        .catch(err => { })
}
```

#### 后端接口

```js
//-------------------------------------查询所有商品列表
router.get("/product",async (req,res)=>{
    let sql = "select * from flower order by Id desc"
    let result  = await query(sql)
    res.send({
        code: 0,
        list: result
    })
})
```

### 2. 加入购物车逻辑

#### 前端部分

```js
// ----------------------------------加入购物车
function addCart(){
    let ul = document.querySelector(".lover ul")
    ul.addEventListener("click",(e)=>{
        e.preventDefault()
        if (e.target.classList.contains("buy-icon")){
            //获取商品id
            let {id} = e.target.dataset
			//获取用户名
            let user = localStorage.getItem("user")

            axios.post(`${baseUrl}/cart`,{
                flowerId: id,
                user
            })
            .then(res=>{
                if (res.data.code === 0){
                    location.href = './shopcart.html'
                }
            })
            .catch(err=>{
                console.log(err);
            })

        }
    })
}
```

#### 后端部分

```js
//-----------------------------------------加入购物车
router.post("/cart", async (req, res) => {
  let { flowerId, user } = req.body;
  let sql = "select * from cart where user = ? and flowerId = ?";
  let result = await query(sql, [user, flowerId]);
  if (result.length) {
    //有
    sql = "update cart set count = count + 1 where cartId = ?";
    result = await query(sql, [result[0].cartId]);
    if (result.affectedRows === 1) {
      res.send({
        code: 0,
        msg: "加入成功",
      });
    }
  } else {
    //没有
    sql = "insert into cart (user,flowerId,count,isChecked ) values (?,?,1,1)";
    result = await query(sql, [user, flowerId]);
    if (result.affectedRows === 1) {
      res.send({
        code: 0,
        msg: "加入成功",
      });
    }
  }
});
```

## 二、购物车页面逻辑

### 1. 初始化显示购物车列表

#### 前端部分

```js
//----------------------------------------渲染数据
function render(data) {
  let html = "";
  data.forEach((item) => {
    // item.isChecked = 0
    let checked = item.isChecked ? "checked" : "";
    //控制显示删除还是减少图标

    let delIcon =
      '<span class="del del-one"><i class="iconfont icon-ashbin"></i></span>';
    let reduceIcon = `<span class="del reduce">-</span>`;
    let toggleIcon = item.count > 1 ? reduceIcon : delIcon;
    html += `
            <li>
                <div class="checkbox"> 
                    <input type="checkbox" class="check" ${checked} data-cartid="${item.cartId}">
                </div>
                <div class="pic"><a href="#"><img src="${item.pic}" alt=""></a></div>
                <div class="info">
                    <p class="proName">${item.name}</p>
                    <p class="count" data-cartid="${item.cartId}">
                        <span>数量</span>
                        ${toggleIcon}
                        <span class="num">${item.count}</span>
                        <span class="add">+</span>
                    </p>
                    <p class="price">¥<span>${item.price}</span></p>
                </div>
            </li>
        `;
  });
  ulEl.innerHTML = html;
}

//--------------------------------------计算总数
function total(data) {
  let sum = 0;
  let num = 0;
  data.forEach((item) => {
    if (item.isChecked) {
      num += item.count;
      sum += item.price * item.count;
    }
  }, 0);
  totalPrice.innerText = sum;
  totalNum.innerText = num;
}

// -------------------------------------拉取数据，显示购物车信息
async function showData() {
  let user = localStorage.getItem("user");
  if (!user) {
    //未登录
    login.classList.remove("hide");
    return;
  }

  //已经登录
  let res = await axios.get(`${baseUrl}/cart`, {
    params: {
      user,
    },
  });
  let { code, list } = res.data;
  if (code === 0) {
    //有数据
    cartList.classList.remove("hide");
    footer.classList.remove("hide");
    render(list);
    total(list);
  } else {
    //没有数据
    empty.classList.remove("hide");
    ulEl.innerHTML = ''
    footer.classList.add("hide")
  }
}

showData()
```

#### 后端部分

```js
//--------------------------------------------------------查询购物车
router.get("/cart", async (req, res) => {
  let { user } = req.query;
  let sql =
    "select * from cart  join flower on cart.flowerId = flower.Id where user = ?";
  let result = await query(sql, [user]);
  if (result.length) {
    //有
    res.send({
      code: 0,
      list: result,
    });
  } else {
    //没有
    res.send({
      code: 1,
      msg: "数据为空",
    });
  }
});

```

### 2. 购物车中的交互( 增,减,删,选中)



#### 前端部分

```js
//------------------------------------------删除
async function delItem(cartid) {
  let res = await axios.delete(`${baseUrl}/cart/${cartid}`);
  let { code } = res.data;
  if (code === 0) {
    //删除成功,重新拉取数据并渲染
    showData();
  } else {
    alert("删除失败");
  }
}
// ------------------------------------------增加数量
async function addCount(cartid) {
    let res = await axios.put(`${baseUrl}/cart`,{
        cartId: cartid,
        action: 'add'
    });
    let { code } = res.data;
    if (code === 0) {
      //增加成功,重新拉取数据并渲染
      showData();
    } else {
      alert("增加失败");
    }
}
// -------------------------------------------减少数量
async function reduceCount(cartid) {
    let res = await axios.put(`${baseUrl}/cart`,{
        cartId: cartid,
        action: 'reduce'
    });
    let { code } = res.data;
    if (code === 0) {
      //减少成功,重新拉取数据并渲染
      showData();
    } else {
      alert("减少失败");
    }
}
//--------------------------------------------- 切换选中状态
async function toggleCheck(cartid) {
    let res = await axios.put(`${baseUrl}/cart`,{
        cartId: cartid,
        action: 'check'
    });
    let { code } = res.data;
    if (code === 0) {
      //切换选中状态成功,重新拉取数据并渲染
      showData();
    } else {
      alert("切换选中状态失败");
    }
}
//---------------------------------------通过事件委托，实现添加数量、减少数量，删除，切换选中状态
function cartOperate() {
  ulEl.addEventListener("click", function (e) {
    //删除
    if (e.target.classList.contains("icon-ashbin")) {
      console.log(e.target.parentNode.parentNode);
      let { cartid } = e.target.parentNode.parentNode.dataset;
      delItem(cartid);
    }
    //增加数量
    if (e.target.classList.contains("add")) {
      let { cartid } = e.target.parentNode.dataset;
      addCount(cartid);
    }
    //减少数量
    if (e.target.classList.contains("reduce")) {
      let { cartid } = e.target.parentNode.dataset;
      reduceCount(cartid);
    }
    //切换选中状态
    if (e.target.classList.contains("check")) {
      let { cartid } = e.target.dataset;
      toggleCheck(cartid);
    }
  });
}

cartOperate();
```

#### 后端部分

```js
//-------------------------------------删除购物车
router.delete("/cart/:cartId", async (req, res) => {
  let { cartId } = req.params;
  let sql = "delete from cart where cartId = ?";
  let result = await query(sql, [cartId]);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "删除成功",
    });
  }
});
//--------------------------------修改购物车 (增加，减少，选中状态)
router.put("/cart", async (req, res) => {
  let { cartId,action } = req.body;
  let sql
  if (action === 'add') sql = "update cart set count = count + 1 where cartId = ?";
  if (action === 'reduce') sql = "update cart set count = count - 1 where cartId = ?";
  if (action === 'check') sql = "update cart set isChecked = !isChecked  where cartId = ?";
  let result = await query(sql, [cartId]);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "修改成功",
    });
  }
});
```


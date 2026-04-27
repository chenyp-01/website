### 1. class的动态绑定

仅看懂代码即可，一般class处理都没有这么麻烦

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .bk {
        border: 2px solid #000;
      }

      .bg {
        background-color: #f00;
      }

      .size-1 {
        width: 300px;
        height: 100px;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <!-- class的动态绑定 -->
      <!--  "bg bk" -->
      <p :class="classObj">class的动态绑定</p>
      <p :class="(flag?'bg':'') + ' bk'">class的动态绑定</p>

      <!-- 对象语法： flag为真，则添加类名bg -->
      <!-- <p :class="{bg:flag}" class="bk">class的动态绑定</p> -->
      <!-- <p :class="{bg:flag,'size-1':isActive}">class的动态绑定</p> -->
      <!-- <p :class="classObj2">class的动态绑定</p> -->

      <!-- 数组语法 -->
      <!-- <p :class="[bkClass,bgClass]">class的动态绑定</p>
      <p :class="[isActive ? bkClass : '', bgClass]">class的动态绑定</p>
      <p :class="[{ bk: isActive },bgClass]">class的动态绑定</p>
      <p><button @click="removeClass">去掉边框</button></p> -->
    </div>

    <script src="./js/vue3.js"></script>
    <script>
      const { createApp } = Vue;
      const app = createApp({
        data() {
          return {
            // data中的数据不能有计算过程，如果有计算过程建议用computed来实现
            flag: true,
            msg: 1,
            isActive: true,
            bkClass: "bk",
            bgClass: "bg",
          };
        },
        computed: {
          classObj() {
            let class1 = "";
            if (this.flag) {
              class1 = "bg";
            }
            return class1 + " bk";
          },
          classObj2() {
            return { bg: this.flag, "size-1": this.isActive };
          },
        },
        methods: {
          removeClass() {
            this.bkClass = "";
          },
        },
      });
      app.mount("#app");
    </script>
  </body>
</html>

```

### 2. style的动态绑定

仅看懂代码即可，一般style处理都没有这么麻烦

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .bk {
        border: 2px solid #000;
      }

      .bg {
        background-color: #f00;
      }

      .size-1 {
        width: 300px;
        height: 100px;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <!-- style的动态绑定 -->
      <p :style="{ color: activeColor, fontSize: fontSize + 'px' }">
        style的动态绑定
      </p>
      <!-- <p :style="styleObject">style的动态绑定</p> -->
      <p :style="[styleObject,baseObj]">style的动态绑定</p>
      <p><button @click="removeClass">去掉边框</button></p>
    </div>

    <script src="./js/vue3.js"></script>
    <script>
      const { createApp } = Vue;
      const app = createApp({
        data() {
          return {
            activeColor: "red",
            fontSize: 30,
            styleObject: {
              color: "red",
              fontSize: "13px",
            },
            baseObj: {
              border: "1px solid red",
            },
          };
        },
        methods:{
            removeClass(){
                delete this.baseObj.border
            }
        }
      });
      app.mount("#app");
    </script>
  </body>
</html>

```


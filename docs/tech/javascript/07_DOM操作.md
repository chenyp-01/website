---
layoutClass: m-nav-layout
---

# DOM操作

## 1. DOM是什么？

DOM的全称叫Document Object Model（文档对象模型）。他提供了js一个能力：获取网页上的元素并且操作它们。

## 2. DOM树

我们把一个网页抽象为DOM树，在DOM树上的元素我们称为DOM元素，都是有互相之间的关系。

## 3. DOM操作

### 1. 获取DOM

在之前的js版本中，获取DOM需要用不同的方法

```js
document.getElementById('id值') // 单个DOM对象
document.getElementsByTagName('标签名')
document.getElementsByClassName('class值')
```

这些方法在现在不推荐使用，不好用。现在一般使用下面的方法

```js
document.querySelector('选择器') // 得到的是第一个DOM对象
document.querySelectorAll('选择器') // 得到符合条件的所有的DOM对象的集合
```

在控制台上打印获取到的DOM，展示出来的是对应元素的标签

但是实际上，这个东西是个对象。怎么样才能看到对应的对象中的属性和方法呢？？？

```js
console.log([DOM])
```

DOM对象就是一个对象，里面包含了属性和方法。

### 2. 改变网页元素的内容

#### 访问非表单元素的内容

> 双标签有内容，单标签是没有内容，只有属性 比如： <img>就是单标签，只有属性

● innerHTML

● innerText

```js
let 变量名 = document.querySelector('选择器')
console.log(变量名.innerText) // 获取到对应元素上的内容

变量名.innerText = '值' // 设置DOM对象上的内容，因为这个DOM对象和网页有关联，所以网页上对应的内容改变。
```

innerText和innerHTML的区别

在获取内容过程，前者只会获取到文本，后者可以获取到内部的标签。

在设置内容过程，前者会把文本中的标签直接展示在页面上，后者会渲染称真实的标签。

注意！！！！！！！！！！！！！！！！！！！！！！！！！不是受我们信任的带HTML标签的字符串，不要用innerHTML。innerHTML会有XSS攻击风险 （以后再说）

#### 访问表单元素中的内容

value属性表示表单中的值

设置value的操作，一般只在可输入框中进行设置。比如：把输入框中的内容清空

```js
let input = document.querySelector('input')

console.log(input.value) // 获取到最初的value值

input.value = '新的value值' // 将input中的内容设置成新的值
```

textarea元素虽然是个双标签，同时内容也是出现在标签中，但是获取到对应的值还是要用.value获取。

### 3. 访问网页元素的属性

HTML属性分为两种：原生属性和自定义属性

#### 访问原生属性

DOM对象会对HTML中原生属性有对应的映射，如果原生属性名不是关键字或者保留字，则直接用对应属性名，例如id

```js
DOM.id // 获取到对应元素的id值
DOM.id = '新的值' // html的id属性就会变成新的值
```

如果原生属性是关键字或者保留字，则会提供新的名字进行映射，例如：class变成了className

```js
DOM.className // 获取到对应的元素的class值
DOM.className = '新的值' // 设置新的class
```

当我们对这些DOM对象中的属性进行修改时，就会改变HTML上的原属性。

#### 访问自定义属性

● getAttribute(属性名) 获取对应的属性的属性值

● setAttribute(属性名, 值) 添加/修改对应的属性的值

● removeAttribute(属性名) 删除对应的属性

```js
let dom = document.querySelector('选择器')
dom.getAttribute('x')
dom.setAttribute('x', 10)
dom.removeAttribute('x')
```

#### 直接在HTML标签上添加自定义属性

```js
//在HTML标签上直接添加自定义属性
;<div data-index="1">aaa</div>
//获取自定义属性值
var value = dom.dataset.index
```

●给DOM对象直接添加一个随意的属性，只能在JS中获取，HTML上没有

```js
dom.属性名 = '值'
```

### 4. 访问网页元素的样式

#### 访问元素的行内样式

```js
/设置元素的行内样式
dom.style.属性名 = "新值"
//获取元素的行内样式-->值为字符串型
//如果获取数值为"100px", 需要得到100时，用parseInt()处理
var value = dom.style.属性名  // 不一定能获取到，得看行内有没有对应的样式

// 复合属性例如background-color在js中要用驼峰命名 backgroundColor
dom.style.backgroundColor = '值'
```

> 利用DOM.style只能获取到行内的样式，设置也只能设置到行内。
>
> 设置到行内无所谓，但是因为写css的时候不建议写到行内，所以获取操作在大部分情况下，使用这个操作不合适。
>
> 如果我们想要用这个属性获取样式，需要确保已经用js设置过了。

#### 访问元素的最终样式

上面的操作只能获取到行内样式，js提供了一个全局方法叫getComputedStyle获取最终样式

获取样式的操作不常用，最多用的获取宽高，获取宽高我们会用其他的属性，不会用样式。

```js
let 变量名 = getComputedStyle(dom)
console.log(变量名.css属性名)
```

我们可以封装一个函数getStyle，用来获取某个元素的某个样式

```js
function getStyle(ele, style) {
  return getComputedStyle(ele)[style]
}
```

> 未来我们会学习很多的属性用来获取特定的css值

#### 同时设置多个样式的操作

通过DOM.style.cssText进行获取和设置操作，它用来获取到style中的文本。

```js
dom.style.cssText // width: 200px; height: 200px;

dom.style.cssText = 'height: 300px;' // 直接把所有的style都给覆盖
// 如果要在原有基础上增加对应的样式，需要使用 +=
dom.style.cssText += '新的样式'
```

如果有相同属性，则新属性会覆盖旧属性。

### 5. 类名的设置和获取

如果想要获取到所有的类名，需要通过dom.className通过这样的方式获取到className之后，我们也可以设置

```js
console.log(dom.className) // 对应元素上所有的类名
dom.className = '类名' // 把元素之前类名全部删除，设置为新的类名
// 如果不想覆盖
dom.className += ' 类名'
```

但是这种操作很容易出现问题, 所以在后续js更新中，推出了新的方法dom.classList

● add 添加类名

● remove 移除类名

● toggle 切换类名，当一个元素上有对应的类名时，就删除，如果没有，就添加

● replace 把旧的类名替换为新的类名

● contains 用于判断元素中有没有某个类名，一般在判断条件中用

```js
dom.classList.add('类名', '类名2', '类名n')
dom.classList.remove('类名', '类名2', '类名n')
dom.classList.toggle('类名')
dom.classList.replace('已有的类名', '新的类名')
dom.classList.contains('类名') // true 或者 false
```

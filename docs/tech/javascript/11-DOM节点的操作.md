---
layoutClass: m-nav-layout
---

# DOM节点的操作

## 1. 简单了解节点的概念

一个HTML文件可以看作是所有元素组成的一个节点树，各元素节点之间有级别的划分

- HTML文档根据节点作用，分为标签（元素）节点、文本节点、属性节点（不再提）和注释节点。

  ```js
  //简单了解----查看某个元素的节点
  let box = document.querySelector('.box')
  //查看所有子节点
  console.log(box.childNodes)
  //查看所有元素(Element)子节点
  console.log(box.children)
  ```

- 各节点之间的关系，又可分为以下几个方面：

- - 根节点：`<html>` 标签是整个文档的根节点，有且仅由一个。
  - 子节点：指的是某一个节点的下级节点。
  - 父节点：指的是某一个节点的上级节点。
  - 兄弟节点：两个节点同属于一个父节点。

## 2. DOM节点的操作 （面试题）

### 2.1 获取父节点

```js
dom.parentNode
```

### 2.2 创建节点

```js
document.createElement(eName) //创建一个节点
document.createTextNode(text) //创建文本节点
```

### 2.3 添加节点

```js
document.insertBefore(newNode, referenceNode) //在某个节点前插入节点
parentNode.appendChild(newNode) //给某个节点添加子节点
parentNode.replaceChild
```

### 2.4 复制节点

```js
// true: 复制节点的所有子节点
// false: 只复制节点本身
dom.cloneNode(true | false)
```

### 2.5 移除节点

```js
父节点.removeChild(子节点)
```

### 2.6 替换节点

```
parentNode.replaceChild(newNode,oldNode)
```

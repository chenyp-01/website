## 1. 了解什么是SPA(单页面应用)

- 单页Web应用（single page web application，SPA）： SPA 是一种特殊的 Web 应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的。

- 它将所有的活动局限于一个 Web 页面中，仅在该 Web 页面初始化时加载相应的 HTML 、 JavaScript 、 CSS

- 一旦页面加载完成， SPA 不会因为用户的操作而进行页面的重新加载或跳转，而是利用 JavaScript 动态的变换 HTML（采用的是 div 切换显示和隐藏），从而实现UI与用户的交互。

- 在 SPA 应用中，应用加载之后就不会再有整页刷新。相反，展示逻辑预先加载，并有赖于内容Region（区域）中的视图切换来展示内容。

## 2.了解什么是前端脚手架

- 前端脚手架就是指通过选择几个选项快速搭建项目基础代码的工具。前端脚手架可以有效避免我们 ctrl + C 和 ctrl + V 相同的代码框架和基础配置。

- 在实际开发过程中，我们经常都会用到脚手架来构建前端工程项目，常见的主流框架都有自己的脚手架，vue-cli、create-react-app、angular-cli。

- 在大型公司都会有内部定制化的脚手架开发工具，使用脚手架可以大幅提升项目的构建速度，通过命令行的交互，选择你所需要的配置与集成，可快速完成初始项目的创建

## 3. 了解vue的脚手架

Vue3

```plain
vite：仅支持vue3；运行速度快；不是基于webpack打包
```

Vue2＋Vue3

```plain
脚手架 vue-cli
vue2、vue3都支持；运行速度较慢；基于webpack打包
```

## 4. 了解vite和webpack的区别

Vite是新一代前端构建工具。Vite 的竞品是 Webpack，而且按照现在的趋势看，使用率超过 Webpack 也是早晚的事

vite的作者是尤雨溪

### vite的特点

**Vite 的快**，主要体现在两个方面: 快速的冷启动和快速的热更新。而 Vite 之所以能有如此优秀的表现，完全归功于 Vite 借助了浏览器对 ESM 规范的支持，采取了与 Webpack 完全不同的打包机制。

-  快速冷启动：
  Vite只启动一台静态页面的服务器，不会打包全部项目文件代码，服务器根据客户端的请求加载不同的模块处理，实现按需加载，而我们所熟知的webpack则是，一开始就将整个项目都打包一遍，再开启dev-server，如果项目规模庞大，打包时间必然很长。 

-  打包编译速度：
  当需要打包到⽣产环境时，vite使⽤传统的rollup进⾏打包，所以，vite的优势是体现在开发阶段，另外，由于vite使⽤的是ES Module，所以代码中不可以使⽤CommonJs； 

-  热模块更新：
  在HRM热更新⽅⾯，当某个模块内容改变时，让浏览器去重新请求该模块即可，⽽不是像webpack重新将该模块的所有依赖重新编译； 

### vite和webpack的区别

-  vite是go语言编写的，而webpack是原生js编写的，性能不如go语言（go语言操作是纳秒级别，而js是毫秒级别） 

-  vite利用了ES的modules，不需要打包，所以速度快 

-  webpack先打包，再启动开发服务器，请求服务器时直接给予打包后的结果；vite直接启动开发服务器，请求哪个模块再对哪个模块进行实时编译 

-  vite的主要优势就是快，缺点是相关生态还不完善 

简单来说： **webpack是先打包再启动开发服务器，vite是直接启动开发服务器，然后按需编译依赖文件。**



## 5. 了解相关概念

-  冷启动
  *在冷启动时*,应用程序的进程会被系统创建,应用程序需要重新初始化所有的资源和数据 

-  HMR
  Hot Module Replacement的简写，意思是模块热替换，即允许在运行时更新各种模块，而无需进行完全刷新。HMR大大提高了开发阶段的更新的响应速度，避免全量更新，在提高效率的同时大大提高了开发体验 

-  Rollup
  Rollup是基于ES2015的JavaScript打包工具。它将小文件打包成一个大文件或者更复杂的库和应用，打包既可用于浏览器和Node.js使用。 Rollup最显著的地方就是能让打包文件体积很小。相比其他JavaScript打包工具，Rollup总能打出更小，更快的包。因为Rollup基于ES2015模块，比Webpack使用的CommonJS模块机制更高效 

## 6. 初始化vue项目

运行下方命令，选择合适的选项，会自动创建项目结构

```plain
npm create vite@latest
```

```javascript
//进入项目目录
cd vite-project
// 安装依赖
npm install
// 开启开发服务器，运行项目
npm run dev
```

-  真机测试配置
  通过局域网中的电脑或手机访问服务调试时，需修改package.json ，在"dev"中暴露Ip地址

```json
{
  "name": "vite-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 192.168.10.67",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

 

## 7. vue单文件组件

Vue 的单文件组件 (即 `*.vue` 文件，简称 **SFC**) 是一种特殊的文件格式，使我们能够将一个 Vue 组件的模板、逻辑与样式封装在单个文件中

下面是一个单文件组件的示例

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

如你所见，Vue 的单文件组件是 HTML、CSS 和 JavaScript 三种元素的自然延伸。`<template>`、`<script>` 和 `<style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式。

## 8. 安装vscode的插件volar

volar功能： 语法高亮、错误与警告、代码补全等

## 9. 快速生成vue3代码

vscode>文件> 首选项 > 配置用户代码片段 > vue.json > 把下面文字粘入

```json
{
	"Print to console": {
	  "prefix": "v3",
	  "body": [
		"<script>",
		"    export default {",
		"        data(){",
		"            return {",
		"",
		"            }",
		"        }",
		"    }",
		"",
		"</script>",
		"",
		"<template>",
		"   <div class=\"$1\">",
		"",
		"   </div>",
		"</template>",
		
		"<style lang=\"scss\" scoped>",
		"",
		"</style>",
	  ],
	  "description": "Log output to console"
	}
  }
```

快速生成vue3的模板

```
{
  "Print to console": {
    "prefix": ["v3", "cyp"],
    "body": [
      "<script setup lang=\"ts\">",

      "</script>",
      "",
      "<template>",
      "   <div class=\"$1\">",
      "",
      "   </div>",
      "</template>",

      "<style lang=\"scss\" scoped>",
      "",
      "</style>"
    ],
    "description": "Log output to console"
  }
}

```



## 10. 安装sass

CSS 预编译语言,也称为 CSS 扩展语言,是在 CSS 的基础上拓展的一套语言。它需要经过编译处理后才能变成浏览器可识别的 CSS 代码

常用的 CSS 预编译语言有: Sass  Less Stylus

Sass 是最流行的 CSS 预编译语言

```js
// 安装sass
npm i sass
```



   


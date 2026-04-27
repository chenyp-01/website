# react移动端适配的配置

## 1. 用vite创建react项目

```
pnpm create vite
```

## 2. 安装用于移动端适配的三个模块

​	"lib-flexible": "^0.3.2",
​    "postcss-loader": "^7.0.2",
​    "postcss-px2rem": "^0.3.0",

```
pnpm i  postcss-loader lib-flexible postcss-px2rem
```

## 3. 修改index.html中的meta适配 

```html
    <meta name="viewport" content="width=device-width, inITial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

```

## 4. 在入口文件中引入lib-flexible

```js
import "lib-flexible"
```

## 5. 修改vite.config.js的配置

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import px2rem from 'postcss-px2rem'
import path from 'path'

const px2remOptions = {
  rootValue: 20, // 换算基数，默认100，把根标签的font-size规定为1rem为50px,在设计稿上量出多少px直接在代码中写多少px
  unitPrecision: 5,  //保留rem小数点多少位
  propList: ['*', '!border', '!font-size'], //  存储将被转换的属性列表，'!font-size' 即不对字体进行rem转换
  selectorBlackList: ['.radius'], // 要忽略并保留为px的选择器，例如fs-xl类名，里面有关px的样式将不被转换，支持正则写法。
  replace: true,
  mediaQuery: false,//（布尔值）媒体查询( @media screen 之类的)中不生效
  minPixelValue: 12,///设置要替换的最小像素值，px小于12的不会被转换
  //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性
  propBlackList: ['font-size'], //黑名单
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [px2rem(px2remOptions)]
    }
  },
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
```

## 6. 在组件的css中直接写设计稿中的尺寸

```css
.App {
  /*vite打包后会自动将px转为rem*/
  width: 750px;  
}
```


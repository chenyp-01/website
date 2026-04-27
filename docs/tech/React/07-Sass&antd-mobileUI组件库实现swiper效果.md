## React项目中使用Sass

- 安装

  ```
  npm i sass
  ```

- Test.scss

  ```css
  .content {
      height: 220px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      user-select: none;
    }
  ```

- Test.js

  ```jsx
  import  './Test.scss'
  ...
  <div className="content"></div>
  ```

## Antd mobile的使用

https://mobile.ant.design/zh

### 安装 

```js
npm i antd-mobile
```

### 实现轮播图

> 只需要在组件中按需引入即可，不需要全局引入 

```jsx
import React from 'react'
import { Swiper, Toast } from 'antd-mobile'
import "./Test.scss"
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
        <div
            className="content"
            style={{ background: color }}
            onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`)
            }}
        >
            {index + 1}
        </div>
    </Swiper.Item>
))

const Test = () => {
    return (
        <>
            <Swiper autoplay>{items}</Swiper>
        </>
    )
}

export default Test
```

### 图标

图标是在一个单独的 npm 包中，如果你想使用图标，需要先安装它

```node
npm install  antd-mobile-icons
```

然后从这个包中引入你所需要的图标即可：

```jsx
import React from 'react'
import { AntOutline, ArrowDownCircleOutline } from 'antd-mobile-icons'
import { Space } from 'antd-mobile'


const Test = () => {
    return (
        <>
            <Space wrap style={{ fontSize: 36 }}>
                <AntOutline />
                <ArrowDownCircleOutline />
            </Space>
        </>
    )
}

export default Test
```








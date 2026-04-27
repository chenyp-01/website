# 1. wangEditor5介绍

**wangEditor**5 —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。

- 官网：[www.wangEditor.com](https://www.wangeditor.com/)

# 2. 下载

注意： wangeditor都是小写字母

```js 
// 下面两个依赖都需要安装 
npm i @wangeditor/editor  // 使用ts时，引入相关类型声明
npm i @wangeditor/editor-for-react
```

# 3. 相关概念和API

## 3.1 组件

- Editor :  编辑器组件
- Toolbar： 菜单栏组件

```jsx
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
...
const App = ()=>{
    return (
    	<>
        	<ToolBar 属性/>
        	<Editor 属性/>
        </>
    )
}
```

## 3.2 Editor组件的 API

实例化编辑器

```jsx
const App = ()=>{
    // editor 实例
    // 1. 创建editor状态，用来引用editor实例
    const [editor, setEditor] = useState(null)
    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')
    ...
    return (
        <>
            <Editor
                //默认配置，可以不提供
                defaultConfig={editorConfig}
                // value: 编辑器中显示的文本
                value={html} 
                // 2. onCreated: 编辑器创建完毕时的回调函数,会把编辑器实例存入editor状态
                onCreated={setEditor}
                // 3. onChange: 编辑器内容变化时的回调函数。
                // editor.getHtml() 获取编辑器的内容
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
                />
        </>
    )
}
```

## 3.3 Toolbar组件的API

```jsx
<Toolbar
    // editor为Editor组件生成的实例，关联Toolbar和Editor组件
    editor={editor}
     //默认配置，可以不提供
    defaultConfig={toolbarConfig}
    mode="default"
    style={{ borderBottom: '1px solid #ccc' }}
/>
```

# 4. 基础demo

```jsx
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor() {
    // editor 实例
    const [editor, setEditor] = useState(null)    

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig = { }                      

    // 编辑器配置
    const editorConfig = {                        
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor
```



# 5. 工具栏配置

## 5.1 所有默认工具栏配置

```js
// 工具栏配置
    const toolbarConfig = {
        toolbarKeys: [
            "headerSelect",  //正文
            "blockquote", //引号
            "|", //分隔线
            "bold",  //加粗
            "underline",  //下划线
            "italic",   //倾斜
            
            
            // 菜单组，包含多个菜单
            {
                "key": "group-more-style",
                "title": "更多",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
                "menuKeys": [
                    "through",
                    "code",
                    "sup",
                    "sub",
                    "clearStyle"
                ]
            },
            "color",
            "bgColor",
            "|",
            "fontSize",
            "fontFamily",
            "lineHeight",
            "|",
            "bulletedList",
            "numberedList",
            "todo",
            {
                "key": "group-justify",
                "title": "对齐",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
                "menuKeys": [
                    "justifyLeft",
                    "justifyRight",
                    "justifyCenter",
                    "justifyJustify"
                ]
            },
            {
                "key": "group-indent",
                "title": "缩进",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
                "menuKeys": [
                    "indent",
                    "delIndent"
                ]
            },
            "|",
            "emotion",
            "insertLink",
            {
                "key": "group-image",
                "title": "图片",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
                "menuKeys": [
                    "insertImage",
                    "uploadImage"
                ]
            },
            {
                "key": "group-video",
                "title": "视频",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>",
                "menuKeys": [
                    "insertVideo",
                    "uploadVideo"
                ]
            },
            "insertTable",
            "codeBlock",
            "divider",
            "|",
            "undo",
            "redo",
            "|",
            "fullScreen"
        ]
    }  
```

## 5.2 自定义工具栏

```jsx
// 工具栏配置
const toolbarConfig = {
    toolbarKeys: [
        "headerSelect",  //正文
        "blockquote", //引号
        "|", //分隔线
        "bold",  //加粗
        "underline",  //下划线
    ]
}  
```

# 6. 上传图片的菜单配置

> 工具栏配置决定了在工具栏显示哪些工具，菜单配置决定了该工具使用时的相关配置。
>
> 比如： 工具栏上显示上传图片工具，但上传后的接口地址，header中携带token等需要通过菜单配置

## 6.1 上传图片基本配置

```js
editorConfig.MENU_CONF['uploadImage'] = {
    
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: 'your-custom-name',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒
}
```

## 6.2 回调函数

```JS
editorConfig.MENU_CONF['uploadImage'] = {
    // 上传之前触发
    onBeforeUpload(file: File) { // TS 语法
    // onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
    },

    // 上传进度的回调函数
    onProgress(progress: number) {  // TS 语法
    // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
    },

    // 单个文件上传成功之后
    onSuccess(file: File, res: any) {  // TS 语法
    // onSuccess(file, res) {          // JS 语法
        console.log(`${file.name} 上传成功`, res)
    },

    // 单个文件上传失败
    onFailed(file: File, res: any) {   // TS 语法
    // onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res)
    },

    // 上传错误，或者触发 timeout 超时
    onError(file: File, err: any, res: any) {  // TS 语法
    // onError(file, err, res) {               // JS 语法
        console.log(`${file.name} 上传出错`, err, res)
    },
}
```

分析

- onSuccess 回调触发的前提条件

  服务器端返回格式参考6.3, 这样才能触发onSuccess回调，并实现自动插入图片

```jsx
const express = require("express")
const router = express.Router()
const upload = require("../utils/upload")

//图片上传

router.post("/upload", upload.single("file"), (req, res) => {
    // 需要返回图片的访问地址    域名+文件名
    const url = "http://localhost:5000/uploadImg/" + req.file.filename
    // console.log(req.file.filename);
    res.json({
        "errno": 0,
        "data": {
            url,
            alt: '头像',
            href: ''
        }
    })
})

module.exports = router
```

- onFailed回调触发的情况

```js
// 后端接口中,upload.single("file") 中的upload没有引入， 代码没有报错
// 但前端调取接口时服务端报错，前端触发onFailed回调

router.post("/upload", upload.single("file"), (req, res) => {
    // 需要返回图片的访问地址    域名+文件名
    const url = "http://localhost:5000/uploadImg/" + req.file.filename
    // console.log(req.file.filename);
    res.json({
        "errno": 0,
        "data": {
            url,
            alt: '头像',
            href: ''
        }
    })
})
```

- onError 回调触发的情况

```js
// 后端要求前端表单项的属性名为"file",但如果传来的是"file1",则客户端触发onError回调
router.post("/upload", upload.single("file"), (req, res) => {
   ...
})
```

## 6.3 **服务端 response body 格式**

**【特别注意】服务端 response body 格式要求如下：**

-  上传成功的返回格式：

  ```JS
  {
      "errno": 0, // 注意：值是数字，不能是字符串
      "data": {
          "url": "xxx", // 图片 src ，必须
          "alt": "yyy", // 图片描述文字，非必须
          "href": "zzz" // 图片的链接，非必须
      }
  }
  ```

- 上传失败的返回格式

  ```js
  {
      "errno": 1, // 只要不等于 0 就行
      "message": "失败信息"
  }
  ```

>TIP
>
>如果你的服务端 response body 无法按照上述格式，可以使用下文的 `customInsert`

# 7. 图片上传注意事项

- express后端返回示例

  ```js
  //图片上传
  router.post("/upload", upload.single("file"), (req, res) => {
      // 需要返回图片的访问地址    域名+上传文件夹+文件名
      const url = "http://localhost:3000/upload/" + req.file.filename
      res.json({url})
  })
  ```

- 自定义回调函数，插入图片

```js
editorConfig.MENU_CONF['uploadImage'] = {
       ...
        // 自定义插入图片的回调，用来替代onSuccess回调
        customInsert(res, insertFn) {  // TS 语法
            // customInsert(res, insertFn) {                  // JS 语法
            // res 即服务端的返回结果
            let {url} = res
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(url)
        },
    }
```

# 8. 完整代码

- parent.jsx

```js
import React,{useState,useEffect} from 'react'
import Editor from '@/components/Editor'
export default function index() {
  const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
      setTimeout(() => {
          setHtml('<p>hello world</p>')
      }, 1500)

  }, [])
  return (
    <div>
       <h1>富文件编辑器</h1>
       <Editor html={html} setHtml={setHtml}></Editor>
       <hr />
       <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  )
}

```

- Editor.jsx

```jsx
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor(props) {
    const { html, setHtml } = props
    // editor 实例
    const [editor, setEditor] = useState(null)

    // 工具栏配置
    const toolbarConfig = {

    }

    // 初始化默认配置
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {}
    }

    editorConfig.MENU_CONF['uploadImage'] = {
        server: '/api/upload',
        fieldName: 'file',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("token"),
        },
        // 上传之前触发
        onBeforeUpload(file) { // TS 语法
            // onBeforeUpload(file) {    // JS 语法
            // file 选中的文件，格式如 { key: file }
            return file

            // 可以 return
            // 1. return file 或者 new 一个 file ，接下来将上传
            // 2. return false ，不上传这个 file
        },

        // 上传进度的回调函数
        onProgress(progress) {  // TS 语法
            // onProgress(progress) {       // JS 语法
            // progress 是 0-100 的数字
            console.log('progress', progress)
        },
        // 自定义插入图片
        customInsert(res, insertFn) {  // TS 语法
            // customInsert(res, insertFn) {                  // JS 语法
            // res 即服务端的返回结果
            let {url} = res
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(url)
        },
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }

    }, [editor])


    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor
```


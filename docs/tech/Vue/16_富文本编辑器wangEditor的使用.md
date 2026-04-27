# 1. wangEditor5介绍
**wangEditor**5 —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。<br />官网：[www.wangEditor.com](https://www.wangeditor.com/)

# 2. 下载
注意： wangeditor都是小写字母
```javascript
// 下面两个依赖都需要安装 
npm i @wangeditor/editor  
npm i @wangeditor/editor-for-vue@next
```
# 3. 相关组件
Editor :  编辑器组件<br />Toolbar： 菜单栏组件
```jsx
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
...
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar 属性/>
    <Editor 属性/>
  </div>
</template>
```
# 4.了解vue3的shallowRef
Vue 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，因为每个属性访问都将触发代理的依赖追踪。<br />Vue 确实也为此提供了一种解决方案，通过使用 shallowRef() 和 shallowReactive() 来绕开深度响应。浅层式 API 创建的状态只在其顶层是[响应式](https://so.csdn.net/so/search?q=%E5%93%8D%E5%BA%94%E5%BC%8F&spm=1001.2101.3001.7020)的，对所有深层的对象不会做任何处理。
```javascript
const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])
 
 
// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]
 
 
// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```
# 5.基础案例
```vue
<script setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  // mode: 'default' 默认模式 - 集成了 wangEditor 所有功能
  // mode: 'simple' 简洁模式 - 仅有部分常见功能，但更加简洁易用
  const mode = ref("simple")
  // const mode = ref("default")


  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  // 内容 HTML
  const valueHtml = ref('<p>hello</p>')

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
  })

  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容...' }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
  }

</script> 
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" />
    </div>
</template>
```
# 6. 工具栏配置
## 查看所有默认工具栏配置
```javascript
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！

    //打印所有默认配置
    console.log(editor.getConfig()["MENU_CONF"])
}
```
## 自定义工具栏
```jsx
<!--// 工具栏配置
const toolbarConfig = {
    toolbarKeys: [
        "headerSelect",  //正文
        "blockquote", //引号
        "|", //分隔线
        "bold",  //加粗
        "underline",  //下划线
    ]
}
-->
```
```vue
<!--
const valueHtml = computed({
  get () {
    console.log(props.html);
    return props.html
  },
  set (value) {
    emit('update:html', value)
  }
})
-->
```



# 7. 上传图片的菜单配置

> 工具栏配置决定了在工具栏显示哪些工具，菜单配置决定了该工具使用时的相关配置。
> 比如： 工具栏上显示上传图片工具，但上传后的接口地址，header中携带token等需要通过菜单配置

```javascript
// 初始化默认配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
}

editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/upload', //请求的后端接口
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
        let { url } = res
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(url)
    }
}
```
# 8.编辑器封装
## 父组件
```vue
<script setup>
import { ref } from 'vue';
import Editor from './editor.vue';

const html = ref("<p>dddddd</p>")

const submit = ()=>{
    console.log('html',html.value);
}
</script>

<template>
    <div class="rich-txt">
        <h3>富文本编辑器</h3>
        <Editor v-model:html="html"></Editor>

        <button @click="submit">提交</button>
    </div>
</template>

<style lang="scss" scoped></style>
```
## 子组件
```vue
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted,computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const props = defineProps({
    html: String
})
const emit = defineEmits()

const mode = ref("simple")

// const mode = ref("default")
// 内容 HTML

const valueHtml = computed({
  get () {
    console.log(props.html);
    return props.html
  },
  set (value) {
    emit('update:html', value)
  }
})

// const toolbarConfig = {}
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
// 初始化默认配置
const editorConfig = {
    placeholder: '请输入内容...',
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    console.log(editor.getConfig()["MENU_CONF"])
}

</script> 
<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" />
    </div>
</template>
```

# 1.初始化项目
```typescript
//创建项目
pnpm create vite my-vue3

//进目录
cd my-vue3

//安装依赖
pnpm i

//启动
npm run dev

```
# 2.配置路径别名和跨域
vite.config.ts<br />通过配置服务器代理，实现跨域
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 配置服务器代理，实现跨域
    proxy: {
      //所有以 '/api'为前缀的接口都转向http://localhost:3001
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        //去掉接口中的 '/api'以便和后端接口匹配
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

```
```vue
<!--
import axios from './config'

// 添加新闻
// export function _addNews(data) {
//     return axios({
//         url: '/news',
//         method: "post",
//         data
//     })
// }

export const _addNews = data => axios.post("/news", data)
  -->
```



# 3.安装依赖包

```javascript
"dependencies": {
     "@element-plus/icons-vue": "^2.1.0",
    "axios": "^1.4.0",
    "dayjs": "^1.11.9",
    "element-plus": "^2.3.7",
    "lodash": "^4.17.21",
    "sass": "^1.63.6",
    "vue": "^3.3.4",
    "vue-router": "^4.2.4",
    "vuex": "^4.1.0"
  },
```
# 4.配置路由
## 创建基础组件

- src/pages/notFound/index.vue  404页面
- src/pages/login/index.vue  登录页面
- src/pages/layout/index.vue  管理页面
## src/router/index.js
配置路由， 设置路由拦截
```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'admin',
        component: () => import('@/pages/layout/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue')
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import('@/pages/notFound/index.vue') 
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
```
## main.js引入路由
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
```
## App.vue定义路由出口
```vue
<template>
  <RouterView></RouterView>
</template>
```
## 添加路由拦截
src/router/index.js
```javascript
...
//路由拦截
router.beforeEach((to, from) => {
    //如果进入的不是/login,同时token不存在，则重定向到/login进行登录
    if (to.fullPath !== '/login' && !localStorage.getItem("token")) return "/login"
})
...
```
# 5.API封装
## api/config.js

- 配置请求url, 超时时间
- 配置请求拦截器，以便携带token信息
- 配置相应拦截器，集中处理错误
```javascript
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: '/api',
  timeout: 5000
});

//添加请求拦截器，会在发起请求之前执行相应的需求
instance.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem("token")
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//添加响应拦截器，会在返回数据后先执行相应的需求
instance.interceptors.response.use(function (response) {
  // console.log('res',response);
  let { code } = response.data
  if (code === 401) {
    //token失效
    // sessionStorage.clear()
    // window.location.reload() //页面刷新 
  }
  return response;
}, function (error) {
  console.log('res-err', error);
  // let {code} = error
  // if (code === 'ERR_NETWORK'){
  //   alert('网络错误')
  // }
  return Promise.reject(error);
});
export default instance
```
## 举例：接口第一种写法
api/news.js
```javascript
import axios from './config'

// 添加新闻
export function _addNews(data) {
    return axios({
        url: '/news',
        method: "post",
        data
    })
}

//获取新闻列表
export function _getNews(params){
    return axios({
        url: '/news',
        method: "get",
        params
    })
}
//获取指定newsId的新闻
export function _getOneNews(newsId){
    return axios({
        // 注意前后端在接口上的传参方式
        url: `/news/${newsId}`,
        method: "get",
    })
}

// 编辑新闻
export function _editNews(data){
    return axios({
        url: '/news',
        method: "put",
        data
    })
}
// 删除新闻
export function _delNews(params){
    return axios({
        url: '/news',
        method: "delete",
        params
    })
}
```
## 举例：接口第二种写法
api/news.js
```javascript
import axios from './config'

// 添加新闻
// export function _addNews(data) {
//     return axios({
//         url: '/news',
//         method: "post",
//         data
//     })
// }

export const _addNews = data => axios.post("/news", data)


//获取新闻列表
// export function _getNews(params) {
//     return axios({
//         url: '/news',
//         method: "get",
//         params
//     })
// }

export const _getNews = params => axios.get("/news", { params })

//获取指定newsId的新闻
export function _getOneNews(newsId) {
    return axios({
        // 注意前后端在接口上的传参方式
        url: `/news/${newsId}`,
        method: "get",
    })
}

// 编辑新闻
export function _editNews(data) {
    return axios({
        url: '/news',
        method: "put",
        data
    })
}
// 删除新闻
export function _delNews(params) {
    return axios({
        url: '/news',
        method: "delete",
        params
    })
}
```
## 接口在组件中使用
```javascript
import { _addNews } from '@/api/news.js"

const addNews = async ()=>{
  let res = await _addNews(请求参数)
}
```
```vue
<!--
...
//全局引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
//全局引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//注册element-plus
app.use(ElementPlus)
//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
-->
```



# 6. 使用element-plus

element-plus官网:     [https://element-plus.gitee.io/zh-CN/](https://element-plus.gitee.io/zh-CN/)
## 1.安装
```
pnpm install normalize.css
pnpm install element-plus
pnpm install @element-plus/icons-vue
```
## 2. 在main.ts中引入
```tsx
...
//全局引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
//全局引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//注册element-plus
app.use(ElementPlus)
//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
```
## 3. element-plus中图标的使用
```vue
<script setup>
</script>

<template>
    <div class="admin">
        <!-- 编辑图标 -->
        <el-icon :size="20">
            <Edit />
        </el-icon>
        <el-row>
            <!-- 在按钮上显示编辑图标 -->
            <el-button circle type="primary">
                <el-icon >
                    <Edit />
                </el-icon>
            </el-button>
        </el-row>
    </div>
</template>
```
## 4. 使用动态图标
```vue
<script setup>

//定义数据
const icons = ref(['edit','CirclePlus','Clock','Position'])


const props = defineProps({
  item: Object,
  index: Number
})

console.log('index',props.index);

</script>

<template>
    <div class="card">
        <p >图标：
            <!-- <el-icon>
                <Edit />
            </el-icon> -->
            <!-- 通过component动态组件实现 -->
            <component :is="icons[index]"></component>
        </p>
        <p>{{ item.title }}---</p>
        <p>{{ item.count }}</p>
    </div>
</template>

<style lang='scss' scoped>
.card {
    border: 1px solid #000;
    // ！！！！！注意样式用svg标签
    svg {
        width: 20px;
        height: 20px;
    }
}
</style>
```
## 5. Menu菜单
```vue
<el-menu>
     <!-- 没有子菜单 -->
    <el-menu-item index="/dashboard">
        <el-icon>
            <CirclePlus />
        </el-icon>
        <span slot="title">首页</span>
     </el-menu-item>
   
	 <!-- 有子菜单，注意标签和插槽的使用  -->
        <el-sub-menu index="/charts">
            <template #title>
                <el-icon>
                    <CirclePlus />
                </el-icon>
                <span>图表管理</span>
            </template>
            <el-menu-item index="/charts/bar">
                <el-icon>
                    <CirclePlus />
                </el-icon>
                <span >柱状图</span>
            </el-menu-item>
            <el-menu-item index="/charts/pie">
                <el-icon>
                    <CirclePlus />
                </el-icon>
                <span>饼图</span>
            </el-menu-item>
        </el-sub-menu>
</el-menu>
```
## 6. Message消息提示
```vue
<script lang="ts" setup>
...
//引用Message组件
import { ElMessage } from 'element-plus'
...
//使用Message
ElMessage.success("登录成功");
```
## 7. 表单-登录页面
> 注意需要自己解决的ts

```typescript
    let { query: {redirectUrl} } = route;   // 深层的解构赋值
    if (redirectUrl) {
 			router.replace(redirectUrl  );       
	 } else {
     	router.replace("/") 
    }

  ruleFormRef.value?.resetFields();
```
完整代码如下：
```vue
<script lang="ts" setup>
import { reactive, ref, nextTick} from 'vue'

import { useRouter, useRoute} from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from "@/api/http";

const router = useRouter()
const route = useRoute()

const ruleFormRef = ref()
const ruleForm = reactive({
    account: '',
    pw: '',
})

const rules = reactive({
    account: [
        { required: true, message: "不能为空", trigger: "blur" },
        {
            pattern: /^\w{3,5}$/,
            message: "必须是3-5位的字符",
            trigger: "blur",
        },
    ],
    pw: [
        { required: true, message: "不能为空", trigger: "blur" },
        {
            pattern: /^\d{3,6}$/,
            message: "必须是3-6位的纯数字",
            trigger: "blur",
        },
    ],
})

const handleValid = async () => {
    try {
        //当数据都有效时，调用后端接口，进行登录验证
        let res = await login(ruleForm);
        let { code, token } = res.data;
        if (code === 200) {
            // console.log('login-role',role);
            //登录成功  数据持久化
            sessionStorage.setItem("token", token);
            ElMessage.success("登录成功");

            // 登录的分类讨论：
            // 1. 首次登录，没有参数redirectUrl,  登录成功后进入首页
            // 2. 退出登录后再次登录，有参数redirectUrl,登录成功后进入上一次退出登录的那个路由
            let { query: {redirectUrl} } = route;
            if (redirectUrl) {
                // as 类型断言
                router.replace(redirectUrl);
            } else {
                router.replace("/");
            }
        } else {
            //登录失败
            ElMessage.error("登录失败");
            ruleFormRef.value?.resetFields();
        }
    } catch (err: any) {
        if (err.code === 'ERR_NETWORK') {
            ElMessage.error("网络错误,请重试");
        }
    }
}
const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            handleValid();
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" class="form">
            <!-- 账号 -->
            <el-form-item prop="account">
                <el-input type="text" placeholder="请输入账号" prefix-icon="el-icon-user-solid" v-model="ruleForm.account"
                    autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="pw">
                <el-input type="text" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.pw"
                    autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang='scss' scoped>

</style>
```


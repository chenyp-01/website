---
layoutClass: m-nav-layout
aside: false
outline: false
---

<script setup lang="ts">
import { data as TECH_FILES } from '../files.data'
import { getFilesByRoute } from '../../.vitepress/utils/files-loader'

const INTERNET_FILES = getFilesByRoute(TECH_FILES, '/tech/小程序/')
</script>

# 数据可视化

数据可视化文档列表，点击任意条目即可进入对应 md 文件阅读。

<MNavLinks v-if="INTERNET_FILES.length" title="文件列表" :items="INTERNET_FILES" />

<p v-else>当前目录还没有可展示的文档，请在 <code>docs/tech/Internet</code> 下新增 md 文件。</p>

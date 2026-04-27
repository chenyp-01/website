---
layoutClass: m-nav-layout
aside: false
outline: false
---

<script setup lang="ts">
import { data as TECH_FILES } from '../files.data'
import { getFilesByRoute } from '../../.vitepress/utils/files-loader'

const JAVASCRIPT_FILES = getFilesByRoute(TECH_FILES, '/tech/python/')
</script>

# JavaScript

JavaScript 文档列表，点击任意条目即可进入对应 md 文件阅读。

<MNavLinks v-if="JAVASCRIPT_FILES.length" title="文件列表" :items="JAVASCRIPT_FILES" />

<p v-else>当前目录还没有可展示的文档，请在 <code>docs/tech/javascript</code> 下新增 md 文件。</p>

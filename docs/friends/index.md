---
layoutClass: m-friends-layout
outline: [2, 3, 4]
title: 友情链接
---

<script setup lang="ts">
import { FRIENDS_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 友情链接

<MNavLinks v-for="{title, items} in FRIENDS_DATA" :key="title" :title="title" :items="items" />

<details class="friend-apply">
  <summary>申请友链</summary>

  <div class="friend-apply-content">

### 友链要求

- 网站应保持清洁，避免过多广告内容
- 网站需要有良好的稳定性和可访问性
- 站点内容与技术、学习、创作相关优先

### 申请方式

1. 在本页评论区留言（若开启了评论）
2. 通过你的联系方式（邮箱/社媒）联系我
3. 或在 GitHub 提交 issue（可在此处放你的 issue 链接）

### 本站信息

- 网站名称：鹏友记
- 网站描述：前端常用知识、源码阅读笔记、提效工具与实践总结
- 网站地址：`https://your-domain.com`
- 网站图标：`https://your-domain.com/logo.png`

```json
{
  "title": "鹏友记",
  "desc": "前端常用知识、源码阅读笔记、提效工具与实践总结",
  "link": "https://your-domain.com",
  "icon": "https://your-domain.com/logo.png"
}
```

  </div>

</details>

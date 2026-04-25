---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { TECH_DATA } from './data'
</script>

# 技术栈

前端及相关技术栈的知识整理与学习笔记。

<MNavLinks v-for="{title, items} in TECH_DATA" :title="title" :items="items"/>

---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { READING_DATA } from './data'
</script>

# 读书笔记

阅读后的思考与记录。

<MNavLinks v-for="{title, items} in READING_DATA" :title="title" :items="items"/>

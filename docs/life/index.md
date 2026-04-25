---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { LIFE_DATA } from './data'
</script>

# 生活

记录生活中的点滴、感悟与分享。

<MNavLinks v-for="{title, items} in LIFE_DATA" :title="title" :items="items"/>

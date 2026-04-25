---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { PROJECTS_DATA } from './data'
</script>

# 项目经验

工作中积累的项目实战经验与总结。

<MNavLinks v-for="{title, items} in PROJECTS_DATA" :title="title" :items="items"/>

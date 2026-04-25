---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { WORK_DATA } from './data'
</script>

# 工作

工作中的思考、总结与收获。

<MNavLinks v-for="{title, items} in WORK_DATA" :title="title" :items="items"/>

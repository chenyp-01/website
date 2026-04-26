---
layoutClass: m-nav-layout
aside: false
outline: false
---

<script setup lang="ts">
import { data as LIFE_POSTS } from './posts.data'
</script>

<MLifePosts title="生活" subtitle="记录生活中的点滴、感悟与分享。" :posts="LIFE_POSTS" :page-size="12" />

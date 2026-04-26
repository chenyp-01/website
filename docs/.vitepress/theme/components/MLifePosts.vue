<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'

export interface LifePost {
  title: string
  date: string
  category?: string
  excerpt: string
  link: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    posts: LifePost[]
    pageSize?: number
  }>(),
  {
    title: '生活日记',
    subtitle: '记录生活中的点滴、感悟与分享。',
    pageSize: 12,
  },
)

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.posts.length / props.pageSize))
})

const safePage = (page: number) => {
  if (page < 1) return 1
  if (page > totalPages.value) return totalPages.value
  return page
}

const visiblePosts = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return props.posts.slice(start, start + props.pageSize)
})

const displayPages = computed<(number | string)[]>(() => {
  const total = totalPages.value
  const page = currentPage.value

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (page >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '...', page - 1, page, page + 1, '...', total]
})

const normalizeInternalLink = (link: string) => {
  return link.replace(/\.md(?=($|[?#]))/i, '')
}

const resolvePostLink = (link: string) => {
  if (/^https?:\/\//.test(link)) return link
  return withBase(normalizeInternalLink(link))
}

const updateUrl = (page: number) => {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  if (page <= 1) {
    url.searchParams.delete('page')
  } else {
    url.searchParams.set('page', String(page))
  }
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

const setPage = (page: number) => {
  currentPage.value = safePage(page)
}

watch(
  () => currentPage.value,
  (page) => {
    updateUrl(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
)

if (typeof window !== 'undefined') {
  const pageFromQuery = Number(new URL(window.location.href).searchParams.get('page') || 1)
  currentPage.value = safePage(pageFromQuery)
}
</script>

<template>
  <section class="m-life-posts">
    <header class="hero">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </header>

    <article v-for="post in visiblePosts" :key="post.link" class="post-item">

      <h2 class="post-title">
        <a :href="resolvePostLink(post.link)">{{ post.title }}</a>
      </h2>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="meta">
        <span class="category">{{ post.category || '日常' }}</span>
        <span class="dot">·</span>
        <time>{{ post.date }}</time>
      </div>
      <a class="read-more" :href="resolvePostLink(post.link)">阅读更多</a>
    </article>

    <nav v-if="totalPages > 1" class="pagination" aria-label="分页导航">
      <button class="page-btn" :disabled="currentPage <= 1" @click="setPage(currentPage - 1)">上一页</button>

      <button v-for="(page, index) in displayPages" :key="`${page}-${index}`" class="page-number"
        :class="{ active: page === currentPage, ghost: page === '...' }" :disabled="page === '...'"
        @click="typeof page === 'number' && setPage(page)">
        {{ page }}
      </button>

      <button class="page-btn" :disabled="currentPage >= totalPages" @click="setPage(currentPage + 1)">下一页</button>
    </nav>
  </section>
</template>


<style scoped lang="scss">
.m-life-posts {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0px 24px;

  .hero {
    margin-bottom: 0px;
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--vp-c-text-1);
    }

    p {
      margin-top: 12px;
      color: var(--vp-c-text-2);
      font-size: 14px;
    }
  }

  // 核心网格布局：一行四个
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 30px; // 增加了行间距和列间距

  .hero,
  .pagination {
    grid-column: 1 / -1;
  }

  .post-item {
    display: flex;
    flex-direction: column;
    padding: 0; // 去掉内边距，靠间距留白
    background: transparent; // 去掉背景
    border: none; // 去掉边框
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8; // 杂志风通常用简单的透明度变化或微位移
    }
  }

  // 1. 顶部元数据：分类 —— 线条 —— 日期
  .meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 500;

    .category {
      white-space: nowrap;
    }

    // 中间的装饰线
    &::after {
      content: "";
      flex: 0 0 30px; // 线条长度
      height: 1px;
    }

    time {
      white-space: nowrap;
    }

    .dot {
      display: none;
    }

    // 隐藏原有的圆点
  }

  // 2. 标题样式
  .post-title {
    margin: 0 0 16px;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.4;
    border: none;
    padding: 0;

    a {
      text-decoration: none;
      color: var(--vp-c-text-1);

      &:hover {
        color: var(--vp-c-brand-1);
      }
    }
  }

  // 3. 摘要样式
  .excerpt {
    margin: 0 0 24px;
    font-size: 15px;
    color: var(--vp-c-text-2);
    line-height: 1.8;
    // 限制行数以保持对齐
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // 4. 阅读更多：线条 + 文字
  .read-more {
    margin-top: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: #3C3C43;

    &::before {
      content: '';
      width: 24px; // 初始线条长度
      height: 1px;
      margin-right: 12px;
      border: 1px solid #3C3C43;
    }
  }

  // 分页样式保持简约
  .pagination {
    margin-top: 80px;
    padding-top: 40px;
    border-top: 1px solid var(--vp-c-divider);
    display: flex;
    justify-content: center;
    gap: 12px;

    button {
      background: transparent;
      border: 1px solid transparent;
      padding: 6px 12px;
      font-size: 16px;
      cursor: pointer;
      color: var(--vp-c-text-2);

      &.active {
        color: var(--vp-c-brand-1);
        font-weight: 700;
      }

      &:disabled {
        opacity: 0.3;
      }
    }
  }
}

// 适配不同屏幕
@media (max-width: 1200px) {
  .m-life-posts {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
  .m-life-posts {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .m-life-posts {
    grid-template-columns: 1fr;

    .hero {
      margin-bottom: 40px;
    }
  }
}
</style>
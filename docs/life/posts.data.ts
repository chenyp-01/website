import { createContentLoader } from 'vitepress'
import type { LifePost } from '../.vitepress/theme/components/MLifePosts.vue'

type PostFrontmatter = {
  title?: string
  date?: string | Date
  category?: string
  description?: string
  excerpt?: string
  draft?: boolean
}

const toTime = (date?: string | Date) => {
  if (!date) return 0
  const time = new Date(date).getTime()
  return Number.isNaN(time) ? 0 : time
}

const formatDate = (date?: string | Date) => {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return String(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const stripHtml = (html?: string) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default createContentLoader('life/posts/*.md', {
  excerpt: true,
  transform(raw) {
    const posts: LifePost[] = raw
      .map((item) => {
        const fm = (item.frontmatter || {}) as PostFrontmatter
        return {
          title: fm.title || item.url.split('/').filter(Boolean).pop() || '未命名文章',
          date: formatDate(fm.date),
          category: fm.category,
          excerpt: fm.excerpt || fm.description || stripHtml(item.excerpt) || '暂无摘要',
          link: item.url,
          draft: fm.draft === true,
        }
      })
      .filter((post) => !post.draft)
      .sort((a, b) => toTime(b.date) - toTime(a.date))
      .map(({ draft: _draft, ...post }) => post)

    return posts
  },
})

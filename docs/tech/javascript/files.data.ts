import { createContentLoader } from 'vitepress'
import type { NavLink } from '../../.vitepress/theme/types'

type Frontmatter = {
  title?: string
  desc?: string
  description?: string
  excerpt?: string
  draft?: boolean
}

const stripHtml = (html?: string) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

const toTitleFromUrl = (url: string) => {
  const raw = url.split('/').filter(Boolean).pop() || '未命名文档'
  return decodeURIComponent(raw)
}

export default createContentLoader('tech/javascript/**/*.md', {
  excerpt: true,
  transform(raw) {
    const items: NavLink[] = raw
      .filter((item) => item.url !== '/tech/javascript/')
      .map((item) => {
        const fm = (item.frontmatter || {}) as Frontmatter
        return {
          icon: '🟨',
          title: fm.title || toTitleFromUrl(item.url),
          desc: fm.desc || fm.description || fm.excerpt || stripHtml(item.excerpt),
          link: item.url,
          draft: fm.draft === true,
        }
      })
      .filter((item) => !item.draft)
      .map(({ draft: _draft, ...item }) => item)

    return items
  },
})

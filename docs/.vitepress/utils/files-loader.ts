import type { NavLink } from '../theme/types'

type Frontmatter = {
  title?: string
  desc?: string
  description?: string
  excerpt?: string
  draft?: boolean
}

type FileGroups = Record<string, NavLink[]>

const stripHtml = (html?: string) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

const toTitleFromUrl = (url: string) => {
  const raw = url.split('/').filter(Boolean).pop() || '未命名文档'
  return decodeURIComponent(raw)
}

const normalizeDir = (route: string) => {
  if (!route) return '/'
  return route.endsWith('/') ? route : `${route}/`
}

const toDirFromUrl = (url: string) => {
  const parts = url.split('/').filter(Boolean)
  parts.pop()
  return normalizeDir(`/${parts.join('/')}`)
}

const toNavLink = (item: any, icon: string) => {
  const fm = (item.frontmatter || {}) as Frontmatter
  return {
    icon,
    title: fm.title || toTitleFromUrl(item.url),
    desc: fm.desc || fm.description || fm.excerpt || stripHtml(item.excerpt),
    link: item.url,
    draft: fm.draft === true,
  }
}

export const toGroupedFiles = (raw: any[], icon = '🟨'): FileGroups => {
  const groups: FileGroups = {}

  raw
    .filter((item) => !item.url.endsWith('/'))
    .map((item) => toNavLink(item, icon))
    .filter((item) => !item.draft)
    .forEach(({ draft: _draft, ...link }) => {
      const dir = toDirFromUrl(link.link)
      groups[dir] = groups[dir] || []
      groups[dir].push(link)
    })

  return groups
}

export const getFilesByRoute = (groups: FileGroups, route: string): NavLink[] => {
  return groups[normalizeDir(route)] || []
}

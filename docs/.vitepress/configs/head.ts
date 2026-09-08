import type { HeadConfig } from 'vitepress'
import { basename } from 'node:path'

const appBasePath = process.env.APP_BASE_PATH || basename(process.env.GITHUB_REPOSITORY || '')
const favicon = `${appBasePath ? `${appBasePath.replace(/\/$/, '')}/` : '/'}favicon.ico`

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'icon', href: favicon }],
  ['link', { rel: 'apple-touch-icon', href: favicon }],
  ['link', { rel: 'mask-icon', href: favicon, color: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileImage', content: favicon }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]

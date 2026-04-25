import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' },// 首页
  { text: '前端导航', link: '/nav/' },// 前端导航
  { text: '友情链接', link: '/friends/' }, // 友情链接
  { text: '前端物语', link: '', },// 之前的笔记
  { text: 'Player', link: '' }, // 播放器
]

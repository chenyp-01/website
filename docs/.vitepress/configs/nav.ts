import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' }, // 首页
  { text: '生活', link: '/life/' }, // 生活
  { text: '工作', link: '/work/' }, // 工作
  { text: '读书笔记', link: '/reading/' }, // 读书笔记
  { text: '项目经验', link: '/projects/' }, // 项目经验
  { text: '技术栈', link: '/tech/' }, // 技术栈
  { text: '前端导航', link: '/nav/' }, // 前端导航
  { text: '友情链接', link: '/friends/' }, // 友情链接
]

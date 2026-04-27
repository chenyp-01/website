import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const TECH_DATA: NavData[] = [
  {
    title: '前端基础',
    items: [
      {
        icon: '🟨',
        title: 'html',
        desc: 'HTML 基础与进阶',
        link: '/tech/',
      },
      {
        icon: '🎨',
        title: 'CSS',
        desc: 'CSS 布局、动画与进阶',
        link: '/tech/',
      },
      {
        icon: '🟨',
        title: 'JavaScript',
        desc: 'JavaScript 核心知识整理',
        link: '/tech/javascript/',
      },
      {
        icon: '🟦',
        title: 'TypeScript',
        desc: 'TypeScript 类型系统与实战',
        link: '/tech/',
      },

    ],
  },
  {
    title: '框架与工具',
    items: [
      {
        icon: '⚡',
        title: 'Vue',
        desc: 'Vue 3 生态与源码分析',
        link: '/tech/',
      },
      {
        icon: '⚛️',
        title: 'React',
        desc: 'React 生态与 hooks 实践',
        link: '/tech/',
      },
      {
        icon: '📦',
        title: '工程化',
        desc: '构建工具、打包、CI/CD',
        link: '/tech/',
      },
    ],
  },
]

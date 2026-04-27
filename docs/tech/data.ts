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
        link: '/tech/HTML',
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
        link: '/tech/Typescript',
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
        link: '/tech/Vue/',
      },
      {
        icon: '⚛️',
        title: 'React',
        desc: 'React 生态与 hooks 实践',
        link: '/tech/React',
      },
      {
        icon: '📦',
        title: '数据可视化',
        desc: '数据可视化',
        link: '/tech/数据可视化/',
      },
      {
        icon: '📦',
        title: '计算机网络安全',
        desc: '计算机网络安全',
        link: '/tech/计算机网络/',
      },
      {
        icon: '📦',
        title: 'git',
        desc: 'git 版本控制',
        link: '/tech/git/',
      },
      {
        icon: '📦',
        title: 'node',
        desc: 'node.js 开发',
        link: '/tech/node/',
      },
      {
        icon: '📦',
        title: '小程序',
        desc: '小程序开发',
        link: '/tech/小程序/',
      },
      {
        icon: '📦',
        title: 'uni-app',
        desc: 'uni-app 开发',
        link: '/tech/uniapp/',
      },
    ],
  },
]

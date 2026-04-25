import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const PROJECTS_DATA: NavData[] = [
  {
    title: '项目经验',
    items: [
      {
        icon: '🏗️',
        title: '前端项目',
        desc: '前端项目的架构与实现',
        link: '/projects/',
      },
      {
        icon: '⚙️',
        title: '全栈项目',
        desc: '涉及前后端的完整项目经验',
        link: '/projects/',
      },
      {
        icon: '🧪',
        title: '技术调研',
        desc: '技术选型与方案调研记录',
        link: '/projects/',
      },
    ],
  },
]

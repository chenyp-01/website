import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const READING_DATA: NavData[] = [
  {
    title: '读书笔记',
    items: [
      {
        icon: '📕',
        title: '技术书籍',
        desc: '技术类书籍的阅读笔记',
        link: '/reading/',
      },
      {
        icon: '📗',
        title: '产品思维',
        desc: '产品、设计相关书籍心得',
        link: '/reading/',
      },
      {
        icon: '📘',
        title: '个人成长',
        desc: '自我提升类书籍的感悟',
        link: '/reading/',
      },
    ],
  },
]

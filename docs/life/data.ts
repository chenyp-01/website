import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const LIFE_DATA: NavData[] = [
  {
    title: '生活随记',
    items: [
      {
        icon: '📝',
        title: '生活随笔',
        desc: '日常生活的记录与感悟',
        link: '/life/',
      },
      {
        icon: '✈️',
        title: '旅行游记',
        desc: '走过的路，看过的风景',
        link: '/life/',
      },
      {
        icon: '🎬',
        title: '影音推荐',
        desc: '值得一看的电影、书籍与音乐',
        link: '/life/',
      },
    ],
  },
]

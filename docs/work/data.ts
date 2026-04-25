import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const WORK_DATA: NavData[] = [
  {
    title: '工作相关',
    items: [
      {
        icon: '💡',
        title: '工作心得',
        desc: '工作中的思考与总结',
        link: '/work/',
      },
      {
        icon: '🛠️',
        title: '工具技巧',
        desc: '提升效率的工具与技巧',
        link: '/work/',
      },
      {
        icon: '🤝',
        title: '团队协作',
        desc: '团队管理与协作经验',
        link: '/work/',
      },
    ],
  },
]

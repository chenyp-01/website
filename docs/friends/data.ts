import type { NavLink } from '../.vitepress/theme/types'

type FriendData = {
  title: string
  items: NavLink[]
}

export const FRIENDS_DATA: FriendData[] = [
  {
    title: '大神博客',
    items: [
      {
        icon: '/logo.png',
        title: '示例博客 A',
        desc: '专注前端工程化与性能优化',
        link: 'https://example.com',
      },
      {
        icon: '/logo.png',
        title: '示例博客 B',
        desc: '记录日常开发心得与踩坑笔记',
        link: 'https://example.com',
      },
      {
        icon: '/logo.png',
        title: '示例博客 C',
        desc: '分享实用工具和效率工作流',
        link: 'https://example.com',
      },
      {
        icon: '/logo.png',
        title: '示例博客 D',
        desc: '分享实用工具和效率工作流',
        link: 'https://example.com',
      },
    ],
  },
]

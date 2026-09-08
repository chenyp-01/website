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
        title: '上海第伍要素官网',
        desc: '前端项目的架构与实现',
        link: 'http://5edata.com/',
      },
      {
        icon: '🏗️',
        title: '上海艾三官网',
        desc: '前端项目的架构与实现',
        link: 'http://www.aasunit.com/',
      },
      {
        icon: '🏗️',
        title: '上海第伍要素可视化大屏',
        desc: '前端项目的架构与实现',
        link: 'http://1.94.19.39:9901/index',
      },

      {
        icon: '🏗️',
        title: '高质量数据集',
        desc: '前端项目的架构与实现',
        link: 'http://117.184.148.10:61000/dataset-system-v2/login',
      },
      {
        icon: '⚙️',
        title: '数据资源登记服务平台',
        desc: '前端项目的架构与实现',
        link: 'http://117.184.148.10:61000/data-registry/login',
      },
      {
        icon: '🧪',
        title: '数据资产管理服务平台',
        desc: '技术选型与方案调研记录',
        link: 'http://117.184.148.10:37018/rubiao-yangzhou/workbench',
      },
      {
        icon: '🧪',
        title: '数据资产SaaS管理平台',
        desc: '技术选型与方案调研记录',
        link: 'http://117.184.148.10:61000/user-center/login',
      },
      {
        icon: '🧪',
        title: '金融平台',
        desc: '技术选型与方案调研记录',
        link: 'http://117.184.148.10:61000/jinrong-demo/login?routeName=financing-overview',
      },
      {
        icon: '🧪',
        title: '可信数据空间',
        desc: '技术选型与方案调研记录',
        link: 'http://117.184.148.10:37018/tds-portal/',
      },
      {
        icon: '🏗️',
        title: '商融通',
        desc: '前端项目的架构与实现',
        link: 'http://117.184.148.10:61000/shangrongtong/filter-model',
      },
      {
        icon: '🏗️',
        title: '企业知识库',
        desc: '前端项目的架构与实现',
        link: 'http://1.94.19.39:8088/',
      },
    ],
  },
]

---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 鹏友记的
  text: 个人博客
  tagline: 生活、工作、学习，记录一切值得记录的事
  image:
    src: /logo.png
    alt: 鹏友记
  actions:
    - text: 生活
      link: /life/
    - text: 技术栈
      link: /tech/
      theme: alt
    - text: 读书笔记
      link: /reading/
      theme: alt
    - text: 前端导航
      link: /nav/
      theme: alt
features:
  - icon: 🌱
    title: 生活
    details: 记录生活中的点滴、感悟与分享
    link: /life/
  - icon: 💼
    title: 工作
    details: 工作中的思考、总结与收获
    link: /work/
  - icon: 📖
    title: 读书笔记
    details: 阅读后的思考与记录
    link: /reading/
  - icon: 🚀
    title: 项目经验
    details: 工作中积累的项目实战经验与总结
    link: /projects/
  - icon: ⚙️
    title: 技术栈
    details: 前端及相关技术栈的知识整理与学习笔记
    link: /tech/
  - icon: 🧭
    title: 前端导航
    details: 整理前端常用资源、工具与网站导航
    link: /nav/
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>

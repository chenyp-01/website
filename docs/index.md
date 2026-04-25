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

/* 确保去掉features模块的黑色边框 */
.m-home-layout .features:hover,
.m-home-layout .features:focus {
  outline: none !important;
}

/* 强制去掉.VPFeature的边框 */
.VPFeature {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* 为.VPFeature添加触摸效果 */
.VPFeature:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* 为读书笔记模块添加背景色，使其与第一个模块一致 */
.m-home-layout .features:nth-child(3) {
  background-color: var(--vp-c-bg-alt);
}
</style>

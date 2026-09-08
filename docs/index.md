---
layout: home
layoutClass: m-home-layout
# layoutClass: m-nav-layout

hero:
  name: Code · AI · Agent
  text:
  tagline: 生活、工作、学习，记录一切值得记录的事
  image:
    src: /logo.png
    alt:
  actions:
    - text: 生活
      link: /life/
    - text: 技术栈
      link: /tech/
      theme: alt
    - text: 读书笔记
      link: /reading/
      # theme: /life/
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
/* ===== 本页专属样式（只影响首页） =====
   全局样式请去 .vitepress/theme/styles/ 下对应文件修改 */

/* hero 头像：圆形裁切 */
.VPImage.image-src {
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-top: -40px;
}

/* 头像 hover：爱的魔力转圈圈 */
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

/* features 卡片底部的小字备注 */
.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}

/* features 卡片 hover：彩虹渐变描边淡入
   注意：border-color 不支持渐变，这里用 ::before + mask 画渐变环，
   颜色跟随 rainbow.scss 的品牌色动画（--vp-c-brand-1 → --vp-c-brand-next） */
.m-home-layout .VPFeature.link {
  position: relative;
}

.m-home-layout .VPFeature.link::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: 12px;
  background: linear-gradient(
    120deg,
    var(--vp-c-brand-1) 30%,
    var(--vp-c-brand-next)
  );
  opacity: 0;
  transition: opacity 0.25s;
}

.m-home-layout .VPFeature.link:hover::before,
.m-home-layout .VPFeature.link:focus-visible::before {
  opacity: 1;
}
</style>

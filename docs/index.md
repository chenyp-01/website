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

/* hero 操作按钮：去掉浅色描边（避免浅色背景下出现"白色边框"感） */
.m-home-layout .VPHero .actions .VPButton {
  border: none;
}

/* 头像缓慢匀速旋转（类似音乐播放器的唱片效果）
   注意：必须保留 translate(-50%, -50%)，这是 VitePress 图片居中定位，
   去掉它旋转时头像会跑位 */
.m-home-layout .image-src {
  animation: m-logo-spin 12s linear infinite;
}

@keyframes m-logo-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 用户偏好减少动态：停止旋转，保留静态头像 */
@media (prefers-reduced-motion: reduce) {
  .m-home-layout .image-src {
    animation: none;
  }
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

/* features 卡片 hover：品牌色渐变描边淡入
   注意：描边颜色固定为品牌静态色（#00a98e → #009ff7），
   不引用会随 rainbow 动画漂移的 --vp-c-brand-* 变量——
   否则触屏上 hover 粘滞时，动画循环到暗色段描边会发黑 */
.m-home-layout .VPFeature.link {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

/* 边框色同样固定，避免跟随动画变暗 */
.m-home-layout .VPFeature.link:hover {
  border-color: #00a98e;
}

.m-home-layout .VPFeature.link::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: 12px;
  background: linear-gradient(120deg, #00a98e 30%, #009ff7);
  opacity: 0;
  transition: opacity 0.25s;
}

.m-home-layout .VPFeature.link:hover::before,
.m-home-layout .VPFeature.link:focus-visible::before {
  opacity: 1;
}
</style>

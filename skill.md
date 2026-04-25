# vitepress-nav-template 可自定义操作说明（Skill）

本文档把这个项目里“能改、常改、建议改”的位置集中整理出来，包含：

- 在哪改（文件路径）
- 这个配置/文件是做什么的
- 怎么使用（示例）
- 生效范围与注意事项

## 1. 快速上手操作

### 1.1 本地启动

位置：`package.json` scripts

用途：本地开发、打包、预览

命令：

```bash
pnpm dev       # 本地开发，默认 8732 端口
pnpm build     # 构建静态站点到 dist
pnpm preview   # 本地预览构建结果，默认 8730
pnpm format    # 全项目 Prettier 格式化
```

### 1.2 提交前自动检查

位置：

- `.husky/pre-commit`
- `.husky/commit-msg`
- `package.json` -> `lint-staged`

用途：

- 提交前自动格式化暂存区代码
- 校验 commit message 规范

说明：

- `pre-commit` 执行 `npx lint-staged --quiet`
- `commit-msg` 执行 `npx femm-verify-commit $1`

## 2. 站点主配置（核心入口）

### 2.1 VitePress 总配置

位置：`docs/.vitepress/config.ts`

用途：站点级配置总入口。

可自定义点：

- `lang`：站点语言
- `title`：站点标题
- `description`：站点描述
- `base`：部署基础路径
- `head`：HTML 头部信息（来自 `configs/head.ts`）
- `markdown.lineNumbers`：代码行号开关
- `themeConfig`：导航、页脚、评论、访客统计、文档 UI 文案等
- `vite.plugins`：Vite 插件（当前用了 `vite-plugin-markdown-preview`）

重点说明（base 路径）：

- 当前 `base` 由 `GITHUB_REPOSITORY` 推导（取仓库名）
- 本地一般是 `/`
- GitHub Pages 项目页通常是 `/<仓库名>/`

## 3. 导航栏、侧边栏、Head 元信息

### 3.1 顶部导航

位置：`docs/.vitepress/configs/nav.ts`

用途：右上角导航菜单。

示例：

```ts
export const nav = [
  { text: '前端导航', link: '/nav/' },
  { text: '我的博客', link: 'https://example.com' },
]
```

### 3.2 侧边栏

位置：`docs/.vitepress/configs/sidebar.ts`

用途：文档页左侧目录结构。

当前为 `{}`（空），可按 VitePress sidebar 结构补充。

### 3.3 Head 配置（favicon、主题色等）

位置：`docs/.vitepress/configs/head.ts`

用途：控制站点 `<head>` 内 meta/link。

常改项：

- `theme-color`
- `apple-touch-icon`
- `mask-icon`
- `msapplication-*`

## 4. 首页（/）自定义

### 4.1 首页内容

位置：`docs/index.md`

用途：VitePress Home 页（hero + features）。

可自定义点：

- `hero.name/text/tagline`
- `hero.image.src`
- `hero.actions`（按钮）
- `features`（功能卡片）
- 页面级 `layoutClass`

示例：

```md
---
layout: home
layoutClass: m-home-layout
hero:
  name: 你的站点
  text: 前端导航
---
```

### 4.2 首页局部样式

位置：`docs/index.md` 内 `<style>`

用途：只针对首页布局类做样式覆盖（当前是 `.m-home-layout`）。

## 5. 导航页（/nav/）自定义

### 5.1 导航页结构

位置：`docs/nav/index.md`

用途：导航页主内容。

当前做法：

- `import { NAV_DATA } from './data'`
- 用 `<MNavLinks .../>` 渲染分类卡片
- 可继续添加 Markdown 内容（提示块、说明、分隔等）

页面级 frontmatter 可改：

- `layoutClass`：页面布局 class
- `outline`：右侧大纲层级

### 5.2 导航数据源

位置：`docs/nav/data.ts`

用途：导航卡片数据总表。

数据结构：

- 分组：`{ title, items }`
- 卡片：`{ icon, title, desc, link }`

`icon` 支持：

- 图片 URL 字符串
- 本地静态资源路径（如 `/icons/xxx.svg`）
- 内联 svg：`{ svg: '<svg ...>...</svg>' }`

### 5.3 导航页局部样式

位置：`docs/nav/index.scss`

用途：仅导航页布局优化（宽度、aside、custom-block 等）。

## 6. 主题扩展层（高级自定义）

## 6.1 自定义主题入口

位置：`docs/.vitepress/theme/index.ts`

用途：扩展默认主题能力。

当前关键逻辑：

- 继承 `DefaultTheme`
- 将页面 `frontmatter.layoutClass` 注入根布局 class
- 注册全局组件 `MNavLinks`
- 接入 `medium-zoom`
- 路由切换时动态控制首页彩虹动画
- 按浏览器类型加 class（chrome/firefox/safari）

### 6.2 布局插槽与评论/页脚

位置：`docs/.vitepress/theme/components/MLayout.vue`

用途：覆盖默认布局插槽。

已自定义内容：

- `#nav-bar-title-after`：顶部显示访客 badge
- `#doc-footer-before`：插入 giscus 评论
- `#doc-after`：插入自定义页脚
- 接管主题切换动效（View Transition）并更新 `theme-color`

评论开关逻辑：

- 全局：`config.ts` 的 `themeConfig.comment`
- 单页关闭：在 md frontmatter 写 `comment: false`

### 6.3 自定义文档页脚

位置：`docs/.vitepress/theme/components/MDocFooter.vue`

用途：显示页脚文案 + 当前页访问统计。

依赖：

- `themeConfig.footer`
- `themeConfig.visitor.badgeId`

### 6.4 访客统计组件

位置：`docs/.vitepress/theme/components/MNavVisitor.vue`

用途：顶部导航旁展示总访问 badge。

来源：`https://visitor-badge.laobi.icu`

### 6.5 导航卡片组件

位置：

- `docs/.vitepress/theme/components/MNavLinks.vue`
- `docs/.vitepress/theme/components/MNavLink.vue`

用途：渲染导航分类和卡片。

可改能力：

- 卡片布局、网格断点
- 图标展示方式
- 打开链接行为（当前统一新标签）
- 链接处理方式（当前 `withBase` 兼容站内路径）

## 7. 主题组合函数（Composables）

### 7.1 页面 ID 规则

位置：`docs/.vitepress/theme/composables/usePageId.ts`

用途：给评论/统计生成 pageId。

规则：

- 优先用 frontmatter `pageId`
- 否则使用格式化后的路由 path

用法：在 md frontmatter 中自定义 pageId

```md
---
pageId: custom-page-id
---
```

### 7.2 路径格式化

位置：`docs/.vitepress/theme/composables/useFormatPath.ts`

用途：去掉 base 前缀，统一不同部署平台路径。

### 7.3 图片放大

位置：`docs/.vitepress/theme/composables/useMediumZoom.ts`

用途：给文档图片增加点击放大。

默认选择器会排除：

- 首页主图 `.image-src`
- 访客 badge `.visitor`
- sponsor 图片

可自定义：修改 `defaultSelector`。

## 8. 样式系统（全局/主题变量）

### 8.1 样式总入口

位置：`docs/.vitepress/theme/styles/index.scss`

用途：统一引入所有样式模块。

### 8.2 品牌色与组件变量

位置：`docs/.vitepress/theme/styles/vars.scss`

用途：覆盖 VitePress CSS 变量。

常改项：

- 品牌色（`--vp-c-brand-*`）
- 按钮、首页 hero、自定义块、代码块等变量

### 8.3 主题增强样式

位置：`docs/.vitepress/theme/styles/vitepress.scss`

用途：修复/增强默认主题样式（导航、表格、暗色模式链接、转场等）。

### 8.4 彩虹动画主题

位置：`docs/.vitepress/theme/styles/rainbow.scss`

用途：定义品牌色渐变动画。

可改项：

- 动画时长（当前 246s）
- 关键帧色板
- 是否在 `prefers-reduced-motion` 下禁用

### 8.5 图片放大层级样式

位置：`docs/.vitepress/theme/styles/medium-zoom.scss`

用途：控制放大遮罩 z-index 和背景色。

### 8.6 Tailwind 注入

位置：`docs/.vitepress/theme/styles/tailwind.scss`

用途：注入 Tailwind 的 `base/components/utilities`。

## 9. Tailwind / PostCSS 自定义

### 9.1 Tailwind 配置

位置：`tailwind.config.js`

用途：Tailwind 扫描范围和预设。

当前：

- 预设来自 `@femm/tailwind-config`
- 扫描 `./docs/**/*.{js,ts,md,vue}`

### 9.2 PostCSS 配置

位置：`postcss.config.js`

用途：CSS 后处理。

当前：

- `tailwindcss`
- `autoprefixer`

## 10. 内容资源与静态文件

### 10.1 公共静态资源

位置：`docs/public/`

用途：作为站点根路径资源直接访问。

常见：

- `docs/public/logo.png`
- `docs/public/favicon.ico`
- `docs/public/icons/*`

引用方式示例：

- `/logo.png`
- `/icons/nodejs.svg`

## 11. 评论、统计、多语言文案

### 11.1 giscus 评论

位置：`docs/.vitepress/config.ts` -> `themeConfig.comment`

必填项：

- `repo`
- `repoId`
- `category`
- `categoryId`

生成地址：`https://giscus.app/zh-CN`

### 11.2 visitor 统计

位置：`docs/.vitepress/config.ts` -> `themeConfig.visitor.badgeId`

用途：站点/页面访问量统计 badge。

### 11.3 中文文案

位置：`docs/.vitepress/config.ts` -> `themeConfig`

可改项：

- `returnToTopLabel`
- `sidebarMenuLabel`
- `darkModeSwitchLabel`
- `docFooter.prev/next`
- `lastUpdated.text`

## 12. 部署与平台配置

### 12.1 GitHub Pages 自动部署

位置：`.github/workflows/deploy.yml`

用途：push `main` 后自动构建并发布到 `gh-pages`。

可改项：

- 触发分支/路径
- Node 版本
- 发布分支
- 构建命令

### 12.2 Netlify

位置：`netlify.toml`

用途：指定 Node 版本、构建命令、输出目录。

### 12.3 Vercel

位置：`vercel.json`

用途：控制 Git 分支自动部署行为（当前关闭 `gh-pages`）。

## 13. 插件与补丁（进阶）

### 13.1 Markdown Vue 预览

位置：

- 启用：`docs/.vitepress/config.ts` -> `vite.plugins: [MarkdownPreview()]`
- 示例：`docs/test.md` 里 ` ```vue preview ` 代码块

用途：在 markdown 内直接预览 Vue 示例。

### 13.2 pnpm patch 补丁

位置：

- 补丁文件：`patches/vite-plugin-markdown-preview@1.1.1.patch`
- 声明位置：`package.json` -> `pnpm.patchedDependencies`

用途：修复上游插件对 frontmatter 的解析能力（本项目已打补丁）。

## 14. 常见自定义任务速查

1. 改站点标题/描述/Logo：`docs/.vitepress/config.ts`
2. 改首页文案和卡片：`docs/index.md`
3. 改导航页卡片数据：`docs/nav/data.ts`
4. 改导航栏菜单：`docs/.vitepress/configs/nav.ts`
5. 改全局主题色：`docs/.vitepress/theme/styles/vars.scss` 或 `rainbow.scss`
6. 开/关评论：全局在 `config.ts`，单页 frontmatter `comment: false`
7. 新增图标资源：放到 `docs/public/icons/`，在 `data.ts` 用 `/icons/xxx.svg`
8. 改部署策略：`.github/workflows/deploy.yml` / `netlify.toml` / `vercel.json`
9. 新增友情链接页：`docs/friends/index.md` + `docs/friends/data.ts`，并在 `docs/.vitepress/configs/nav.ts` 增加 `/friends/`

## 15. 文件职责总览（按目录）

- `docs/.vitepress/config.ts`：站点总配置（最高优先级入口）
- `docs/.vitepress/configs/*`：拆分的导航/侧边栏/head 子配置
- `docs/.vitepress/theme/*`：主题扩展、布局插槽、组件、自定义逻辑
- `docs/.vitepress/theme/styles/*`：全局视觉与变量系统
- `docs/index.md`：首页内容
- `docs/nav/index.md`：导航页模板
- `docs/nav/data.ts`：导航数据源
- `docs/public/*`：静态资源仓库
- `.github/workflows/deploy.yml`：GitHub Actions 部署脚本
- `tailwind.config.js` / `postcss.config.js`：样式工具链配置
- `.husky/*`：提交流程自动化校验

---

如果你后面要做“完全个性化改造”（比如改成产品导航、学习资源导航、团队内网导航），优先改这 4 个文件就能出结果：

1. `docs/index.md`
2. `docs/nav/data.ts`
3. `docs/.vitepress/config.ts`
4. `docs/.vitepress/theme/styles/vars.scss`

## 16. 最小改造清单（10 步快速换成你自己的站）

1. 改站点名称和描述  
   文件：`docs/.vitepress/config.ts`  
   修改 `title`、`description`

2. 替换站点 logo  
   文件：`docs/public/logo.png`、`docs/.vitepress/config.ts`  
   把 `logo.png` 换成你的图，然后确认 `themeConfig.logo` 指向 `/logo.png`

3. 替换 favicon  
   文件：`docs/public/favicon.ico`、`docs/.vitepress/configs/head.ts`  
   确认 `head.ts` 中图标链接是 `/favicon.ico`

4. 改首页主视觉文案  
   文件：`docs/index.md`  
   修改 `hero.name`、`hero.text`、`hero.tagline`

5. 改首页按钮跳转  
   文件：`docs/index.md`  
   修改 `hero.actions` 里的 `text` 与 `link`

6. 改首页功能卡片  
   文件：`docs/index.md`  
   修改 `features` 的 `icon/title/details/link`

7. 改顶部导航菜单  
   文件：`docs/.vitepress/configs/nav.ts`  
   保留你需要的菜单项，删除空白占位项

8. 改导航页站点数据  
   文件：`docs/nav/data.ts`  
   按你的分类替换 `NAV_DATA`（每项至少保留 `title + link`）

9. 改页脚与社交链接  
   文件：`docs/.vitepress/config.ts`  
   修改 `themeConfig.socialLinks`、`themeConfig.footer`

10. 处理评论与访问统计  
    文件：`docs/.vitepress/config.ts`  
    要开启：填写 `themeConfig.comment`（giscus）和 `themeConfig.visitor.badgeId`  
    暂时不用：可先清空或注释这两项，避免前台显示无效信息

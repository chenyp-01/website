import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { createMediumZoomProvider } from './composables/useMediumZoom'

import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import MLifePosts from './components/MLifePosts.vue'

import './styles/index.scss'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 默认 m-nav-layout，页面 frontmatter.layoutClass 可覆盖 */
    props.class = frontmatter.value?.layoutClass || 'm-nav-layout'

    return h(MLayout, props)
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)

    app.provide('DEV', process.env.NODE_ENV === 'development')

    app.component('MNavLinks', MNavLinks)
    app.component('MLifePosts', MLifePosts)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/',
          ),
        { immediate: true },
      )
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import confetti from 'canvas-confetti'

/**
 * 全站背景特效：极光光斑（CSS）+ 点击撒花（canvas-confetti）
 * - 点击页面空白处在点击位置炸开撒花
 * - 右下角开关，偏好持久化到 localStorage
 */

const STORAGE_KEY = 'peng-bg-fx'

/* ------------------------- 状态 ------------------------- */
const on = ref(true)

if (typeof window !== 'undefined') {
  try {
    on.value = localStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    /* 忽略隐私模式等异常 */
  }
}

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const toggle = () => {
  on.value = !on.value
  try {
    localStorage.setItem(STORAGE_KEY, on.value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

/* 同步 body class：供全局样式把导航栏改为毛玻璃透明，露出背景光斑 */
const syncBodyClass = (v: boolean) => {
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('m-fx-active', v)
  }
}

watch(on, syncBodyClass)

/* ------------------------- 点击撒花 ------------------------- */
const onClick = (e: MouseEvent) => {
  if (!on.value || reduced) return
  const el = e.target as HTMLElement | null
  if (!el) return
  // 跳过按钮/链接等交互元素，避免误触发
  if (el.closest('a, button, input, textarea, select, [role="button"]')) return

  confetti({
    particleCount: 80,
    spread: 70,
    origin: {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    },
  })
}

onMounted(() => {
  syncBodyClass(on.value)
  window.addEventListener('click', onClick)
})

onBeforeUnmount(() => {
  syncBodyClass(false)
  window.removeEventListener('click', onClick)
})
</script>

<template>
  <Teleport to="body">
    <div class="m-fx">
      <div v-show="on" class="m-fx-stage" aria-hidden="true">
        <i class="orb o1"></i>
        <i class="orb o2"></i>
        <i class="orb o3"></i>
        <i class="orb o4"></i>
        <i class="orb o5"></i>
      </div>
      <button
        class="m-fx-toggle"
        type="button"
        :aria-pressed="on"
        :title="on ? '关闭彩色背景与撒花' : '开启彩色背景与撒花'"
        @click.stop="toggle"
      >
        <span class="fx-ico" :class="{ off: !on }">🎉</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.m-fx-toggle {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 45;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 72%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.m-fx-toggle:hover {
  transform: scale(1.08);
}

.fx-ico {
  font-size: 16px;
  line-height: 1;
  filter: saturate(1.2);
}

.fx-ico.off {
  filter: grayscale(1) opacity(0.45);
}

@media (max-width: 640px) {
  .m-fx-toggle {
    right: 14px;
    bottom: 14px;
    width: 38px;
    height: 38px;
  }
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

/**
 * 全站背景特效：极光光斑（CSS）+ 彩色烟花（Canvas）
 * - 自动定时绽放 + 点击页面空白处手动放烟花
 * - 右下角开关，偏好持久化到 localStorage
 */

const STORAGE_KEY = 'peng-bg-fx'

/* ------------------------- 状态 ------------------------- */
const on = ref(true)
const cv = ref<HTMLCanvasElement | null>(null)
const { isDark } = useData()

if (typeof window !== 'undefined') {
  try {
    on.value = localStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    /* 忽略隐私模式等异常 */
  }
}

/* ------------------------- 引擎状态 ------------------------- */
type Dust = { x: number; y: number; r: number; ph: number; spd: number; alpha: number }
type Rocket = { x: number; y: number; vy: number; hue: number; targetY: number }
type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  grav: number
  drag: number
  life: number
  maxLife: number
  hue: number
  sat: number
  light: number
  size: number
  twinkle: boolean
}
type PendingBurst = { x: number; y: number; hue: number; fuse: number }

let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let running = false
let disposed = false

let w = 0
let h = 0
let lastTs = 0
let autoTimer = 1.2 // 首朵烟花稍作延迟
let nextGap = 0

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

const dusts: Dust[] = []
const rockets: Rocket[] = []
const sparks: Spark[] = []
const pending: PendingBurst[] = []

const PALETTE = [45, 320, 190, 260, 15, 140, 205] // 金/洋红/青/紫/橙/绿/蓝

/* ------------------------- 工具 ------------------------- */
const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const resize = () => {
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = window.innerWidth
  h = window.innerHeight
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  ctx = canvas.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initDusts()
}

const initDusts = () => {
  dusts.length = 0
  const count = Math.min(Math.round((w * h) / 26000), 80)
  for (let i = 0; i < count; i++) {
    dusts.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.5, 1.6),
      ph: Math.random() * Math.PI * 2,
      spd: rand(0.6, 1.8),
      alpha: rand(0.2, 0.5),
    })
  }
}

/* ------------------------- 烟花 ------------------------- */
const fireRocket = (fromX?: number, targetY?: number) => {
  if (rockets.length >= 2 || sparks.length > 420) return
  const x = fromX ?? rand(w * 0.12, w * 0.88)
  const ty = targetY ?? rand(h * 0.2, h * 0.5)
  const dy = Math.max(h + 4 - ty, 60)
  rockets.push({
    x,
    y: h + 4,
    // 用能量守恒估算初速度，保证大致飞到目标高度
    vy: -Math.sqrt(2 * 0.14 * dy) * rand(0.82, 0.98),
    hue: pick(PALETTE) + rand(-10, 10),
    targetY: ty,
  })
}

const burst = (x: number, y: number, hue: number, scale = 1) => {
  const count = Math.min(Math.round(rand(70, 120) * scale), 140)
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2 + rand(-0.12, 0.12)
    const speed = rand(0.4, 3.6) * scale
    const twinkle = Math.random() < 0.22
    sparks.push({
      x,
      y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      grav: rand(0.035, 0.075),
      drag: rand(0.002, 0.009),
      life: rand(50, 105) * scale,
      maxLife: 105,
      hue: hue + rand(-18, 18),
      sat: twinkle ? rand(55, 75) : rand(80, 98),
      light: twinkle ? rand(62, 72) : rand(58, 66),
      size: twinkle ? rand(1.4, 2.6) : rand(0.9, 2),
      twinkle,
    })
  }
  // 小概率二次绽放，更华丽
  if (Math.random() < 0.16) {
    pending.push({ x, y, hue: (hue + 180 + rand(-20, 20)) % 360, fuse: rand(26, 48) })
  }
}

/* ------------------------- 主循环 ------------------------- */
const step = (dt: number) => {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  const now = performance.now()

  // 1. 静态闪烁星光
  ctx.globalCompositeOperation = isDark.value ? 'lighter' : 'source-over'
  for (const d of dusts) {
    const a = d.alpha * (0.5 + 0.5 * Math.sin(now * 0.001 * d.spd + d.ph))
    if (isDark.value) {
      ctx.fillStyle = `hsla(210, 90%, 92%, ${a.toFixed(3)})`
    } else {
      ctx.fillStyle = `hsla(235, 60%, 42%, ${(a * 0.6).toFixed(3)})`
    }
    ctx.beginPath()
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // 2. 自动发射
  if (!reduced) {
    autoTimer -= dt
    if (autoTimer <= 0) {
      fireRocket()
      autoTimer = nextGap
      // 桌面端 2.6~5s 一朵；触屏设备降频省电
      nextGap = coarse ? rand(9, 16) * 60 : rand(2.6, 5.2) * 60
    }
  }

  // 3. 二次绽放倒计时
  for (let i = pending.length - 1; i >= 0; i--) {
    pending[i].fuse -= dt
    if (pending[i].fuse <= 0) {
      const b = pending[i]
      burst(b.x, b.y, b.hue, 0.45)
      pending.splice(i, 1)
    }
  }

  // 4. 上升的火箭
  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i]
    r.vy += 0.14 * dt
    r.y += r.vy * dt
    // 拖尾
    sparks.push({
      x: r.x + rand(-0.6, 0.6),
      y: r.y,
      vx: rand(-0.15, 0.15),
      vy: rand(-0.05, 0.3),
      grav: 0,
      drag: 0,
      life: rand(8, 16),
      maxLife: 16,
      hue: r.hue,
      sat: 95,
      light: 72,
      size: rand(1.6, 2.4),
      twinkle: false,
    })
    if (r.y <= r.targetY) {
      burst(r.x, r.y, r.hue)
      rockets.splice(i, 1)
    } else if (r.y > h + 60) {
      rockets.splice(i, 1)
    }
  }

  // 5. 爆炸粒子
  ctx.globalCompositeOperation = isDark.value ? 'lighter' : 'source-over'
  for (let i = sparks.length - 1; i >= 0; i--) {
    const p = sparks[i]
    p.life -= dt
    if (p.life <= 0) {
      sparks.splice(i, 1)
      continue
    }
    p.vy += p.grav * dt
    const d = Math.pow(0.965, dt)
    p.vx *= d
    p.vy *= d
    p.x += p.vx * dt
    p.y += p.vy * dt

    const t = Math.max(p.life / p.maxLife, 0)
    let a = t < 0.25 ? t / 0.25 : 1 // 末端淡出
    a = Math.pow(a, 1.6) * 0.95
    if (p.twinkle) {
      a *= 0.55 + 0.45 * Math.sin(p.life * 0.45)
    }
    if (a <= 0.01) continue
    ctx.globalAlpha = a
    ctx.fillStyle = `hsl(${p.hue.toFixed(1)}, ${p.sat}%, ${p.light}%)`
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

const tick = (ts: number) => {
  if (disposed) return
  raf = requestAnimationFrame(tick)
  if (!running) return
  const dt = Math.min((ts - lastTs) / 16.6667, 2.5)
  lastTs = ts
  step(dt)
}

/* ------------------------- 启停 ------------------------- */
const start = () => {
  if (running || !cv.value) return
  canvas = cv.value
  resize()
  running = true
  autoTimer = 1.2 * 60
  nextGap = 3.6 * 60
  lastTs = performance.now()
  if (reduced) {
    // 尊重系统"减少动态"设置：只画一帧静态星光
    step(1)
  } else {
    raf = requestAnimationFrame(tick)
  }
}

const stop = () => {
  running = false
  cancelAnimationFrame(raf)
  raf = 0
  rockets.length = 0
  sparks.length = 0
  pending.length = 0
  if (ctx && canvas) {
    ctx.clearRect(0, 0, w, h)
  }
}

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

watch(on, (v) => {
  syncBodyClass(v)
  if (v) start()
  else stop()
})

/* ------------------------- 事件 ------------------------- */
const onClick = (e: MouseEvent) => {
  if (!on.value || reduced) return
  const el = e.target as HTMLElement | null
  if (!el) return
  // 跳过按钮/链接等交互元素，避免误触弹烟花
  if (el.closest('a, button, input, textarea, select, [role="button"]')) return
  fireRocket(e.clientX, e.clientY - 60)
}

const onResize = () => {
  if (on.value) resize()
}

onMounted(() => {
  syncBodyClass(on.value)
  window.addEventListener('resize', onResize)
  window.addEventListener('click', onClick)
  if (on.value) start()
})

onBeforeUnmount(() => {
  disposed = true
  syncBodyClass(false)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('click', onClick)
  stop()
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
      </div>
      <canvas v-show="on" ref="cv" class="m-fx-canvas" aria-hidden="true"></canvas>
      <button
        class="m-fx-toggle"
        type="button"
        :aria-pressed="on"
        :title="on ? '关闭彩色背景与烟花' : '开启彩色背景与烟花'"
        @click.stop="toggle"
      >
        <span class="fx-ico" :class="{ off: !on }">🎆</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.m-fx-canvas {
  position: fixed;
  inset: 0;
  z-index: 25; /* 高于内容、低于导航(30)与侧边栏(60) */
  pointer-events: none;
}

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

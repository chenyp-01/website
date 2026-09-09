<script setup lang="ts">
/**
 * 迷你唱片机
 * - 点击首页旋转 logo 或右下角音乐按钮，播放/暂停背景音乐
 * - 循环播放，全站生效（切页不断歌）
 * - 音乐文件放在 docs/public/music/bgm.mp3（构建时打进站点资源）
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const AUDIO_SRC = '/music/bgm.mp3'

const playing = ref(false)
let audio: HTMLAudioElement | null = null

const toggle = async () => {
  if (!audio) {
    audio = new Audio(withBase(AUDIO_SRC))
    audio.loop = true
    audio.preload = 'metadata'
    audio.addEventListener('play', () => {
      playing.value = true
    })
    audio.addEventListener('pause', () => {
      playing.value = false
    })
    audio.addEventListener('error', () => {
      // 音乐文件缺失时静默降级，仅控制台提示
      console.warn(`[MPlayer] 未找到音乐文件：${withBase(AUDIO_SRC)}，请放到 docs/public/music/bgm.mp3`)
    })
  }

  if (audio.paused) {
    try {
      await audio.play()
    } catch {
      /* 浏览器自动播放策略拦截时忽略，等用户再次点击 */
    }
  } else {
    audio.pause()
  }
}

/* 点击首页旋转 logo 也可播放/暂停 */
const onDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.m-home-layout .image-src')) {
    toggle()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  audio?.pause()
})
</script>

<template>
  <Teleport to="body">
    <button
      class="m-player"
      type="button"
      :class="{ playing }"
      :title="playing ? '暂停音乐' : '播放音乐'"
      aria-label="播放或暂停背景音乐"
      @click.stop="toggle"
    >
      <span class="m-player-ico">{{ playing ? '⏸' : '🎵' }}</span>
    </button>
  </Teleport>
</template>

<style scoped>
.m-player {
  position: fixed;
  right: 20px;
  bottom: 72px;
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

.m-player:hover {
  transform: scale(1.08);
}

.m-player.playing {
  border-color: var(--vp-c-brand-1);
}

.m-player-ico {
  font-size: 16px;
  line-height: 1;
  filter: saturate(1.2);
}

@media (max-width: 640px) {
  .m-player {
    right: 14px;
    bottom: 64px;
    width: 38px;
    height: 38px;
  }
}
</style>

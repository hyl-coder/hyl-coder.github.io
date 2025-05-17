<template>
  <div class="background-container">
    <div class="grid"></div>
    <div class="glow-line" style="top: 45%"></div>
    <div class="glow-line" style="top: 55%"></div>
    <h1 class="title">爱吃小薯条</h1>
    <canvas ref="canvas" class="particles"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  reset: () => void
  update: () => void
}

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const width = ref(0)
const height = ref(0)
let animationFrameId: number | null = null

class ParticleImpl implements Particle {
  x = 0
  y = 0
  vx = 0
  vy = 0
  radius = 0
  color = ''

  reset() {
    this.x = Math.random() * width.value
    this.y = Math.random() * height.value
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.radius = Math.random() * 2
    this.color = `hsl(${Math.random() * 120 + 200}, 100%, 70%)`
  }

  update() {
    if (!ctx) return

    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width.value) this.vx *= -1
    if (this.y < 0 || this.y > height.value) this.vy *= -1

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const particles = ref<ParticleImpl[]>([])

const initCanvas = () => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    if (!ctx) return

    width.value = window.innerWidth
    height.value = window.innerHeight

    canvas.value.width = width.value
    canvas.value.height = height.value

    particles.value = Array.from({ length: 200 }, () => {
      const p = new ParticleImpl()
      p.reset()
      return p
    })
  }
}

const animate = () => {
  if (ctx) {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'
    ctx.fillRect(0, 0, width.value, height.value)

    particles.value.forEach(p => p.update())
  }
  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (canvas.value) {
    width.value = window.innerWidth
    height.value = window.innerHeight
    canvas.value.width = width.value
    canvas.value.height = height.value
  }
}

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0a0a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
      linear-gradient(rgba(0,150,255,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,150,255,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: gridMove 20s linear infinite;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 4rem;
  color: #00f3ff;
  text-shadow: 0 0 10px #00f3ff,
  0 0 20px #00f3ff,
  0 0 30px #00f3ff;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #00f3ff, #7d12ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: scan 3s linear infinite;
}

.glow-line {
  position: absolute;
  width: 200%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7d12ff, transparent);
  animation: flow 6s linear infinite;
  filter: drop-shadow(0 0 5px #7d12ff);
}

@keyframes gridMove {
  from { background-position: 0 0; }
  to { background-position: 30px 30px; }
}

@keyframes flow {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(50%); }
}

@keyframes scan {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}
</style>
<template>
  <div class="congratulation-card">
    <div class="soft-ribbon">
      预祝 <span class="potato-highlight">小薯条</span> 考试顺利！
    </div>
    <div class="content">
      <h1>
        中国第34届会计师
        <span class="potato-highlight big">小薯条</span>
        <span class="sub-title">预祝考试顺利！</span>
      </h1>
      <p>
        未来可期，<span class="potato-highlight">小薯条</span>金榜题名！
      </p>
      <div class="soft-fireworks"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 预留逻辑
</script>

<style scoped>
.congratulation-card {
  max-width: 540px;
  margin: 48px auto;
  padding: 38px 30px 30px 30px;
  background: linear-gradient(135deg, #f9f4fd 0%, #fce4ec 100%);
  border-radius: 24px;
  box-shadow: 0 6px 32px 0 rgba(186, 104, 200, 0.08), 0 1.5px 8px 0 rgba(233, 30, 99, 0.05);
  font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

.soft-ribbon {
  position: absolute;
  left: -36px;
  top: 18px;
  background: linear-gradient(90deg, #fce4ec, #f3e5f5, #fce4ec);
  color: #a96eb7;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 10px 60px;
  border-radius: 12px 12px 12px 0;
  box-shadow: 0 2px 8px rgba(186, 104, 200, 0.08);
  transform: rotate(-6deg);
  z-index: 2;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.content {
  z-index: 1;
  position: relative;
  text-align: center;
}

.content h1 {
  margin: 58px 0 18px 0;
  font-size: 2rem;
  color: #a96eb7;
  font-weight: 700;
  letter-spacing: 1px;
}

.potato-highlight {
  color: #d16ba5;
  background: #f8e1f4;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
  box-shadow: 0 1px 6px #e1bee755;
  border: 1.5px solid #f3e5f5;
  margin: 2px 2px;
  display: inline-block;
}

.potato-highlight.big {
  font-size: 1.5em;
  color: #b39ddb;
  border-color: #e1bee7;
  background: #f3e5f5;
  box-shadow: 0 2px 10px #e1bee755;
}

.sub-title {
  display: block;
  margin-top: 10px;
  font-size: 1.1em;
  color: #ce93d8;
  font-weight: 500;
  letter-spacing: 1px;
}

.content p {
  font-size: 1.12rem;
  color: #a96eb7;
  margin-bottom: 28px;
  line-height: 1.8;
}

/* 柔和的烟花效果 */
.soft-fireworks {
  width: 100%;
  height: 60px;
  background: transparent;
  position: relative;
  margin-top: 18px;
}
.soft-fireworks::before,
.soft-fireworks::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 30%;
  width: 90px;
  height: 90px;
  background: repeating-conic-gradient(from 0deg, #f3e5f5 0 18deg, transparent 18deg 36deg, #fce4ec 36deg 54deg, transparent 54deg 72deg);
  border-radius: 50%;
  opacity: 0.35;
  transform: translate(-50%, -50%) scale(0.9);
  animation: soft-fireworks 3.2s infinite linear;
  filter: blur(2px);
}
.soft-fireworks::after {
  background: repeating-conic-gradient(from 20deg, #f9f4fd 0 18deg, transparent 18deg 36deg, #e1bee7 36deg 54deg, transparent 54deg 72deg);
  opacity: 0.22;
  animation-delay: 1.4s;
  filter: blur(2.8px);
}
@keyframes soft-fireworks {
  0% { transform: translate(-50%, -50%) scale(0.8) rotate(0deg);}
  100% { transform: translate(-50%, -50%) scale(1.1) rotate(360deg);}
}
</style>

<template>
  <div class="app-container">
    <!-- 边缘触发的悬浮菜单 -->
    <div
        class="hover-trigger"
        @mouseenter="showMenu"
        @mouseleave="scheduleHideMenu"
    >
      <div class="trigger-line"></div>

      <transition name="menu-fade">
        <div
            v-if="isMenuVisible"
            class="float-menu"
            @mouseenter="cancelHide"
            @mouseleave="scheduleHideMenu"
        >
          <nav class="nav-content">
            <router-link
                v-for="(item, index) in menuItems"
                :key="index"
                :to="item.path"
                class="nav-item"
            >
              <span class="item-text">{{ item.title }}</span>
              <div class="active-indicator"></div>
            </router-link>
          </nav>
        </div>
      </transition>
    </div>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuVisible = ref(false)
let hideTimeout: number | null = null

const menuItems = [
  { title: '爱吃小薯条', path: '/index' },
  { title: '祝考试顺利', path: '/examination' }
]

const showMenu = () => {
  isMenuVisible.value = true
  cancelHide()
}

const scheduleHideMenu = () => {
  hideTimeout = setTimeout(() => {
    isMenuVisible.value = false
  }, 300)
}

const cancelHide = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #fafafa;
}

.hover-trigger {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  width: 16px;
  height: 100vh;
  transition: all 0.3s ease;
}

.trigger-line {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 40%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hover-trigger:hover .trigger-line {
  height: 60%;
  background: rgba(0, 0, 0, 0.4);
}

.float-menu {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 1.2rem 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.nav-item {
  position: relative;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.item-text {
  position: relative;
  z-index: 1;
}

.active-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: rgba(25, 118, 210, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #1976d2;
}

.nav-item:hover .active-indicator {
  width: 100%;
}

.nav-item.router-link-exact-active {
  color: #1976d2;
  font-weight: 500;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(-20px);
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  transition: filter 0.3s ease;
}
</style>
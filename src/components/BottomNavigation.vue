<template>
  <div class="tab-bottom">
    <div
      class="tab-item"
      v-for="(item, index) in tabList"
      :key="index"
      @click="navigateTo(item.path)"
    >
      <img :src="activeIndex === index ? item.active : item.src" />
      <span :class="{ current: activeIndex === index }">{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const currentRoute = ref('')
const activeIndex = ref(0)

const tabList = [
  {
    title: '首页',
    src: require('@/assets/tab/tab-icon-HomeWork.png'),
    active: require('@/assets/tab/tab-icon-HomeWork-active.png'),
    path: '/HomeWork'
  },
  {
    title: '社区',
    src: require('@/assets/tab/tab-icon-ChatArea.png'),
    active: require('@/assets/tab/tab-icon-ChatArea-active.png'),
    path: '/ChatArea'
  },
  {
    title: '工具',
    src: require('@/assets/tab/tab-icon-ToolBox.png'),
    active: require('@/assets/tab/tab-icon-ToolBox-active.png'),
    path: '/ToolBox'
  },
  {
    title: '我的',
    src: require('@/assets/tab/tab-icon-UserInfo.png'),
    active: require('@/assets/tab/tab-icon-UserInfo-active.png'),
    path: '/UserInfo'
  }
]

const navigateTo = (path) => {
  router.push(path)
}

watchEffect(() => {
  currentRoute.value = route.path
  activeIndex.value = tabList.findIndex(item => item.path === route.path)
})
</script>

<style scoped>
.tab-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.8rem;
  background: #FFFFFF;
  border-top: 0.0625rem solid #f7f7f7;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 0.8rem;
}

.tab-item img {
  width: 2.4rem;
  height: 2.4rem;
  margin-bottom: 0.3rem;
}

.current {
  color: #1196DB;
}
</style>
<template>
  <div>
    <BottomNavigation v-if="showNavigation" />
    <main class="main-content" :style="{ paddingBottom: showNavigation ? '60px' : '0' }">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    BottomNavigation
  },
  setup() {
    const route = useRoute()
    const showNavigation = computed(() => {
      return ['/HomeWork', '/ChatArea', '/ToolBox', '/UserInfo'].includes(route.path)
    })
    return {
      showNavigation
    }
  }
}
</script>

<style>
.main-content {
  padding-bottom: 3.75rem;
  touch-action: pan-y;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background: #F1F2F4;
  width: 100vw;
  height: 100vh;
  font-size: 0.6rem;
  font-size: 16px;
}
</style>

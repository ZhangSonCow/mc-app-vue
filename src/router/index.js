import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/HomeWork',
    component: () => import('@/views/HomeWork.vue')
  },
  {
    path: '/ChatArea',
    component: () => import('@/views/ChatArea.vue')
  },
  {
    path: '/ToolBox',
    component: () => import('@/views/ToolBox.vue')
  },
  {
    path: '/UserInfo',
    component: () => import('@/views/UserInfo.vue')
  },
  {
    path: '/WorkDetail',
    component: () => import('@/views/WorkDetail.vue')
  },
  {
    path: '/',
    redirect: '/HomeWork'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
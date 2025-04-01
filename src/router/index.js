import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/HomeWork'
  },
  {
    path: '/UserLogin',
    component: () => import('@/views/UserLogin.vue')
  },
  {
    path: '/HomeWork',
    component: () => import('@/views/HomeWork/index.vue')
  },
  {
    path: '/WorkDetail',
    component: () => import('@/views/HomeWork/detail.vue')
  },
  {
    path: '/ChatArea',
    component: () => import('@/views/ChatArea/index.vue')
  },
  {
    path: '/ToolBox',
    component: () => import('@/views/ToolBox/index.vue')
  },
  {
    path: '/UserInfo',
    component: () => import('@/views/UserInfo/index.vue')
  },
  {
    path: '/Setting',
    component: () => import('@/views/UserInfo/setting.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
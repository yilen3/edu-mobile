import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Course from '@/views/course/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  // 为了能走直接访问到首页，可以采用传统的方式而不使用路由懒加载
  // 下面的component，没有 s
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requireAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
    meta: { requireAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-info/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay'),
    meta: { requireAuth: true },
    props: true
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 设置导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some(records => records.meta.requireAuth)) {
    // 验证是 Vuex 的 store 中是否存储用户登陆信息
    if (!store.state.user) {
      // 未登录，跳转到能录页面
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    next()
  }
})

export default router

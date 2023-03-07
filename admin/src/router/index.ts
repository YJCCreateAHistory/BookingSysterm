import pageRoutes from './module/page';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';
// 登录时间
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: 'Login'
    }
  },
  ...pageRoutes,
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    return next();
  }
  if (to.name !== 'Login' && window.localStorage.getItem('accessToken') == null) {
    return next({
      name: 'Login'
    })
  }
  next();
})

export default router;

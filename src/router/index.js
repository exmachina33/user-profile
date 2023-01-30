import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: () => import('../layouts/AppLayout'),
    children: [
      {
        path: '/',
        component: () => import('../views/ProfileView'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/EmptyLayout'),
    children: [
      {
        path: '/login',
        component: () => import('../components/Forms/AuthForm'),
      }
    ]
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../layouts/EmptyLayout'),
    children: [
      {
        path: '/registration',
        component: () => import('../views/RegistrationView'),
      }
    ]
  },
  {
    path: '/change',
    name: 'change',
    meta: { auth: true },
    component: () => import('../layouts/EmptyLayout'),
    children: [
      {
        path: '/',
        component: () => import('../views/ChangeView'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let uid = store.getters.userUid
  if(!uid) uid = JSON.parse(localStorage.getItem('userUid'))
  const requireAuth = to.matched.some(record => record.meta.auth)
  if(!uid && requireAuth) {
    next('/login')
    return
  }
  store.commit('saveUserUid', uid)
  next()
})

export default router

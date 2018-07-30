import Vue from 'vue'
import iView from 'iview'
import Util from '../libs/util'
import VueRouter from 'vue-router'
import { routes } from './router'

const mode = process.env.EGG_SERVER_ENV === 'prop' ? 'history' : 'hash'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = { mode, routes }

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  next()
})

router.afterEach((to) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

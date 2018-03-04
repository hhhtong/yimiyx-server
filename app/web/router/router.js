import Main from '@/page/Main.vue'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
const $import = file => {
  if (process.env.EGG_SERVER_ENV !== 'prod') {
    return require('@/page/' + file + '.vue').default
  } else {
    return () => import('@/page/' + file + '.vue')
  }
}

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: $import('login')
}

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: $import('error-page/404')
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: $import('error-page/403')
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: $import('error-page/500')
}

export const locking = {
  path: '/locking',
  name: 'locking',
  component: $import('main-components/lockscreen/components/locking-page')
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', title: '工作台', name: 'home_index', component: $import('home/home') },
    { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: $import('own-space/own-space') },
    { path: 'message', title: '消息中心', name: 'message_index', component: $import('message/message') }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/purchase-manage',
    icon: 'ios-folder',
    name: 'purchase-manage',
    title: '采购管理',
    component: Main,
    children: [
      {
        path: 'supplier-list',
        icon: 'ios-paper-outline',
        name: 'purchase-manage__supplier-list',
        title: '供货商管理',
        component: $import('purchase-manage/supplier-list')
      }, {
        path: 'enquiry-list',
        icon: 'ios-list-outline',
        name: 'purchase-manage__enquiry-list',
        title: '询价明细',
        component: $import('purchase-manage/enquiry-list')
      }, {
        path: 'caigou-list',
        icon: 'ios-list-outline',
        name: 'caigou-list',
        title: '采购明细',
        component: $import('purchase-manage/caigou-list')
      }
    ]
  }, {
    path: '/goods-manage',
    icon: 'ios-folder',
    name: 'goods-manage',
    title: '商品管理',
    component: Main,
    children: [
      {
        path: 'goods-list',
        icon: 'ios-paper-outline',
        name: 'goods-list',
        title: '商品列表',
        component: $import('goods-manage/goods-list')
      }, {
        path: 'goods-category',
        icon: 'ios-paper-outline',
        name: 'goods-category',
        title: '商品分类',
        component: $import('goods-manage/goods-category')
      }
    ]
  },
  // {
  //   path: '/access',
  //   icon: 'key',
  //   name: 'access',
  //   title: '权限管理',
  //   component: Main,
  //   children: [
  //     { path: 'index', title: '权限管理', name: 'access_index', component: $import('access/access') }
  //   ]
  // },
  // {
  //   path: '/access-test',
  //   icon: 'lock-combination',
  //   title: '权限测试页',
  //   name: 'accesstest',
  //   access: 0,
  //   component: Main,
  //   children: [
  //     { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: $import('access/access-test') }
  //   ]
  // },
  // {
  //   path: '/error-page',
  //   icon: 'android-sad',
  //   title: '错误页面',
  //   name: 'errorpage',
  //   component: Main,
  //   children: [
  //     { path: 'index', title: '错误页面', name: 'errorpage_index', component: $import('error-page/error-page') }
  //   ]
  // }
]

// 所有上面定义的路由都要写在下面的routers里
export const routes = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
]

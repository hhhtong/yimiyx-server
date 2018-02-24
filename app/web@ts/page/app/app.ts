import clientRender from 'client';
// import serverRender from 'server';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import app from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from 'store';
import router from 'router/index';
import { appRouter } from 'router/router';
import { VirtualScroller } from 'vue-virtual-scroller';

Vue.use(iView)
Vue.component('virtual-scroller', VirtualScroller)
sync(store, router);

const options = {
  base: '/app',
  ...app,
  router,
  store,
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
  },
  created() {
    const tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
};


export default clientRender(options);
// export default EASY_ENV_IS_NODE ? serverRender(options) : clientRender(options);
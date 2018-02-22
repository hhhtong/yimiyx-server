import Vue from 'vue';
import App from 'app';
import app from './app.vue';
// import router from 'router/index';
// import { appRouter } from 'router/router';
// import store from 'store';

export default App.init({
  base: '/app',
  ...app,
  // router,
  // store,
  // render: h => h(app),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created() {
    const tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
    });
    this.$store.commit('setTagsList', tagsList);
  }
});
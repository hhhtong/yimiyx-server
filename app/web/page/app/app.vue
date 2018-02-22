<style lang="stylus">
@import "../../styles/common.styl";

html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from 'router/index';
import { appRouter } from 'router/router';
import store from 'store';

Vue.use(iView)

export default {
  router,
  store,
  // render: h => h(app),
  data() {
    return {
      currentPageName: '',
      theme: this.$store.state.app.themeColor
    }
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
}
</script>

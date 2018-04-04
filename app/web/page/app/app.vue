<style lang="stylus">
@import "../../styles/common.styl"
@import "../../styles/iview.styl"
@import "../../styles/scrollbar.styl"

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
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from 'store'
import router from 'router/index'
import { appRouter } from 'router/router'
import { mapState } from 'vuex'
import { VirtualScroller } from 'vue-virtual-scroller'
import iViewArea from 'iview-area'

Vue.use(iView)
Vue.use(iViewArea)
Vue.component('virtual-scroller', VirtualScroller)

export default {
  router,
  store,
  data() {
    return {
      currentPageName: '',
      theme: this.$store.state.app.themeColor
    }
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
  },

  mounted() {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
    this.updateTableConHeight()
    window.addEventListener('resize', this.updateTableConHeight)
  },

  updated () {
    this.updateTableConHeight()
  },

  methods: {
    // 更新各个页面中的table的高度
    updateTableConHeight() {
      const currentTableCon = this.$el.querySelector('.table-con > .ivu-layout')

      if (currentTableCon) {
        this.$store.commit('SET_TABLECONHEIGHT', currentTableCon.clientHeight)
      }
    }
  }
}
</script>

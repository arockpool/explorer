<template>
  <div>
    <!-- <Childlink v-model="chainRouter" /> -->
    <!-- 子路由 -->
    <nuxt-child />
  </div>
</template>
<script>
import Childlink from '@/components/common/Childlink'
import Cookie from 'js-cookie'

export default {

  name: 'Index',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  watch: {
    $route(to) {

    }
  },

  computed: {

  },

  asyncData({ app }) {
    return {

    }
  },

  data: function() {
    return {
      // 主网信息子路由
      chainRouter: [
        { path: '/', title: 'Lang.Data', active: false },
        { path: '/gas', title: 'Lang.GAS', active: false },
        { path: '/tipset', title: 'Lang.BLOCK', active: false },
        // { path: '/msg', title: 'Lang.MESSAGE', active: false },
        // { path: '/memory', title: 'Lang.Message pool', active: false }
        { path: '/order', title: 'Lang.order', active: false }
      ]
    }
  },

  methods: {

  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
// 弹出框标题居中
.el-dialog__header{
  .el-dialog__title{
    font-weight: normal;
  }
  text-align: center;
}
.el-popover{
  text-align: center;
}
</style>
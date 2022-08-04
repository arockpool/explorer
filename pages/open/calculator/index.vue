<template>
  <div class="flex flex-col mt-3">
    <div class="flex items-center justify-center lg:justify-start bg-high h-12 lg:h-16 lg:px-24">
      <template v-for="(item, index) in paths" v-key="index">
        <n-link class="flex items-center text-xl font-medium" :class="item.active ? 'text-main' : 'text-dark'" :to="item.to + queryStr(item.key)">
          {{ item.title }}
        </n-link>
        <div class="w-px h-6 bg-dark mx-8" v-if="index < paths.length - 1"></div>
      </template>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'open_calculator',

  name: 'OpenCalculator',

  watch: {
    $route: {
      handler: function(n, o) {
        this.pathActiveHandler(n.path)
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters({
      query: 'getOpenRMDQuery',
    })
  },

  data: function() {
    return {
      paths: [{
        title: '满存算力产出',
        to: '/open/calculator/effective',
        active: false,
        key: 'effective'
      }, {
        title: '算力产出',
        to: '/open/calculator/machine',
        active: false,
        key: 'machine'
      }]
    }
  },

  methods: {
    pathActiveHandler: function(path) {
      this.paths.map(p => {
        p.active = path == p.to
      })
    },
    queryStr(pathKey) {
      let qStr = [],
        query = this.query[pathKey] || {}
      Object.keys(query).map(key => {
        if (query[key]) {
          qStr.push(`${key}=${query[key]}`)
        }
      })
      let str = qStr.join('&')
      return str ? '?' + str : ''
    }
  },

  mounted: function() {

  },

  beforeMount: function() {
    this.pathActiveHandler(this.$route.path)
    // 设置参数
    let query = this.query,
      key = ''
    this.paths.map(p => {
      if (p.active) key = p.key
    })
    query[key] = this.$route.query
    this.$store.commit('setOpenRMDQuery', query)
  }
}
</script>
<style>
</style>
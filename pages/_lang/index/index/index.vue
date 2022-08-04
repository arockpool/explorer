<template>
  <div class=" lg:relative">
    <div class="hidden lg:block" v-loading='loading'>
      <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th class="w-24 py-4 px-4 font-medium text-6C757E">{{$t('Lang.Rank')}}</th>
            <!-- <th class="py-4 font-medium  text-6C757E">{{$t('Lang.Storage pool name')}}</th> -->
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Owner ID')}}</th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Effective computing power')}}</th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Near 24h output efficiency')}}
              <!-- <el-popover trigger="hover" :content="$t('Lang.The number of FIL produced in the past 24 hours')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover> -->
            </th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Nearly 24h power growth')}}
              <!-- <el-popover trigger="hover" :content="$t('Lang.Latest 24h Mining Efficiency')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover> -->
            </th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Number of blocks')}}
              <!-- <el-popover trigger="hover" :content="$t('Lang.Increment of effective computing power in the past 24h')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover> -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
            <!-- 排名 -->
            <td class="w-24 py-3 px-4  text-center truncate text-dark">
              <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
            </td>
            <!-- <td class="py-3 text-center">
              --
            </td> -->
            <td class="py-3 text-center">
              <n-link :to="`/${lang}/chain/storagePool/${item.owner_id}`" class='text-main cursor-pointer hover:opacity-75'>{{item.owner_id}}</n-link>
            </td>
            <td class="py-3 text-center">
              {{item.power | formatPower(2)[0]}} {{item.power | formatPower(2)[1]}}
            </td>
            <td class="py-3 text-center">
              {{item.avg_reward | formatTrueFil(true)}}/TiB
            </td>
            <td class="py-3 text-center">
              <span :class="{'text-red-500' : item.increase_power_offset < 0}">{{item.increase_power_offset | formatPower(2)[0]}} {{item.increase_power_offset | formatPower(2)[1]}}</span>
            </td>
            <td class="py-3 text-center">
              {{item.total_block_count}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lg:hidden block" v-loading='loading'>
      <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + 'data_index'">
        <!-- 排名 -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Rank')}}</span>
          <div>
            <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
          </div>
        </div>
        <!-- 存储池名称 -->
        <!-- <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Storage pool name')}}</span>
          <div>
            --
          </div>
        </div> -->
        <!-- Owner ID -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Owner ID')}}</span>
          <div>
            <n-link :to="`/${lang}/chain/storagePool/${item.owner_id}`" class='text-main cursor-pointer hover:opacity-75'>{{item.owner_id}}</n-link>
          </div>
        </div>
        <!-- 有效算力 -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Effective computing power')}}</span>
          <div>
            {{item.power | formatPower(2)[0]}} {{item.power | formatPower(2)[1]}}
          </div>
        </div>
        <!-- 近24h产出效率 -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Near 24h output efficiency')}}</span>
          <div>
            {{item.avg_reward | formatTrueFil(true)}}/TiB
          </div>
        </div>
        <!-- 近24h算力增量 -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Nearly 24h power growth')}}</span>
          <div>
            <span :class="{'text-red-500' : item.increase_power_offset < 0}">{{item.increase_power_offset | formatPower(2)[0]}} {{item.increase_power_offset | formatPower(2)[1]}}</span>
          </div>
        </div>
        <!-- 验证成功数量 -->
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Number of blocks')}}</span>
          <div>
            {{item.total_block_count}}
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 lg:mt-6">
      <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RankPower',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
    })
  },

  asyncData({ app }) {
    let data = {
      overview: {},
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: []
    }
    return app.$axios.post('/api/explorer/get_miner_pool_ranking_list', {
        page_index: 1,
        page_size: 20
      })
      .then(res => {
        if (res.code != 0) return data
        data.objs = res.data.objects
        data.total_count = res.data.total_count
        return data
      })
  },

  data: function() {
    return {
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [],
      imgs: [
        require("@/assets/imgs/Rank1.png"),
        require("@/assets/imgs/Rank2.png"),
        require("@/assets/imgs/Rank3.png"),
      ],
      lang: this.$store.state.locale,
      loading:false
    }
  },
  beforeMount(){
  },

  methods: {
    searchRecordHandler(pageIndex) {
      this.loading = true
      this.$axios.post('/api/explorer/get_miner_pool_ranking_list', {
        // sector_type:'0',
        page_index: pageIndex,
        page_size: this.page_size
      })
      .then(res => {
        if (res.code != 0) return
        this.loading = false
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = pageIndex
      })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
  },

  mounted: function() {
  },

  beforeDestroy: function() {

  }
}
</script>
<style>

</style>
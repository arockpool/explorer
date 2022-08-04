<template>
  <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Arock Pool')}}</p>
    <div class="rounded-md bg-white ">
      <!-- <div class="flex items-center justify-between lg:h-20 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg font-medium text-dark mb-2">{{$t('Lang.Mining Pool Management Node')}}</span>
        </div>
      </div> -->
      <div class="w-full flex flex-wrap lg:px-36 py-6">
        <div class="w-1/2 lg:w-1/3 flex items-center" v-for="(item, index) in overview" :key="item.title">
          <!-- <div class="flex-1 flex flex-col justify-center items-center my-4 bg-background py-9 mx-2 rounded-md"> -->
          <div class="lg:flex justify-between my-2 mybox mx-2 rounded-md w-full items-center h-42 lg:px-20 px-2">
            <img class="w-10 lg:w-12 my-4 lg:mx-0 mx-auto" :src="images[index]">
            <div>
              <div class='text-center lg:text-right'>
                <span class="text-center" v-if="item.val == '四大洲九大区域'">
                  <span class='text-2xl text-main'>4</span>
                  <span class=''>{{$t('Lang.Continent')}}</span>
                  <span class='text-2xl text-main'>9</span>
                  <span class=''>{{$t('Lang.Region')}}</span>
                </span>
                <span class="text-2xl text-center text-main" v-if="item.val !== '四大洲九大区域'">{{item.val}}</span>
                <span>{{item.unit}}</span>
              </div>
              <p class="text-848599 text-center ">{{$t(item.title)}}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='bg-white py-6 hidden lg:block'>
      <!-- 地图 -->
      <div class='lg:w-4/5  w-full m-auto relative map'>
        <img class='m-auto'  src="@/assets/imgs/map.png" alt="">
        <!-- 地图上小点 -->
        <div v-for="i in point" :key="i.name" class='absolute mapbox' :style="{top:i.top+'%',left:i.left+'%'}">
          <div class="map mx-auto" :class="{'ml_30':lang =='en','ml_20': lang == 'zh'}">
          <!-- <div class="map mx-auto"> -->
            <div>
              <span>
                <label></label>
                <i class="flashPoint"></i>
              </span>
            </div>
          </div>
          <!-- <p class='text-white lg:text-lg text-base lg:mt-16 mt-10 mx-auto text-red-500' >{{$t(i.name)}}</p> -->
        </div>

      </div>
    </div>

    <!--       <div class="hidden lg:flex my-3">
        <div class="flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center text-xl h-20 font-bold border-b border-solid border-E6E6EA px-6">
            <i class="inline-block bg-3A70FF w-1 h-5 rounded mr-2"></i>
            <span class="text-xl font-bold">{{$t('Lang.64GiB sector node')}}</span>
          </div>
          <table class="table-fixed w-full">
            <thead>
              <tr class="border-b border-solid border-E8E7EB">
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Mining Pool Ranking')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Node')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Effective computing power')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.24h computing power growth rate')}}
                  <el-popover trigger="hover" :content="$t('Lang.The sum of the effective computing power of the packaging sector completed in the last 24 hours')">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Power Growth in 24 hours')}}
                  <el-popover trigger="hover" :content="$t('Lang.Increment of effective computing power in the past 24h')">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Sector size')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in 10" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                <template v-if="miners_64[index]">
                  <td class="w-1/12 h-12 text-center truncate">
                    <template v-if="(index + 1 + (page_size * (page_index_64 - 1))) < 4">
                      <img :src="imgs[index]" class="h-6 inline-block" alt="">
                    </template>
                    <template v-else>
                      <span>{{index + (page_size * (page_index_64 - 1)) + 1}}</span>
                    </template>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <n-link :to="`/${lang}/chain/addr/${miners_64[index].miner_no}`">{{miners_64[index].miner_no}}</n-link>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_64[index].power | formatPower()[0]}} {{miners_64[index].power | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_64[index].increase_power_24 | formatPower()[0]}} {{miners_64[index].increase_power_24 | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span :class="{'text-red-500' : miners_64[index].increase_power_offset_24 < 0}">{{miners_64[index].increase_power_offset_24 | formatPower()[0]}} {{miners_64[index].increase_power_offset_24 | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_64[index].sector_size | formatPower()[0]}} {{miners_64[index].sector_size | formatPower()[1]}}</span>
                  </td>
                </template>
                <template v-else>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                </template>
              </tr>
            </tbody>
          </table>
          <div class="my-6">
            <Pagination :pageSize="page_size" :pageIndex="page_index_64" :totalCount="total_count_64" @indexChange="searchBigRecordHandler"></Pagination>
          </div>
        </div>
        <div class="w-3 h-full"></div>
        <div class="flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center text-xl h-20 font-bold border-b border-solid border-E6E6EA px-6">
            <i class="inline-block bg-3A70FF w-1 h-5 rounded mr-2"></i>
            <span class="text-xl font-bold">{{$t('Lang.32GiB sector node')}}</span>
          </div>
          <table class="table-fixed w-full">
            <thead>
              <tr class="border-b border-solid border-E8E7EB">
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Mining Pool Ranking')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Node')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Effective computing power')}}</th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.24h computing power growth rate')}}
                  <el-popover trigger="hover" :content="$t('Lang.The sum of the effective computing power of the packaging sector completed in the last 24 hours')">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Power Growth in 24 hours')}}
                  <el-popover trigger="hover" :content="$t('Lang.Increment of effective computing power in the past 24h')">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </th>
                <th class="w-1/12 py-4 font-medium">{{$t('Lang.Sector size')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in 10" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                <template v-if="miners_32[index]">
                  <td class="w-1/12 h-12 text-center truncate">
                    <template v-if="(index + 1 + (page_size * (page_index_32 - 1))) < 4">
                      <img :src="imgs[index]" class="h-6 inline-block" alt="">
                    </template>
                    <template v-else>
                      <span>{{index + (page_size * (page_index_32 - 1)) + 1}}</span>
                    </template>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <n-link :to="`/${lang}/chain/addr/${miners_32[index].miner_no}`">{{miners_32[index].miner_no}}</n-link>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_32[index].power | formatPower()[0]}} {{miners_32[index].power | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_32[index].increase_power_24 | formatPower()[0]}} {{miners_32[index].increase_power_24 | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span :class="{'text-red-500' : miners_32[index].increase_power_offset_24 < 0}">{{miners_32[index].increase_power_offset_24 | formatPower()[0]}} {{miners_32[index].increase_power_offset_24 | formatPower()[1]}}</span>
                  </td>
                  <td class="w-1/12 h-12 text-center">
                    <span>{{miners_32[index].sector_size | formatPower()[0]}} {{miners_32[index].sector_size | formatPower()[1]}}</span>
                  </td>
                </template>
                <template v-else>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                  <td class="w-1/12 h-12 text-center"><br /></td>
                </template>
              </tr>
            </tbody>
          </table>
          <div class="my-6">
            <Pagination :pageSize="page_size" :pageIndex="page_index_32" :totalCount="total_count_32" @indexChange="searchSmallRecordHandler"></Pagination>
          </div>
        </div>
      </div>
      <div class="block lg:hidden my-3 border border-solid border-E8E7EB">
        <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
          <div class="flex items-center">
            <i class="inline-block bg-3A70FF w-1 h-5 rounded mr-2"></i>
            <span class="lg:text-xl font-bold">{{$t('Lang.Node list')}}</span>
          </div>
          <ul class="flex justify-center checkbox-content">
            <li class="cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectSectorhandler(item)" :class="{ 'first': index == 0, 'last':  checkboxList.length - 1 == index, 'active': item == sector }" v-for="(item, index) in checkboxList" :key="item">
              {{item}}
            </li>
          </ul>
        </div>
        <div v-for="(item, index) in objs" class="p-3 border-b border-solid border-E8E7EB" :key="index + 'miner_index'">
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Mining Pool Ranking')}}</span>
            <template v-if="sector == '64GiB'">
              <template v-if="(index + 1 + (page_size * (page_index_64 - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index_64 - 1)) + 1}}</span>
              </template>
            </template>
            <template v-else>
              <template v-if="(index + 1 + (page_size * (page_index_32 - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index_32 - 1)) + 1}}</span>
              </template>
            </template>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Node')}}</span>
            <n-link :to="`/${lang}/chain/addr/${item.miner_no}`">{{item.miner_no}}</n-link>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Effective computing power')}}</span>
            <span>{{item.power | formatPower()[0]}} {{item.power | formatPower()[1]}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.24h computing power growth rate')}}
              <el-popover trigger="hover" :content="$t('Lang.The sum of the effective computing power of the packaging sector completed in the last 24 hours')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </span>
            <span>{{item.increase_power_24 | formatPower()[0]}} {{item.increase_power_24 | formatPower()[1]}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Power Growth in 24 hours')}}
              <el-popover trigger="hover" :content="$t('Lang.Increment of effective computing power in the past 24h')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </span>
            <span :class="{'text-red-500' : item.increase_power_offset_24 < 0}">{{item.increase_power_offset_24 | formatPower()[0]}} {{item.increase_power_offset_24 | formatPower()[1]}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Sector size')}}</span>
            <span>{{item.sector_size | formatPower()[0]}} {{item.sector_size | formatPower()[1]}}</span>
          </div>
        </div>
        <div class="my-3" v-if="sector == '64GiB'">
          <Pagination :pageSize="page_size" :pageIndex="page_index_64" :totalCount="total_count_64" @indexChange="searchBigRecordHandler"></Pagination>
        </div>
        <div class="my-3" v-else>
          <Pagination :pageSize="page_size" :pageIndex="page_index_32" :totalCount="total_count_32" @indexChange="searchSmallRecordHandler"></Pagination>
        </div>
      </div> -->
    <!-- </div> -->
    <!--     <div class="flex flex-col items-center justify-center px-10 " style='height:60vh'>
      <img class="my-12" style='width:200px' src="@/assets/img/icon-arock-empty.png">
      <span class="text-center" style='color:#5F6578'>{{$t('Lang.ArockpoolMaintenance')}}</span>
    </div> -->
  </div>
</template>
<script>
import utils from '@/static/utils.js'
import { mapGetters } from 'vuex'


export default {
  name: 'Arockpool',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      globalOverview: 'getGlobalOverview'
    }),
    overview() {
      let {
        location,
        active_miners_count,
        total_power_v,
        increase_power_v,
        increase_power_offset_v,
        block_count
      } = this.pool_overview
      return [{
        title: 'Lang.Location_1',
        val: location
      }, {
        title: 'Lang.Number of  Mining Pool Nodes',
        val: active_miners_count
      }, {
        title: 'Lang.Mining pool total computing power',
        val: utils.formatPower(total_power_v)[0],
        unit: utils.formatPower(total_power_v)[1]
      }, {
        title: 'Lang.24h computing power growth rate',
        val: utils.formatPower(increase_power_v)[0],
        popover: 'Lang.The cloud pool has completed the total effective computing power of the packaged sector in the past 24 hours',
        unit: utils.formatPower(increase_power_v)[1]
      }, {
        title: 'Lang.Power Growth in 24 hours',
        val: utils.formatPower(increase_power_offset_v)[0],
        popover: 'Lang.Increment of effective computing power of mining pool in the past 24h',
        unit: utils.formatPower(increase_power_offset_v)[1]
      }, {
        title: 'Lang.Number of blocks produced in 24h',
        popover: 'Lang.Number of blocks produced in the mining pool in the past 24h',
        val: utils.formatterAmount(block_count, 0)
      }]
    },
    objs: function() {
      if (this.sector == '64GiB') return this.miners_64
      return this.miners_32
    }
  },

  asyncData({ app }) {
    let data = {
      pool_overview: {},
      page_size: 10,
      // 32
      miners_32: [],
      page_index_32: 1,
      total_count_32: 0,
      // 64
      miners_64: [],
      page_index_64: 1,
      total_count_64: 0
    }
    return app.$axios.post('/api/activity/get_pool_overview', {})
      .then(res => {
        if (res.code != 0) return data
        data.pool_overview = res.data
        return data
        // return app.$axios.post('/api/activity/get_pool_miners', {
        //   sector_type: 0
        // })
      })
      // .then(res => {
      //   if (!res || res.code != 0) return data
      //   data.miners_32 = res.data.objs
      //   data.total_count_32 = res.data.total_count
      //   return app.$axios.post('/api/activity/get_pool_miners', {
      //     sector_type: 1
      //   })
      // })
      // .then(res => {
      //   if (!res || res.code != 0) return data
      //   data.miners_64 = res.data.objs
      //   data.total_count_64 = res.data.total_count
      //   return data
      // })
  },

  data: function() {
    return {
      pool_overview: {},
      page_size: 10,
      // 32
      miners_32: [],
      page_index_32: 1,
      total_count_32: 0,
      // 64
      miners_64: [],
      page_index_64: 1,
      total_count_64: 0,
      // 
      imgs: [
        require('@/assets/img/icon-num-1.png'),
        require('@/assets/img/icon-num-2.png'),
        require('@/assets/img/icon-num-3.png')
      ],
      // 
      sector: '64GiB',
      checkboxList: ['64GiB', '32GiB'],
      lang: this.$store.state.locale,
      images: [
        require('@/assets/img/icon-arock-local.png'),
        require('@/assets/img/icon-arock-nodes.png'),
        require('@/assets/img/icon-arock-power.png'),
        require('@/assets/img/icon-arock-power-speed.png'),
        require('@/assets/img/icon-arock-power-add.png'),
        require('@/assets/img/icon-arock-block.png')
      ],
      // 地图上的点
      point:[
        {name:'Lang.North America',top:'28',left:'20'},
        {name:'Lang.Europe',top:'18',left:'50'},
        {name:'Lang.Qinghai',top:'37',left:'66'},
        {name:'Lang.Sichuan',top:'37',left:'76'},
        {name:'Lang.Gansu',top:'28',left:'75'},
        {name:'Lang.Inner Mongolia',top:'20',left:'62'},
        {name:'Lang.Ningxia',top:'25',left:'70'},
        {name:'Lang.Australia',top:'72',left:'85'},
        {name:'Lang.Taiwan',top:'38',left:'82'},
      ],
    }
  },

  methods: {
    searchSmallRecordHandler(pageIndex) {
      this.$axios.post('/api/activity/get_pool_miners', {
          sector_type: 0,
          page_index: pageIndex,
          page_size: this.page_size
        })
        .then(res => {
          if (res.code != 0) return
          this.miners_32 = res.data.objs
          this.total_count_32 = res.data.total_count
          this.page_index_32 = pageIndex
        })
    },
    searchBigRecordHandler(pageIndex) {
      this.$axios.post('/api/activity/get_pool_miners', {
          sector_type: 1,
          page_index: pageIndex,
          page_size: this.page_size
        })
        .then(res => {
          if (res.code != 0) return
          this.miners_64 = res.data.objs
          this.total_count_64 = res.data.total_count
          this.page_index_64 = pageIndex
        })
    },
    selectSectorhandler(item) {
      if (this.sector == item) return
      switch (item) {
        case '64GiB':
          this.searchSmallRecordHandler(1)
          break;
        case '32GiB':
          this.searchBigRecordHandler(1)
          break;
      }
      this.sector = item
    }
  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.mybox{
    box-shadow: 0px 4px 14px 0px rgba(54, 51, 198, 0.06);
}
/* 地图上点动画 */
.flashPoint{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: red;
  border-radius: 50%;
  margin: 0 auto ;
  animation: run 2.5s ease-in-out infinite;
}
@keyframes run{
    0% {
        transform: scale(1);
    }
    100%{
        opacity: 0;
        transform:scale(1.5)

    }
}
/* 地图动效 */
.map div{
  position: absolute;
  height: 17px;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 17px;
  display: flex;
  align-items: center;
}
.map div span{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #3633c642;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: relative;
  margin-right: 2px;
}
.map div span label{
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #3633c6d0;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: absolute;
  left: 5px;
  top: 5px;
}
.map div span i{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #3633c667;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: absolute;
  left: -2px;
  top: -2px;
  opacity: 0.5;
}
</style>
<template>
  <div>
    <!-- 手机版导航 -->
    <div class='border border-solid border-E8E7EB  py-4 lg:hidden flex rounded-md bg-white'>
    <!-- <div class='mt-3 p-4 lg:hidden flex rounded-md bg-white'> -->
      <n-link class='text-center w-1/4 ' v-for="i in phoneRouter" :key="i.name" :to="`/${lang}${i.path}`">
        <img :src="i.imgUrl" alt="" class='w-16 m-auto'>
        <p>{{$t(i.name)}}</p>
      </n-link>
    </div>
    <!-- 概览信息 -->
    <div class="rounded-md">
      <p class='lg:hidden text-xl pt-6 text-dark'>{{$t('Lang.Overview of the whole network')}}</p>
      <div class="flex items-center bg-white rounded-md ">
        <!-- phone -->
        <ul class="lg:hidden flex w-full flex-wrap py-4">
          <li class="w-1/2 lg:w-1/6 mb-2 flex items-center" v-for="(item, index) in dataOverview" :key="item.title" :class="{'hidden lg:flex' : index > 7 && !showAll}">
            <div v-if="item.price" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover">
                  <div class='text-left'>
                    <p>{{$t('Lang.24h lowest price')}}: ${{item.low}}</p>
                    <p>{{$t('Lang.24h highest price')}}: ${{item.high}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <!-- 价格单独样式 -->
              <div class='flex items-end' :class="{'text-FB4D56':item.unit<0,'text-01B464':item.unit>0}">
                <span class="text-xl lg:text-2xl">{{ item.val }}</span>
                <img v-show="item.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:10px;padding-bottom:5px' class='mx-1'>
                <img v-show="item.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:10px;padding-bottom:6px' class='mx-1'>
                <span class="text-lg lg:text-xl" style='padding-bottom:2px'>{{ item.unit }}%</span>
              </div>
            </div>
            <!-- 时间单独样式 -->
            <div v-else-if="item.heightTime" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl " v-if="newTime==''">--</span>
                <span class="text-xl lg:text-2xl " v-else>{{newTime}}</span>
                <span class="text-base">{{$t('Lang.Seconds ago')}}</span>
              </div>
            </div>
            <div v-else class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl ">{{ item.val }}</span>
                <span class="text-base">{{ item.unit }}</span>
              </div>
            </div>
          </li>
        </ul>
        <!-- pc -->
         <ul class="hidden lg:flex w-full flex-wrap py-4 px-4">
          <li class="w-1/6 mb-2 flex items-center" v-for="(item, index) in dataOverview" :key="item.title" :class="{'hidden lg:flex' : index > 7 && !showAll}">
            <div v-if="item.price" class="flex-1 flex flex-col justify-center items-center border-t border-b border-solid border-E3E7F8 py-6 ">
              <p class="text-848599 text-center px-4 text-base mb-1">
                {{ $t(item.title) }}

                <el-popover v-if="item.popover" trigger="hover">
                  <div class='text-left'>
                    <p>{{$t('Lang.24h lowest price')}}: ${{item.low}}</p>
                    <p>{{$t('Lang.24h highest price')}}: ${{item.high}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <!-- 价格单独样式 -->
              <div class='flex items-end' :class="{'text-FB4D56':item.unit<0,'text-01B464':item.unit>0}">
                <span class="text-xl lg:text-2xl">{{ item.val }}</span>
                <img v-show="item.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:10px;padding-bottom:5px' class='mx-1'>
                <img v-show="item.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:10px;padding-bottom:6px' class='mx-1'>
                <span class="text-lg lg:text-xl" style='padding-bottom:2px'>{{ item.unit }}%</span>
              </div>
            </div>
            <!-- 时间单独样式 -->
            <div v-else-if="item.heightTime" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E3E7F8 py-3 ">
              <p class="text-848599 text-center px-4 text-base mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl " v-if="!newTime">--</span>
                <span class="text-xl lg:text-2xl " v-else>{{newTime}}</span>
                <span class="text-base">{{$t('Lang.Seconds ago')}}</span>
              </div>
            </div>
            <div v-else class="flex-1 flex flex-col justify-center items-center border-solid border-E3E7F8 py-3 " :class="{'border-t':index>5&&index<12,'border-b':index>5&&index<18,'py-6':index>5&&index<18}">
              <p class="text-848599 text-center px-4 text-base mb-1" :class="{'h-10':lang == 'en' || lang == 'ja'}">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl ">{{ item.val }}</span>
                <span class="text-base">{{ item.unit }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 全部展开按钮 -->
      <div class="h-10 flex items-center justify-center lg:hidden -mt-4 mb-2" @click="overviewShowHandler">
        <span class="text-848599">{{ showAll ? $t('Lang.Fold') : $t('Lang.Expand') }}</span>
        <i class="ml-1 text-848599" :class="showAll ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      </div>
    </div>
    <!-- 手机端常用功能 -->
    <div class='lg:hidden h-3 bgbox'></div>
    <p class='lg:hidden text-xl pt-6 text-dark'>{{$t('Lang.Common tool')}}</p>
    <div class='flex pb-3'>
      <n-link class="w-1/2 mr-1 " :to="`/${lang}/tool/calculator/effective`">
        <div class="flex items-center justify-between lg:hidden mt-3 p-4 rounded-md" style='background:#F9F9FD'>
            <div class="">
              <p class='text-xl flex items-center mb-2'><img src="../../../assets/imgs/phone_effective.png" alt="" class='mr-2' style='width:16px;height:16px'> {{$t('Lang.FIL calculator2')}}</p>
              <p class='text-6C757E '>{{$t('Lang.Professional exclusive features')}}</p>
            </div>
            <div>
              <img src="../../../assets/imgs/phone_go.png" alt="" style='height:16px'>
            </div>
        </div>
      </n-link>
      <n-link class="w-1/2 ml-1" :to="`/${lang}/tool/pro`">
        <div class="flex items-center justify-between lg:hidden mt-3 p-4 rounded-md" style='background:#F9F9FD'>
            <div class="">
              <p class='text-xl flex items-center mb-2'><img src="../../../assets/imgs/phone_pro.png" alt="" class='mr-2' style='width:16px;height:16px'>{{$t('Lang.Health Report')}}</p>
              <p class='text-6C757E'>{{$t('Lang.Professional exclusive features')}}</p>
            </div>
            <div>
              <img src="../../../assets/imgs/phone_go.png" alt="" style='height:16px'>
            </div>
        </div>
      </n-link>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    
    <div class="">
      <div class="lg:flex hidden">
        <!-- 全网算力 -->
        <div class="flex-1 rounded-md bg-white">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <img src="@/assets/imgs/powerTrend.png" alt="" class='w-5 mr-2'>
              <span class="text-lg">{{$t('Lang.Network Storage Power')}}</span>
            </div>
            <n-link class="text-848599 flex items-center" :to="`/${lang}/statistics/powerTrend`">
              <span>{{$t('Lang.More')}}</span>
              <i class="el-icon-arrow-right"></i>
            </n-link>
          </div>
          <div id="echartsDataAllPower" class="h-64 lg:h-96 lg:px-6 px-4 pb-2"></div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <!-- 生产成本 -->
        <div class="mt-3 lg:mt-0 flex-1 rounded-md bg-white">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <img src="@/assets/imgs/productionCosts.png" alt="" class='w-6 mr-2'>
              <span class="text-lg">{{$t('Lang.Production Costs')}}</span>
            </div>
            <n-link class="text-848599 flex items-center" :to="`/${lang}/statistics/gas`">
              <span>{{$t('Lang.More')}}</span>
              <i class="el-icon-arrow-right"></i>
            </n-link>
          </div>
          <div id="echartsServiceCharge" class="h-64 lg:h-96 lg:px-6 px-4 pb-2"></div>
        </div>
      </div>
        <!-- 挖矿效率 -->
      <div class="mt-3 hidden">
        <!-- <div class="flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <i class="inline-block bg-0DEBCF w-1 h-5 rounded mr-2"></i>
            <span class="lg:text-xl font-bold">{{$t('Lang.Production Efficiency')}}</span>
          </div>
          <div id="echartsEfficiency" class="h-64 lg:h-96"></div>
        </div> -->
        <!-- <div class="w-3 h-full hidden lg:block"></div> -->
        <!-- 市场价格 -->
        <!-- <div class="mt-3 lg:mt-0 flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <i class="inline-block bg-E7A2F2 w-1 h-5 rounded mr-2"></i>
              <span class="font-bold lg:text-xl">{{$t('Lang.Market Price')}}</span>
            </div>
            <div class="h-20 flex justify-end items-center">
              <template v-if="globalOverview.price_change > 0">
                <div class="flex items-center">
                  <span class="text-54B786">{{globalOverview.price | formatNumberFixed(2)}} USDT</span>
                </div>
                <div class="ml-3 px-3 py-1 rounded-full flex items-center bg-54B786">
                  <span class="mr-1 text-white">+{{globalOverview.price_change/globalOverview.price | formatPercentage}}</span>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center">
                  <span class="text-red-500">{{globalOverview.price | formatNumberFixed(2)}} USDT</span>
                </div>
                <div class="ml-3 px-3 py-1 rounded-full flex items-center bg-red-500">
                  <span class="mr-1 text-white">{{globalOverview.price_change/globalOverview.price | formatPercentage}}</span>
                </div>
              </template>
            </div>
          </div>
          <div id="echartsCurrencyTrend" class="h-64 lg:h-96"></div>
        </div> -->
      </div>
      <div class="mt-3 hidden">
        <!-- 扇区质押 -->
        <!-- <div class="flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <i class="inline-block bg-FF00FF w-1 h-5 rounded mr-2"></i>
            <span class="lg:text-xl font-bold">{{$t('Lang.Sector pledge')}}</span>
          </div>
          <div id="echartsSectorPledge" class="h-64 lg:h-96"></div>
        </div> -->
        <!-- <div class="w-3 h-full hidden lg:block"></div> -->
        <!-- 代币通缩 -->
        <!-- <div class="mt-3 lg:mt-0 flex-1 border border-solid border-E8E7EB">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center mr-6">
              <i class="inline-block bg-03A89E w-1 h-5 rounded mr-2"></i>
              <span class="lg:text-xl font-bold">{{$t('Lang.FIL value analysis')}}</span>
            </div>
            <span class="text-base text-75737F">*{{ new Date() | formatDate('y-m-d') }}</span>
          </div>
          <div id="echartsFILCirculation" class="h-64 lg:h-96"></div>
        </div> -->
      </div>
    </div>
    <!-- 区块链数据排行 -->
    <div class='bg-white my-3 pb-1 lg:px-6 rounded-md'>
      <Childlink v-model="chainRouter" :routerTitle='routerTitle' />
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'
import Childlink from '@/components/common/Childlink'

export default {

  name: 'Data',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  computed: {
    ...mapGetters({
      globalOverview: 'getGlobalOverview',
      myprice: 'getFilPrice',
      overviewStat: 'getOverviewStat',
    }),
    // 数据概览
    // dataOverview: function() {
    //   let {
    //     power,
    //     power_inc_24_hour,
    //     avg_reward,
    //     avg_pledge,
    //     block_reward,
    //     block_reward_24_hour,
    //     price,
    //     base_fee,
    //     active_miner_count,

    //     circulating_supply,
    //     burnt_supply,
    //     total_pledge,

    //     height,
    //     avg_tipset_blocks,
    //     account_count,
    //     msg_count,
    //     avg_block_time,

    //     create_gas_32,
    //     create_gas_64,

    //     history_time_gas,

    //     rr_fil_overview
    //   } = this.globalOverview

    //   return [
    //     // 第1排
    //     {
    //       title: 'Lang.Block Height',    //最新高度
    //       val: utils.formatterAmount(height, 0),
    //       popover: 'Lang.Latest Block'
    //     }, {
    //       title: 'Lang.Network Storage Power',   //全网算力
    //       val: utils.formatPower(power, 4)[0],
    //       unit: utils.formatPower(power)[1]
    //     }, {
    //       title: 'Lang.Sector pledge',//扇区质押
    //       val: avg_pledge ? utils.formatFil(avg_pledge * 32, false) : '--',
    //       popover: 'Lang.Sector pledge at current block',
    //       unit: 'FIL/TiB'
    //     }, {
    //       title: 'Lang.Production Efficiency',   //产出效率
    //       val: utils.formatterAmount(avg_reward, 4),
    //       popover: 'Lang.Latest 24h Mining Efficiency',
    //       unit: 'FIL/TiB'
    //     }, {
    //       title: 'Lang.Real-time 32Gib Production Gas_2',    //实时32GiB生产Gas
    //       val: utils.formatFil(create_gas_32, false),
    //       popover: 'Lang.Gas fee per package of 1TiB for 32GiB sector nodes at current height',
    //       unit: 'FIL/TiB'
    //     }, {
    //       title: 'Lang.Real-time 64Gib Production Gas_2',   //实时64GiB生产Gas 
    //       val: utils.formatFil(create_gas_64, false),
    //       popover: 'Lang.Gas fee per package of 1TiB for 64GiB sector nodes at current height',
    //       unit: 'FIL/TiB'
    //     },

    //     // 第2排
    //     // {
    //     //   title: 'Lang.32Gib production Gas in latest 24 hours',  
    //     //   val: history_time_gas ? utils.formatterAmount(history_time_gas.gas_32.create_gas_32) : '--',
    //     //   popover: 'Lang.Average gas fee per package of 1TiB for 32GiB sector nodes in  24 hours',
    //     //   unit: 'FIL/TiB'
    //     // }, {
    //     //   title: 'Lang.64Gib production Gas in latest 24 hours',
    //     //   val: history_time_gas ? utils.formatterAmount(history_time_gas.gas_64.create_gas_64) : '--',
    //     //   popover: 'Lang.Average gas fee per package of 1TiB for 64GiB sector nodes in 24 hours',
    //     //   unit: 'FIL/TiB'
    //     // }, 

    //     {
    //       title: 'Lang.32Gib production Gas in latest 24 hours',       //昨日32GiB生产Gas  
    //       val: rr_fil_overview ? (rr_fil_overview.create_cost_gas_per_t) : '--',
    //       popover: 'Lang.Average gas fee per package of 1TiB for 32GiB sector nodes in  24 hours',
    //       unit: 'FIL/TiB'
    //     }, {
    //       title: 'Lang.64Gib production Gas in latest 24 hours',       //昨日64GiB生产Gas
    //       val: rr_fil_overview ? (rr_fil_overview.create_cost_gas_per_t_64) : '--',
    //       popover: 'Lang.Average gas fee per package of 1TiB for 64GiB sector nodes in 24 hours',
    //       unit: 'FIL/TiB'
    //     },

    //     {
    //       title: 'Lang.Current Sector Pledge Yesterday',       //昨日扇区质押
    //       val: rr_fil_overview ? (rr_fil_overview.avg_pledge) : '--',
    //       popover: 'Lang.Sector pledge at current block yesterday',
    //       unit: 'FIL/TiB'
    //     },

    //     {
    //       title: 'Lang.Rewards per block',       //每区块奖励
    //       val: utils.formatTrueFil(block_reward, false),
    //       popover: 'Lang.Block reward at current height',
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.Output in latest 24 hours',       //近24h产出量
    //       val: utils.formatTrueFil(block_reward_24_hour, false, 0),
    //       popover: 'Lang.The number of FIL produced in the past 24 hours',
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.Number of messages in 24 hours',        //24h消息数
    //       val: utils.formatterAmount(msg_count, 0),
    //       popover: 'Lang.Cumulative number of messages generated in the past 24 hours'
    //     },

    //     // {
    //     //   title: 'Lang.Base Fee',
    //     //   val: utils.formatNewEasyFil(base_fee)[0],
    //     //   unit: utils.formatNewEasyFil(base_fee)[1]
    //     // },

    //     // 第3排
    //     {
    //       title: 'Lang.Total FIL supply',        //FIL总供给量
    //       val: utils.formatterAmount(2000000000, 0),
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.FIL circulation',       //FIL流通量 
    //       val: utils.formatTrueFil(circulating_supply, false, 0),
    //       popover: 'Lang.The sum of FIL in free circulation at present',
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.FIL destruction quantity',        //FIL销毁量
    //       val: utils.formatTrueFil(burnt_supply, false, 0),
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.FIL pledge quantity',       //FIL质押量 
    //       val: utils.formatTrueFil(total_pledge, false, 0),
    //       popover: 'Lang.Sum of FIL of current sector pledge',
    //       unit: 'FIL'
    //     }, {
    //       title: 'Lang.FIL circulation rate',        //FIL流通率
    //       val: circulating_supply ? utils.formatterAmount(circulating_supply / Math.pow(10, 18) / 2000000000 * 100, 4) : '--',
    //       popover: 'Lang.Circulation / total supply',
    //       unit: '%'
    //     }, {
    //       title: 'Lang.Number of wallet addresses',        //钱包地址数
    //       val: utils.formatterAmount(account_count, 0),
    //       popover: 'Lang.The number of wallet addresses on the chain under the new block'
    //     }
    //   ]
    // },
    // 数据概览
    dataOverview: function() {
      let {
        // 最新高度
        height,
        // 最新区块时间
        height_time,
        // 全网有效算力
        power,
        // 24h算力增量
        increase_power_offset,
        // 每区块奖励
        block_reward,
        // 24h产出效率
        avg_reward,
        // 24h产出量
        reward_24,
        // FIL价格

        // 扇区质押
        pledge,
        // 24h消息数
        msg_count,
        // FIL总质押量
        total_pledge,
        // 当前基础费率
        base_fee,
        // 钱包地址数
        total_account,
        // 活跃节点数
        active_miner_count,
        // FIL流通量
        circulating_supply,
        // FIL总拱给量
        
        // FIL销毁量
        burnt_supply,
        // FIL流通率

        // 24h平均每高度区块数
        avg_tipset_blocks
      } = this.globalOverview

      let {
        // 32生产Gas(FIL/TiB)
        create_gas_32,
        // 64生产Gas(FIL/TiB)
        create_gas_64,
        // 算力损失
        increase_power_loss
      } = this.overviewStat

      let {
        price,
        price_change,
        high,
        low,
      } = this.myprice



      return [
        // 最新高度
        {
          title: 'Lang.Block Height',
          val: utils.formatterAmount(height, 0),
          popover: 'Lang.Latest Block'
        },
        // 最新区块时间
        {
          title: 'Lang.Latest block time',
          val: height_time,
          heightTime:true
        },
        // 全网算力
        {
          title: 'Lang.Network Storage Power',
          val: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1]
        },
        // 24h算力增量
        {
          title: 'Lang.Power Growth in 24 hours',
          val: utils.formatPower(increase_power_offset, 4)[0],
          unit: utils.formatPower(increase_power_offset)[1]
        },
        // 算力异常
        {
          title: 'Lang.Abnormal computing power',
          popover: 'Lang.Total of the latest abnormal computing power in the whole network',
          val: utils.formatPower(increase_power_loss, 4)[0],
          unit: utils.formatPower(increase_power_loss)[1]
        },
        // 近24h产出量
        {
          title: 'Lang.Output in latest 24 hours',
          val: utils.formatTrueFil(reward_24, false, 0),
          popover: 'Lang.The number of FIL produced in the past 24 hours',
          unit: 'F'
        },
        // 产出效率
        {
          title: 'Lang.Production Efficiency',
          // val: utils.formatterAmount(avg_reward, 4),
          val: utils.formatTrueFil(avg_reward, 4).split(' ')[0],
          popover: 'Lang.Latest 24h Mining Efficiency',
          unit: 'F/TiB'
        },
        // Pledge 
        {
          title: 'Lang.Sector pledge',
          // val: utils.formatTrueFil(pledge, false, 0),
          val: Number(pledge || 0).toFixed(4),
          popover: 'Lang.Sector pledge at current block',
          unit: 'F/TiB'
        },
        // 32GiB生产Gas(实时)
        {
          title: 'Lang.32GiB production gas(Real time)',
          val: utils.formatTrueFil(create_gas_32) || '--',
          unit: 'F/TiB'
        },
        // 64GiB生产Gas(实时)
        {
          title: 'Lang.64GiB production gas(Real time)',
          val: utils.formatTrueFil(create_gas_64) || '--',
          unit: 'F/TiB'
        },
        // 32GiB生产Gas(昨日)
        {
          title: 'Lang.32GiB production gas(Yesterday)',
          val: this.get_overview_day_list[0] ? utils.formatTrueFil(this.get_overview_day_list[0].rmd_create_gas_32) : '--',
          // val: utils.formatTrueFil(this.get_overview_day_list[0].rmd_create_gas_32) || '--',
          unit: 'F/TiB'
        },
        // 64GiB生产Gas(昨日)
        {
          title: 'Lang.64GiB production gas(Yesterday)',
          val: this.get_overview_day_list[0] ? utils.formatTrueFil(this.get_overview_day_list[0].rmd_create_gas_64) : '--',
          // val: utils.formatTrueFil(this.get_overview_day_list[0].rmd_create_gas_64) || '--',
          unit: 'F/TiB'
        },
        // 当前基础费率
        {
          title: 'Lang.Current base rate',
          val: utils.formatNewEasyFil(base_fee)[0]  || '--',
          unit: utils.formatNewEasyFil(base_fee)[1]
        },
        // 地址数
        {
          title: 'Lang.Number of wallet addresses',
          val: utils.inComdify(total_account) || '--' ,
        },
        // 活跃存储供应商数
        {
          title: 'Lang.Number of active miners',
          val: utils.inComdify(active_miner_count)  || '--' ,
        },
        // 供给量
        {
          title: 'Lang.Total FIL supply',
          val: utils.formatterAmount(2000000000, 0),
          unit: 'F'
        },
        // 流通量
        {
          title: 'Lang.FIL circulation',
          val:  utils.formatTrueFil(circulating_supply, false, 0),
          unit: 'F'
        },
        // 流通率
        {
          title: 'Lang.FIL circulation rate',
          val: circulating_supply ? utils.formatterAmount(circulating_supply / Math.pow(10, 18) / 2000000000 * 100, 4) : '--',
          popover: 'Lang.Circulation / total supply',
          unit: '%'
        },
        // 销毁量
        {
          title: 'Lang.FIL destruction quantity',
          val: utils.formatTrueFil(burnt_supply, false, 0),
          unit: 'F'
        },
        // 24h消息数
        {
          title: 'Lang.Number of messages in 24 hours',
          val:utils.inComdify(msg_count)  || '--' ,
        },
        // 24h平均每高度区块数
        {
          title: 'Lang.Average Blocks per Tipset',
          val: utils.formatterAmount(avg_tipset_blocks) ,
        },
        // 每区块奖励
        {
          title: 'Lang.Rewards per block',
          val: utils.formatTrueFil(block_reward, false),
          popover: 'Lang.Block reward at current height',
          unit: 'F'
        },
        // 总Pledge量
        {
          title: 'Lang.FIL total pledge amount',
          val: utils.formatTrueFil(total_pledge, false, 0),
          unit: 'F'
        },
        // 价格
        // {
        //   title: 'Lang.latest price',
        //   val: '$'+ utils.formatterAmount(price,2),
        //   popover: 'Lang.latest price',
        //   unit: price_change,
        //   price:true,
        //   low:low,
        //   high:high,
        // },


      ]
    },
    // 单TiB质押
    pledgeForOneTiB: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, per.avg_pledge])
        }
      })
      return t
    },
    // 网络流通
    circulation: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, per.circulating_supply / Math.pow(10, 18)])
        }
      })
      return t
    },
    // 全网算力/网络流通
    circulationReversePostion: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, utils.formatPower(per.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(per.circulating_supply / Math.pow(10, 18))])
        }
      })
      return t
    }
  },

  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 30)
    let data = {
      line: [],
      gas: [],
      lookups: [],
      get_overview_day_list:{}
    }
    return app.$axios.post('/api/explorer/get_overview_power_trends', {
        stats_type:'30d'
      })
      .then(res => {
        if (res.code != 0) return data
        data.line = res.data.reverse()
        return app.$axios.post('/api/explorer/get_gas_trends', {})
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.gas = res.data.reverse()
        return  app.$axios.post('/api/explorer/get_overview_day_list', {
          page_size:5,
          page_index:1
        }).then(res=>{
          if (res.code != 0) return data
          data.get_overview_day_list = res.data.objects
          return data
        })
      })
  },

  data: function() {
    return {
      line: [],
      gas: [],
      lookups: [],
      showAll: false,
      today: Math.floor((new Date() - new Date('2020/08/25 06:00:00')) / (24 * 60 * 60 * 1000)),
      chainRouter: [
        { path: `/`, title: 'Lang.Storage pool', active: false },
        { path: `/base/power`, title: 'Lang.Effective computing power', active: false },
        { path: `/base/growth`, title: 'Lang.Power growth rate', active: false },
        { path: '/base/block', title: 'Lang.Number of blocks', active: false },
        { path: `/base/efficiency`, title: 'Lang.Production Efficiency', active: false }
      ],
      routerTitle:{
        title:'Lang.Ranking List',
        img:require('~/assets/imgs/row.png')
      },
      interval: null,
      lang: this.$store.state.locale,
      phoneRouter:[
        {name:'Lang.Blockchain',path:'/blockChain/tipset',imgUrl:require('~/assets/imgs/blockChain.png')},
        {name:'Lang.Stats',path:'/statistics/panoramicData',imgUrl:require('~/assets/imgs/statistics.png')},
        {name:'Lang.Ecological analysis',path:'/ecologicalAnalysis/filindex',imgUrl:require('~/assets/imgs/ecologicalAnalysis.png')},
        {name:'Lang.Tool',path:'/tool/calculator/effective',imgUrl:require('~/assets/imgs/tool.png')},
        {name:'Lang.DataCap',path:'/dataCap',imgUrl:require('~/assets/imgs/dataCap.png')},
      ],
      newTime:'',
      timeInterval:null
    }
  },

  methods: {
    overviewShowHandler() {
      this.showAll = !this.showAll
    },
    // 初始化全网算力走势
    initEchartsAllPowerHandler: function() {
      let y1 = [],
        date = [],
        y2 = [],
        y3 = [],
        y4 = [],
        echartTitle = [];

      if (this.lang == "zh") {
        // echartTitle = ["全网算力", "算力增速", "算力增量",'算力损失'];
        echartTitle = ["全网算力", "算力增速", "算力增量"];
      } else if (this.lang == "en") {
        // echartTitle = ["Network Storage Power", "Power growth rate", "Power Growth",'Loss of computing power'];
        echartTitle = ["Network Storage Power", "Power growth rate", "Power Growth"];
      } else if (this.lang == "ja") {
        // echartTitle = ["全ネット計算力", "ストレージの成長", "漸増ストレージ",'ストレージの喪失'];
        echartTitle = ["全ネット計ストレージ", "ストレージの成長", "漸増ストレージ"];
      } else {
        // echartTitle = ["네트워크 채굴파워", "채굴파워 증가 속도", "채굴파워 증가량",'저장 손실'];
        echartTitle = ["네트워크 채굴파워", "채굴파워 증가 속도", "채굴파워 증가량"];
      }

      this.line.map((item) => {
        y1.push(item.power);
        // y2.push(utils.formatEasyFil(item.increase_power).split(' ')[0]);
        // y3.push(utils.formatEasyFil(item.increase_power_loss).split(' ')[0]);
        // y4.push(utils.formatEasyFil(item.increase_power_offset).split(' ')[0]);
        y2.push(item.increase_power);
        y3.push(item.increase_power_offset);
        // y4.push(item.increase_power_loss);
        date.push(item.date+"  03:00:00");
      });


      let echarts = this.$echarts.init(
        document.getElementById("echartsDataAllPower")
      );
      echarts.clear();
      echarts.setOption(
        echartsUtils.overviewPowerTrendsEchart({
          y1,
          y2,
          y3,
          // y4,
          date,
          echartTitle,
        }),
        false
      );
    },
    // 初始化手续费
    initEchartsServiceChargeHandler: function() {
      let y1 = [],
        date = [],
        y2 = [],
        y3 = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['Base Fee', '32GiB生产Gas', '64GiB生产Gas']
      } else if (this.lang == 'en') {
        echartTitle = ['Base Fee', '32GiB production gas', '64GiB production gas']
      } else if(this.lang == 'ja'){
        echartTitle = ['Base Fee','32GiB生産Gas','64GiB生産Gas']
      } else {
        echartTitle = ['Base Fee', '32GiB생산Gas', '64GiB생산Gas']
      }
      this.gas.map(item => {
        y2.push(item.create_gas_32)
        y3.push(item.create_gas_64)
        // y2.push(utils.formatEasyFil(item.create_gas_32).split(' ')[0]);
        // y3.push(utils.formatEasyFil(item.create_gas_64).split(' ')[0]);
        y1.push(item.base_fee)
        date.push(item.height_time)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsServiceCharge'))
      echarts.hideLoading()
      echarts.setOption(echartsUtils.optionsForServiceCharge({
        y1,
        y2,
        y3,
        date,
        echartTitle
      }))
    },
    // 挖矿效率走势
    initEchartsEfficiencyHandler: function() {
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['产出效率']
      } else if (this.lang == 'en') {
        echartTitle = ['Production Efficiency']
      } else if(this.lang == 'ja'){
        echartTitle = ['生産効率']
      } else {
        echartTitle = ['생산 효율']
      }

      this.line.map(item => {
        y1.push(item.avg_reward)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsEfficiency'))
      echarts.setOption(echartsUtils.optionsForEfficiency({
        y1,
        date,
        echartTitle
      }))
    },
    // 币价走势
    initEchartsCurrencyTrendHandler: function() {
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['价格']
      } else if (this.lang == 'en') {
        echartTitle = ['Price']
      } else if(this.lang == 'ja'){
        echartTitle = ['価格']
      } else {
        echartTitle = ['가격']
      }

      this.line.map(item => {
        y1.push(item.price)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsCurrencyTrend'))
      echarts.setOption(echartsUtils.optionsForCurrencyTrend({
        y1,
        date,
        echartTitle
      }))
    },
    // 扇区质押
    initEchartsSectorPledgeHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsSectorPledge'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['Pledge', '网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Sector pledge', 'Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['セクタ抵当','ネットワーク循環']
      } else {
        echartTitle = ['섹터 서약', '네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForSectorPledge({ y1: this.pledgeForOneTiB, y2: this.circulation, echartTitle }))
    },
    // 代币通缩
    initEchartsFILCirculationHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsFILCirculation'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['全网算力', '网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Network Storage Power', 'Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['全ネット計算力','ネットワーク循環']
      }  else {
        echartTitle = ['네트워크 채굴파워', '네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForFILCirculation({
        echartTitle,
        y1: this.circulationReversePostion,
        date: this.circulationReversePostion[this.today][0],
        power: `${ utils.formatPower(this.globalOverview.power, 4)[0] } ${ utils.formatPower(this.globalOverview.power, 4)[1] }`,
        circulation: `${ utils.formatTrueFil(this.globalOverview.circulating_supply, false, 0) } F`,
        result: utils.formatPower(this.globalOverview.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(this.globalOverview.circulating_supply / Math.pow(10, 18))
      }))
    },
    getGasDataHandler() {
      let charge = this.$echarts.init(document.getElementById('echartsServiceCharge'))
      charge.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      this.$axios.post('/api/explorer/get_gas_trends', {}, { progress: false })
        .then(res => {
          if (res.code != 0) return
          this.gas = res.data.reverse()
          this.initEchartsServiceChargeHandler()
        })
    },
    getLookupsHandler() {
      let pledge = this.$echarts.init(document.getElementById('echartsSectorPledge'))
      pledge.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      let circulation = this.$echarts.init(document.getElementById('echartsFILCirculation'))
      circulation.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      this.$axios.post('/api/activity/get_lookups', {}, { progress: false })
        .then(res => {
          // console.log('/api/activity/get_lookups',res);
          if (res.code != 0) return
          this.lookups = res.data
          this.initEchartsSectorPledgeHandler()
          this.initEchartsFILCirculationHandler()
        })
        .catch(err => {
          pledge.hideLoading()
          circulation.hideLoading()
        })
    },
    getNewTime(){
      if (!this.globalOverview.height_time) return
      var arr = this.globalOverview.height_time.split(/[- : \/]/),
      date2 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      let offset = Number(new Date().getTimezoneOffset()/60) + 8
      var oldTime = date2.getTime()
      var nowTime = Date.parse(new Date())
      this.newTime = (Number(nowTime) + Number(offset*3600000) - Number(oldTime))/1000
      
      // console.log('oldTime',oldTime);
      // console.log('nowTime',nowTime);
      // console.log('newTime',this.newTime);
      // console.log('this.globalOverview.height_time',this.globalOverview.height_time);
      // console.log(offset);
    }
  },

  mounted: function() {
    // this.getNewTime()
    // 绘制图表
    this.initEchartsAllPowerHandler()
    this.initEchartsServiceChargeHandler()
    // this.initEchartsEfficiencyHandler()
    // this.initEchartsCurrencyTrendHandler()
    // 实时更新gas
    this.interval = setInterval(() => {
      this.getGasDataHandler()
    }, 2 * 60 * 1000)
    // 绘制F线图
    // this.getLookupsHandler()

    this.timeInterval = setInterval(()=>{
      this.getNewTime()
    },1000)

    
  },

  beforeDestroy: function() {
    clearInterval(this.interval)
    this.interval = null

    clearInterval(this.timeInterval)
    this.timeInterval = null
  }

}
</script>
<style scoped>

</style>
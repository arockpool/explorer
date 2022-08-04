<template>
  <div v-loading="loadingFlag" class="flex flex-col bg-white px-3 lg:px-24 pt-3 lg:pt-8 pb-3 lg:pb-8 mb-3">
    <!-- 大屏 参与计算的信息 -->
    <div class="hidden lg:flex items-end">
      <div class="flex items-center flex-wrap">
        <div class="bg-white border-b border-solid border-high" :class="{'border-l': index == 0, 'border-r' : index == configs.length - 1}" v-for="(item, index) in configs" :key="index">
          <div class="bg-high py-1 pl-5">
            <span class="text-8F94A8">{{ item.title }}</span>
          </div>
          <div class="py-2">
            <div class="h-8 px-5 flex items-center justify-center border-8F94A8 border-dashed" :class="{'border-l' : index > 0}">
              <template v-if="!item.muti">
                <span class="text-main text-xl font-semibold">{{ item.value }}</span>
              </template>
              <template v-else>
                <div class="flex flex-col">
                  <span class="text-main text-base font-semibold leading-4">{{ item.value_32 }}</span>
                  <span class="text-main text-base font-semibold leading-4">{{ item.value_64 }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <span class="flex-1 text-right text-8F94A8 hidden xl:block">*每30min更新数据</span>
    </div>
    <!-- 小屏 参与计算的信息 -->
    <div class="flex lg:hidden justify-between text-main font-medium bg-F4F5FF">
      <div class="flex-1 border-r border-solid border-F4F5FF">
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">计算日期</span>
          <span>{{ today }}</span>
        </div>
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">算力增速</span>
          <span>{{ config.increase_power_per_day_str }} PiB/天</span>
        </div>
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">平均产出</span>
          <span>{{ config.avg_reward }} F/TiB</span>
        </div>
        <div class="pl-3 py-1 flex bg-white pt-3">
          <span class="text-base mr-2">生产GAS</span>
          <div>
            <span>{{ configs[6].value_32 }}</span>
            <span>{{ configs[6].value_64 }}</span>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">全网算力</span>
          <span>{{ config.total_power_str }}</span>
        </div>
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">Pledge</span>
          <span>{{ config.avg_pledge }} F/TiB</span>
        </div>
        <div class="px-3 py-1">
          <span class="text-8F94A8 text-base mr-2">最新价值</span>
          <span>{{ config.price }} USDT</span>
        </div>
        <div class="pl-3 py-1 flex bg-white pt-3">
          <span class="text-base mr-2">维护GAS</span>
          <div>
            <span>{{ configs[7].value_32 }}</span>
            <span>{{ configs[7].value_64 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="data-handler mt-3 lg:mt-8 block lg:flex items-center">
      <!-- 操作区域 -->
      <div class="w-full lg:w-108 lg:h-148 border-2 lg:border-4 rounded-xl border-main border-solid lg:flex">
        <div class="flex-1 mx-3 lg:ml-8 lg:mr-6">
          <!-- 时间 -->
          <div class="mt-5 mb-2 text-040A25 text-xl">开始时间</div>
          <div class="flex items-center justify-between relative w-full">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
            </el-date-picker>
            <div class="flex items-center justify-center w-6 h-full absolute top-0 right-4">
              <img class="w-6" src="~/assets/imgs/calculator/date-icon.png" />
            </div>
          </div>
          <!-- 速度 -->
          <div class="mt-5 mb-2 text-040A25">
            <span class="text-040A25 text-xl">存储速度</span>
            <el-popover placement="top-start" trigger="hover" content="需要通过存储扇区来获得有效算力，扇区存储速度将直接影响产出">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div>
            <el-input v-model="form.speed" placeholder="存储速度">
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">TiB/天</span>
            </el-input>
          </div>
          <!-- 容量 -->
          <div class="mt-5 mb-2 text-040A25">
            <span class="text-040A25 text-xl">存储容量</span>
            <el-popover placement="top-start" trigger="hover" content="可用于存储算力的存储空间大小">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div>
            <el-input v-model="form.power" placeholder="存储容量">
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">TiB</span>
            </el-input>
          </div>
          <!-- 成本 -->
          <div class="mt-5 mb-2">
            <span class="text-040A25 text-xl">投入成本</span>
            <el-popover placement="top-start" trigger="hover" content="算力机的硬件、运维等成本">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div class="mb-5">
            <el-input v-model="form.cost" placeholder="投入成本">
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">CNY</span>
            </el-input>
          </div>
          <!-- 开始计算 -->
          <el-button type="primary" style="height: 3.5rem;" @click="calculatorHandler">开始计算</el-button>
          <div class="text-8F94A8 text-center text-E9AB1C leading-10 mt-1">*根据经济模型智能分析</div>
        </div>
        <!-- 右边的把手 -->
        <div class="h-full w-8 hidden lg:flex items-center justify-center">
          <div class="w-5 h-136 bg-222B90 rounded-full py-2" style="padding-left: 0.625rem;">
            <div class="h-128 w-10 bg-F4F5FF flex items-center justify-start">
              <div class="h-full w-px bg-222B90 line-shadow"></div>
            </div>
          </div>
        </div>
        <!-- 下边的把手 -->
        <template v-if="calculatorType > 0">
          <div class="w-full h-8 px-1 flex lg:hidden items-center justify-center">
            <div class="w-full h-5 bg-222B90 rounded-full px-2" style="padding-top: 0.625rem;">
              <div class="w-full h-8 bg-F4F5FF">
                <div class="w-full h-px bg-222B90 line-shadow"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 大屏显示的详情 -->
      <div class="w-full flex-1 h-128 hidden lg:flex">
        <!-- 右边内容 -->
        <div class="py-5 pr-5 flex-1 flex flex-col bg-F4F5FF">
          <template v-if="calculatorType == 2">
            <!-- cost -->
            <div class="flex-1 flex items-center">
              <div class="h-full flex-1 bg-main flex flex-col items-center justify-center p-3 rounded-md" :class="{'ml-3' : index > 0}" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-white text-lg opacity-75">{{ cost.title }}
                  <template v-if="cost.tips">
                    <el-popover placement="top-start" trigger="hover" :content="cost.tips">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <div class="text-white">
                  <span class="text-5xl font-medium">{{ cost.value }}</span>
                  <span>{{ cost.desc }}</span>
                </div>
              </div>
            </div>
            <!-- out -->
            <div class="mt-3 flex-1 flex items-center">
              <div class="h-full flex flex-col justify-center flex-1 bg-white rounded-md relative" :class="{'ml-3' : index > 0}" v-for="(out, index) in bigOut" :key="index + 100">
                <div class="w-full flex items-center justify-center">
                  <div class="w-full text-lg flex items-end justify-center">
                    <span class="text-main font-medium">{{ out.day }}</span>
                    <span class="text-main font-medium">天</span>
                    <span class="text-dark">{{ out.key_str }}</span>
                    <template v-if="out.tips">
                      <el-popover placement="top-start" trigger="hover" :content="out.tips">
                        <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                      </el-popover>
                    </template>
                  </div>
                </div>
                <div class="text-center text-E9AB1C">
                  <span class="text-2xl font-medium">{{ out.reward }}</span>
                  <span>{{ out.desc }}</span>
                </div>
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="top-1 right-2 absolute text-8F94A8 opacity-50">*静态测算</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="top-1 right-2 absolute text-8F94A8 opacity-50">*智能测算</span>
                </template>
              </div>
            </div>
            <!-- in -->
            <div class="mt-3 flex-1 flex items-center">
              <div class="h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md" :class="{'ml-3' : index > 0}" v-for="(_in, index) in bigIn" :key="index + 1000">
                <div class="text-dark text-lg">{{ _in.title }}
                  <template v-if="_in.tips">
                    <el-popover placement="top-start" trigger="hover" :content="_in.tips">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <template v-if="!_in.value_64">
                  <div class="text-main">
                    <span class="text-2xl font-medium">{{ _in.value }}</span>
                    <span>{{ _in.desc }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="relative w-full text-center">
                    <div class="text-main">
                      <span class="text-2xl font-medium">{{ _in.value }}</span>
                      <span>{{ _in.desc }}</span>
                      <span>(32G)</span>
                    </div>
                    <div class="text-main absolute leading-4 w-full text-center top-10 left-0">
                      <span class="text-2xl font-medium">{{ _in.value_64 }}</span>
                      <span>{{ _in.desc }}</span>
                      <span>(64G)</span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else-if="calculatorType == 0">
            <div class="w-full h-full flex flex-col items-center justify-center">
              <img class="h-14" src="~assets/imgs/calculator/icon-init.png">
              <span class="text-dark mt-4">输入数据开始计算吧！</span>
            </div>
          </template>
          <template v-else-if="calculatorType == 1">
            <div class="w-full h-full flex flex-col items-center justify-center">
              <img class="h-14" src="~assets/imgs/calculator/icon-init.png">
              <span class="text-dark mt-4">哎呀，计算出错了！</span>
            </div>
          </template>
        </div>
      </div>
      <!-- 小屏幕显示的详情 -->
      <template v-if="calculatorType == 2">
        <div style="padding: 0 .375rem;" class="border-6 border-white border-solid block lg:hidden">
          <div class="bg-F4F5FF px-3 pb-3">
            <!-- cost -->
            <div class="flex-1 flex items-center">
              <div class="h-full flex-1 bg-main flex flex-col p-3 rounded-md" :class="{'ml-3' : index > 0}" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-white">{{ cost.title }}
                  <template v-if="cost.tips">
                    <el-popover placement="top-start" trigger="hover" :content="cost.tips">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <div class="text-white">
                  <span class="text-2xl font-medium">{{ cost.value }}</span>
                  <span>{{ cost.desc }}</span>
                </div>
              </div>
            </div>
            <!-- out -->
            <div class="mt-3 h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md" v-for="(out, index) in bigOut" :key="index + 100">
              <div class="w-full flex items-center justify-between">
                <div class="flex items-end">
                  <span class="text-main font-medium">{{ out.day }}</span>
                  <span class="text-main font-medium">天</span>
                  <span class="text-dark">{{ out.key_str }}</span>
                  <template v-if="out.tips">
                    <el-popover placement="top-start" trigger="hover" :content="out.tips">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="text-8F94A8 opacity-50">*静态测算</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="text-8F94A8 opacity-50">*智能测算</span>
                </template>
              </div>
              <div class="w-full text-E9AB1C">
                <span class="text-2xl font-medium">{{ out.reward }}</span>
                <span>{{ out.desc }}</span>
              </div>
            </div>
            <!-- in -->
            <div class="mt-3 h-full flex-1 bg-white flex flex-col p-3 rounded-md" v-for="(item, index) in bigIn" :key="index + 1000">
              <div class="text-dark">{{ item.title }}
                <template v-if="item.tips">
                  <el-popover placement="top-start" trigger="hover" :content="item.tips">
                    <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                  </el-popover>
                </template>
              </div>
              <template v-if="!item.value_64">
                <div class="text-main">
                  <span class="text-2xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                </div>
              </template>
              <template v-else>
                <div class="text-main">
                  <span class="text-2xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(32G)</span>
                </div>
                <div class="text-main leading-7">
                  <span class="text-2xl font-medium">{{ item.value_64 }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(64G)</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 底部说明 -->
    <div class="text-base mt-3 lg:mt-8 leading-7">
      <div class="text-main">*温馨提示:</div>
      <div class="text-8F94A8">1.全网算力变化、产出、gas费、价值等因素将影响计算。</div>
      <div class="text-8F94A8">2.算力机根据设定的存储速度和存储空间进行存储。</div>
      <div class="text-8F94A8">3.有效算力将在扇区生命周期（540天）内会持续产出。</div>
      <div class="text-8F94A8">4.结果为理论产出，可能与实际产出存在偏差，仅供参考。</div>
      <div class="text-8F94A8">5.计算结果未考虑平台分成。</div>
      <div class="text-8F94A8 block xl:hidden">6.每30min更新数据。</div>
    </div>
    <!-- 分享 -->
    <!-- <a :href="share_url" v-if="form.invite_code" class="block lg:block rr_share mt-2 text-center">
      优质IPFS算力，尽在RMDine →
    </a> -->
  </div>
</template>
<script>
import utils from '@/static/utils.js'

export default {
  layout: 'open_calculator',

  name: 'OpenMachine',

  mixins: [],

  props: ['foobar'],

  components: {

  },

  watch: {

  },

  computed: {
    configs: function() {
      return [{
        title: '计算日期',
        value: this.today
      }, {
        title: '全网算力',
        value: `${ this.config.total_power_str }`
      }, {
        title: '算力增速',
        value: `${ this.config.increase_power_per_day_str } PiB/天`
      }, {
        title: 'Pledge',
        value: `${ this.config.avg_pledge } F/TiB`
      }, {
        title: '平均产出',
        value: `${ this.config.avg_reward } F/TiB`
      }, {
        title: '当前价值',
        value: `${ this.config.price } USDT`
      }, {
        muti: true,
        title: '生产Gas消耗',
        value_32: `${ utils.formatterAmount(this.config.create_cost_gas_per_t, 4)} F/TiB (32G)`,
        value_64: `${ utils.formatterAmount(this.config.create_cost_gas_per_t_64, 4)} F/TiB (64G)`,
      }, {
        muti: true,
        title: '维护Gas消耗',
        value_32: `${ utils.formatterAmount(this.config.keep_cost_gas_per_t, 4) } F/TiB (32G)`,
        value_64: `${ utils.formatterAmount(this.config.keep_cost_gas_per_t_64, 4) } F/TiB (64G)`
      }]
    },
    calculatorType: function() {
      if (!this.isFinished) return 0
      if (this.isFinished && this.isError) return 1
      if (this.isFinished && !this.isError) return 2
    }
  },

  asyncData: function({ app, query }) {
    let rr_power = query.power ? Number(query.power) : '';
    let rr_cost = query.cost ? Number(query.cost) : '';
    let rr_speed = query.speed ? Number(query.speed) : 2;
    // let invite_code = query.invite_code ? query.invite_code : '';
    let invite_code = '';
    return Promise.all([
      app.$axios.post('/api/calculator/get_calculate_info')
    ]).then(res => {
      let config = res[0].data
      let { price, rate, increase_power_per_day_str } = config
      config.price = price = Number(price)
      config.rate = rate = Number(rate)

      return {
        config,
        // 搜索条件
        form: {
          date: new Date(),
          power: rr_power,
          cost: rr_cost,
          speed: rr_speed,
          price,
          growth: increase_power_per_day_str, // 全网算力增速
          invite_code
        }
      }
    })
  },

  data: function() {
    return {
      today: utils.formatDate(new Date, 'y-m-d'),
      isFinished: false,
      isError: false,
      bigCost: [],
      bigIn: [],
      bigOut: [],
      share_url: '',
      loading: null,
      loadingFlag: false
    }
  },

  methods: {
    calculatorHandler: async function() {
      let increase_power_per_day = this.config.increase_power_per_day_str
      if (increase_power_per_day < 0) {
        increase_power_per_day = 0
      }
      if (new Date(utils.formatDate(this.form.date, 'y/m/d')).getTime() < new Date(utils.formatDate(new Date(), 'y/m/d')).getTime()) {
        this.$notification.error({
          title: '错误',
          message: '开始时间，不能小于今日'
        })
        return
      }
      if (!this.form.speed) {
        this.$notification.error({
          title: '错误',
          message: '请输入存储速度'
        })
        return
      } else if (this.form.speed == 0) {
        this.$notification.error({
          title: '错误',
          message: '请输入大于0的存储速度'
        })
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.form.speed)) {
        this.$notification.error({
          title: '错误',
          message: '存储速度只能是数字'
        })
        return
      }
      if (!this.form.power) {
        this.$notification.error({
          title: '错误',
          message: '请输入存储空间'
        })
        return
      } else if (this.form.power == 0) {
        this.$notification.error({
          title: '错误',
          message: '请输入大于0的存储空间'
        })
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.form.power)) {
        this.$notification.error({
          title: '错误',
          message: '存储空间只能是数字'
        })
        return
      } else if (Number(this.form.power) / Number(this.form.speed) > 540) {
        // 存储空间除以存储速度不能大于540  （因为扇区有效期最多只有540天）
        let maxStore = 540 * this.form.speed
        let msg = `以当前存储速度最多可存储完成${maxStore}TiB的存储空间，请重新输入存储空间，输入值不可大于${maxStore}`
        this.$notification.error({
          title: '错误',
          message: msg
        })
        return
      }
      if (!this.form.cost) {
        this.$notification.error({
          title: '错误',
          message: '请输入投入成本'
        })
        return
      }
      let cost = utils.delCommify(this.form.cost);
      if (cost < 0) {
        this.$notification.error({
          title: '错误',
          message: '请输入大于0的投入成本'
        })
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(cost)) {
        this.$notification.error({
          title: '错误',
          message: '投入成本只能是数字'
        })
        return
      }
      this.loadingFlag = true
      // this.loading = this.$loading.service({
      //   lock: true,
      //   spinner: 'el-icon-loading',
      //   text: '努力计算中...',
      //   background: 'rgba(0, 0, 0, 0.8)',
      //   customClass: 'cal-loading-text-class'
      // })
      this.$axios.post('/api/calculator/get_calculate_sum_v2', {
          increase_power_per_day: increase_power_per_day,
          cost: this.form.cost,
          total_power: this.form.power,
          init_power: 0,
          current_date: utils.formatDate(new Date(this.form.date), 'y-m-d'),
          power_per_day: this.form.speed
        })
        .then(res => {
          this.loadingFlag = false
          // this.loading.close()
          this.isFinished = true
          if (res.code != 0) {
            this.isError = true
            this.$notification.error({
              title: '错误',
              message: '计算失败'
            })
            return
          }
          this.isError = false
          // 处理数据
          let records = res.data.records
          delete records['180']
          delete records['360']
          // 排序
          let keys = []
          Object.keys(records).map(key => {
            records[key].days.map((day, index) => {
              keys.push({ day, key, index })
            })
          })
          keys.sort(function compare(x, y) {
            return parseInt(x.day) > parseInt(y.day) ? 1 : -1
          })
          let key_str = {
            'full_day': '封满',
            'win_day': '平衡产出',
            '540': '产出'
          }
          let tips_str = {
            'full_day': '按设定的存储速度，存储满存储容量所需的天数和对应的存储区块奖励总产出',
            'win_day': '产出平衡当天的存储区块奖励总产出',
            '540': '540天的存储区块奖励总产出'
          }
          let out = []
          let _in = []
          let cost = []
          let win_day = res.data.win_day
          let _keys = []
          keys.map(item => {
            if (item.key == 'win_day') {
              if (item.day == win_day) _keys.push(item)
            } else {
              _keys.push(item)
            }
          })
          _keys.map(item => {
            let value = res.data.records[item.key]
            let t = {}
            t['key'] = item.key
            t['key_str'] = key_str[item.key]
            t['tips'] = tips_str[item.key]
            t['day'] = item.day
            t['index'] = item.index
            if (typeof(value.reward[0]) == 'object') {
              t['reward'] = `${value.reward[0][0]}`
            } else {
              t['reward'] = `${value.reward[0]}`
            }
            t['desc'] = ' F'
            out.push(t)
            // 
            switch (item.key) {
              case 'full_day':
                {
                  _in.push({ title: '存储Pledge', value: `${value.pledge}`, desc: ' F', tips: '存储满存储所需Pledge的存储区块奖励，该Pledge在扇区生命周期(540天)结束后将自动退还' })
                  _in.push({ title: '生产Gas消耗', value: `${value.create_gas}`, value_64: `${value.create_gas_64}`, desc: ' F', tips: '存储满算力所消耗的Gas费（根据全网平均值计算得出）' })
                  _in.push({ title: '维护Gas消耗', value: `${utils.formatterAmount(this.config.keep_cost_gas_per_t, 4)}`, value_64: `${utils.formatterAmount(this.config.keep_cost_gas_per_t_64, 4)}`, desc: ' F/TiB/Day', tips: '维护算力所消耗的Gas费（根据全网平均值计算得出）' })
                }
                break;
              case 'win_day':
                cost.push({ title: '平衡天数估算', value: `${win_day}`, desc: ' 天', tips: '投入成本与存储区块奖励产出相平衡的天数' })
                break;
              case '540':
                {
                  let _cost = []
                  value.reward.map(a => {
                    _cost.push(utils.formatterAmount(this.form.cost / a, 0))
                  })
                  // _cost.sort(function compare(x, y) {
                  //   return parseFloat(x) > parseFloat(y) ? 1 : -1
                  // })
                  cost.push({ title: '单F成本估算', value: `${_cost[0]}`, desc: ' CNY', tips: '投入成本/540天的存储区块奖励总产出，不包含gas相关成本' })
                }
                break;
            }
          })
          this.bigCost = cost
          this.bigIn = _in
          this.bigOut = out
        })
    }
  },

  mounted: function() {
    this.share_url = `https://wap.renrenmine.com/new-user/index?invite_code=${this.form.invite_code}`
  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
.data-handler {}

.data-handler .el-date-editor {
  width: 100% !important;
}

.data-handler .el-date-editor .el-input__suffix,
.data-handler .el-date-editor .el-input__prefix {
  display: none !important;
}

.data-handler .el-input__suffix-inner {
  line-height: 3.5rem;
}

.data-handler .el-input__inner {
  color: #040A25;
  font-size: 1.5rem;
  border-radius: 0 !important;
  height: 3.5rem;
  width: 100% !important;
  padding: 0 3rem 0 1rem !important;
  font-weight: 600;
}

.data-handler .el-input__inner:focus {
  border-color: #040A25 !important;
  outline: 0;
}

.data-handler .el-button {
  color: #FFF;
  background-color: #333FC6;
  border-color: #333FC6;
  width: 100%;
  border-radius: 0 !important;
  /*box-shadow: .25rem .3rem 1.5rem .4rem rgba(31, 66, 214, 0.2);*/
}

.data-handler .line-shadow {
  box-shadow: 0 0 1rem .25rem rgba(34, 43, 144, 0.95);
}

.rr_share {
  font-weight: bold;
  font-size: 1rem;
  color: #312800;
  padding: 0.6rem;
  background-color: #FFD203;
}

.cal-loading-text-class {
  i {
    color: #fff;
    font-size: 20px;
  }

  .el-loading-text {
    color: #fff;
  }
}

.circular {
  margin: 0 auto;
}
</style>
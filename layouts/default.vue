<template>
  <div class="flex flex-col min-h-screen lg:bg-F2F6FC bg-white">
    <!-- 导航 -->
    <HeaderFrame v-model="tabs"></HeaderFrame>
    <!-- 全局数据 -->
    <!-- <div class="container mx-auto px-10 mt-3 hidden lg:block">
      <div class="border border-solid border-E8E7EB flex items-center justify-between h-28">
        <template v-for="(item, i) in overview">
          <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="i + 'line'"></div>
          <div class="flex flex-1 justify-center items-center" :key="i + 'headerKey'">
            <div class="flex-1 flex items-center justify-center">
              <div>
                <template v-if="i == 0">
                  <n-link :to="`/${lang}/filindex`">
                    <div class="flex items-center">
                      <span class="text-2xl text-main">{{ item.value }}</span>
                      <img src="@/assets/img/icon-link-fil.png" class="h-5 ml-3" alt="">
                    </div>
                    <p class="text-848599">{{ $t(item.title) }}</p>
                  </n-link>
                </template>
                <template v-else>
                  <div class='text-center'>
                    <span class="text-2xl">{{ item.value }}</span>
                    <span class="text-base">{{ item.unit }}</span>
                  </div>
                  <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div> -->
    <!-- 内容 -->
    <!-- <div class="flex-grow container mx-auto px-3 lg:px-10 mt-4"> -->
    <!-- <div class="flex-grow px-3 pt-4 editionCenter"> -->
    <div class="flex-grow px-3 pt-4 editionCenter relative overflow-hidden">
      <nuxt />
    </div>
    <!-- footer -->
    <FooterFrame></FooterFrame>
    <!-- 抽屉导航栏 -->
    <!-- <div class="fixed lg:hidden w-full h-screen bg-black bg-opacity-75" style="z-index: 9999;" v-if="menu" @touchmove.prevent @click.self="closeHandler">
      <div class="flex">
        <div class="flex-1" @click.self="closeHandler"></div>
        <div class="w-3/5 text-white shadow-xl">
          <div class="flex justify-end pt-4 pb-5 pr-2 bg-1D2047 bg-opacity-75">
            <i class="text-2xl text-gray-500 el-icon-close p-1 border border-solid border-gray-500 rounded" @click="closeHandler"></i>
          </div>
          <div class="bg-1D2047">
            <n-link class="py-2 px-3 flex items-center justify-between hover:opacity-100 hover:text-white" v-for="(item, i) in tabs" :key="i +'_title'" :to="item.to" :class="{ 'opacity-50' : !item.active }">
              <div class="flex items-center min-w-32 py-3" v-if="item.icon">
                <img class="h-4 mr-1" :src="item.icon" />
                <span>{{ $t(item.title) }}</span>
              </div>
              <div class="flex items-center min-w-32 py-3" v-else-if="item.has">
                <span>{{ $t(item.title) }}</span>
                <img class="h-4 ml-1 relative bottom-2" v-show="lang == 'zh' " :src="item.has" />
                <img class="h-4 ml-1 relative bottom-2" src="@/assets/img/icon-link-fil-en.png" v-show="lang == 'en' " alt="">
                <img class="h-4 ml-1 relative bottom-2" src="@/assets/img/icon-link-fil-ko.png" v-show="lang == 'ko' " alt="">
                <img class="h-4 ml-1 relative bottom-2" src="@/assets/img/icon-link-fil-ja.png" v-show="lang == 'ja'" alt="" />
              </div>
              <div class="py-3 " v-else>{{ $t(item.title) }}</div>
              <i class="el-icon-arrow-right mr-4"></i>
            </n-link>
          </div>
           <el-menu
            class="el-menu-vertical-demo"
            background-color="#1D2047"
            text-color="rgba(255, 255, 255, 0.75)"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <span>{{$t('Lang.Language switching')}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="changeLang('zh')" v-show="lang !== 'zh'">中文</el-menu-item>
                <el-menu-item index="1-2" @click="changeLang('en')" v-show="lang !== 'en'">English</el-menu-item>
                <el-menu-item index="1-3" @click="changeLang('ko')" v-show="lang !== 'ko'">한국어</el-menu-item>
                <el-menu-item index="1-4" @click="changeLang('ja')" v-show="lang !== 'ja'">日本語</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

          <div class="flex flex-wrap bg-1D2047 pb-3">
            <template v-for="(item, i) in overview">
              <div class="w-1/2 flex items-center py-3" :class="{ 'pl-3' : i % 2 == 0 }" :key="i + 'headerKey'">
                <div class="flex-1 flex items-center text-white">
                  <div>
                    <template v-if="i == 0">
                      <n-link class="flex items-center" :to="`/${lang}/filindex`">
                        <span class="text-xl text-light">{{ item.value }}</span>
                        <img src="@/assets/img/icon-link-fil.png" class="h-5 ml-3" alt="">
                      </n-link>
                    </template>
                    <template v-else>
                      <div>
                        <span>{{ item.value }}</span>
                        <span>{{ item.unit }}</span>
                      </div>
                    </template>
                    <span class="text-white">{{ $t(item.title) }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          
        </div>
      </div>
    </div> -->

    <!-- 到期提醒弹窗 -->
    <div class="remind">
      <el-dialog
        :visible.sync="expireFlag"
        :width="dialogWidth"
        :before-close="handleCloseExpire"
      >
        <div class="flex items-center">
          <img
            src="../assets/imgs/Pro.png"
            alt=""
            style="height: 30px"
            class="lg:mr-6 lg:ml-4 mr-4 ml-1"
          />
          <div class="">
            <p v-show="iDays > 1" style="color: #935e0f">
              {{ $t("Lang.Your pro members also have") }}{{ iDays
              }}{{ $t("Lang.Days due") }}
            </p>
            <p v-show="iDays <= 1" style="color: #935e0f">
              {{ $t("Lang.Your Pro membership is about to expire") }}
            </p>
            <p class="text-848599 leading-5 mt-2">
              {{
                $t(
                  "Lang.If he bought it now, he would reduce 1000 and give it to the owner for half a year"
                )
              }}
            </p>
          </div>
        </div>
        <div class="flex justify-end pr-6 mt-4">
          <!-- <el-button type="warning" plain >立 即 前 往</el-button> -->
          <!-- <span class="ml-4 contacts"
            >{{ $t("Lang.Customer Service") }}
            <img
              class="proImg z-40"
              src="@/assets/imgs/contact.png"
              alt=""
              style="width: 120px; height: 120px; right: 4.5%; bottom: -70%"
            />
          </span> -->
        </div>
      </el-dialog>
    </div>

   
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import HeaderFrame from "@/components/HeaderFrame";
import FooterFrame from "@/components/FooterFrame";
import Cookie from "js-cookie";
import utils from "@/static/utils.js";
export default {
  name: "Default",

  components: {
    HeaderFrame,
    FooterFrame,
  },

  computed: {
    ...mapGetters({
      menu: "getMenu",
      globalOverview: "getGlobalOverview",
      IsSignIn: "getIsSignIn",
    }),
    // 全网概览数据
    overview: function () {
      let {
        power,
        power_inc_24_hour,
        avg_pledge,
        avg_reward,
        price,
        fil_index_objs,
        create_gas_32,
        create_gas_64,

        history_time_gas,

        rr_fil_overview,
      } = this.globalOverview;
      return [
        {
          title: "Lang.FIL index",
          value: utils.formatterAmount(fil_index_objs, 2),
        },
        {
          title: "Lang.Network Storage Power",
          value: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1],
        },
        {
          title: "Lang.Power Growth in 24 hours",
          value: utils.formatPower(power_inc_24_hour, 4)[0],
          unit: utils.formatPower(power_inc_24_hour)[1],
        },
        {
          title: "Lang.Sector pledge",
          value: avg_pledge ? utils.formatterAmount(avg_pledge * 32) : "--",
          unit: "F/TiB",
        },
        {
          title: "Lang.Real-time 32GiB Production Gas_1",
          value: utils.formatFil(create_gas_32, false),
          unit: "F/TiB",
        },
        {
          title: "Lang.Real-time 64GiB Production Gas_1",
          value: utils.formatFil(create_gas_64, false),
          unit: "F/TiB",
        },
        // {
        //   title: 'Lang.32G production Gas in latest 24 hours',
        //   value: history_time_gas ? utils.formatterAmount(history_time_gas.gas_32.create_gas_32) : '--',
        //   unit: 'FIL/TiB'
        // }, {
        //   title: 'Lang.64G production Gas in latest 24 hours',
        //   value: history_time_gas ? utils.formatterAmount(history_time_gas.gas_64.create_gas_64) : '--',
        //   unit: 'FIL/TiB'
        // }
        {
          title: "Lang.32G production Gas in latest 24 hours",
          value: rr_fil_overview ? rr_fil_overview.create_cost_gas_per_t : "--",
          unit: "F/TiB",
        },
        {
          title: "Lang.64G production Gas in latest 24 hours",
          value: rr_fil_overview
            ? rr_fil_overview.create_cost_gas_per_t_64
            : "--",
          unit: "F/TiB",
        },
      ];
    },
    tabs() {
      return [
        {
          // to: '/',
          to: `/${this.$store.state.locale}/`,
          title: "Lang.Home",
          icon: "",
          active: false,
        },
        {
          // to: '/star',
          to: `/${this.$store.state.locale}/star`,
          title: "Lang.Node starme",
          icon: "",
          active: false,
        },
        {
          // to: '/arock',
          to: `/${this.$store.state.locale}/arock`,
          title: "Lang.Arock Pool",
          icon: "",
          active: false,
        },
        {
          // to: '/calculator/effective',
          to: `/${this.$store.state.locale}/calculator/effective`,
          title: "Lang.Calculator",
          icon: require("~/assets/img/icon-cal.png"),
          active: false,
        },
        {
          // to: '/account',
          to: `/${this.$store.state.locale}/pro`,
          title: "Lang.Pro",
          has: require("~/assets/img/icon-pro.png"),
          active: false,
        },
        // {
        //   invitation: true,
        //   to: `/${this.$store.state.locale}/invitation`,
        //   active: false
        // }
      ];
    },
  },

  data: function () {
    return {
      expireFlag: false,
      interval: null,
      intervalTag: null,
      intervalPrice: null,
      user_info: {},
      dialogWidth: "",
      lang: this.$store.state.locale,
      iDays: "",
    };
  },

  head() {
    if (this.$store.state.locale == "en") {
      return {
        title: `Arockpool-Filecoin Professional Node Data Service`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Arockpool Explorer is a Filcoin blcokchain browser which provides dynamic and interactive blockchain data, including  mining rankings, blockchain data queries. With the unique Calculator, Arockpool helps esitimate the mining FIL output.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,Gas,IPFS,filecoin,arockpool,Arockpool Explorer,Arockpool Filecoin Explorer,Sector Pledge",
          },
        ],
      };
    } else if (this.$store.state.locale == "ko") {
      return {
        title: `Arockpool-Filecoin 전문 노드 데이터 서비스`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Arockpool Browser는 Filecoin 노드를위한 전문 데이터 서비스 도구로, 사용자에게 채굴 자 정보, FIL 지수, 최신 높이, 가스 역학 등 Filcoin 관련 데이터 및 채굴 자 순위를 제공합니다.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,아테나 브라우저,Gas,IPFS,filecoin,아테나 윈츠,arockpool,아테나 블록 체인 브라우저,섹터 서약",
          },
        ],
      };
    } else if (this.$store.state.locale == "ja") {
      return {
        title: `アテナ-Filecoin専門ノードデータサービス`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Arockpool Browser는 Filecoin 노드를위한 전문 데이터 서비스 도구로, 사용자에게 채굴 자 정보, FIL 지수, 최신 높이, 가스 역학 등 Filcoin 관련 데이터 및 채굴 자 순위를 제공합니다.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,아테나 브라우저,Gas,IPFS,filecoin,아테나 윈츠,arockpool,아테나 블록 체인 브라우저,섹터 서약",
          },
        ],
      };
    }
  },

  methods: {
    ...mapActions({
      changeMenuHandler: "changeMenu",
      changeIsSignIn: "changeIsSignIn",
      changeIsProActive: "changeIsProActive",
      changeProUserList: "changeProUserList",
      changeUserList: "changeUserList",
    }),
    ...mapMutations(["SET_LANG"]),
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    changeLang(command) {
      Cookie.set("lang", command);
      this.SET_LANG(command);
      this.lang = command;
      let url = this.$route.fullPath.slice(3);
      this.$router.push(`/${command}${url}`);
    },
    // 获取全部矿工tag
    getMinerTag: function () {
      let list = [];
      this.$axios
        .post(
          "/api/explorer/get_pool_miner_list",
          { is_pool: 1, page_size: 150 },
          { progress: false }
        )
        .then((res) => {
          if (res.code != 0) return;
          res.data.objs.map((per) => {
            // 筛选出小于10PiB的节点
            if (per.power < Math.pow(1024, 5) * 10) {
              list.push(per.miner_no);
            }
          });
          return this.$axios.post(
            "/api/explorer/get_miner_apply_tag",
            {},
            { progress: false }
          );
        })
        .then((res) => {
          if (!res || res.code != 0) return;
          let _tags = {};
          res.data.map((per) => {
            if (list.indexOf(per.miner_no) == -1) {
              _tags[per.miner_no] = per;
            }
          });
          _tags["f090"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0121"] = {
            cn_tag: "Filecoin基金会",
            en_tag: "Filecoin基金会",
          };
          _tags["f0118"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0119"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0117"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0120"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f099"] = {
            cn_tag: "销毁账户",
            en_tag: "销毁账户",
          };
          this.$store.commit("setGlobalMinerTag", _tags);
        });
    },
    // 获取全网概览
    getNetDataHandler: function () {
      this.$axios
        .post("/api/explorer/get_overview", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setGlobalOverview", res.data);
        });
    },
    // 获取全景数据
    getOverviewStat: function () {
      this.$axios
        .post("/api/explorer/get_overview_stat", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setOverviewStat", res.data);
        });
    },
    // 获取币价
    getFilPrice: function () {
      this.$axios
        .post("/api/explorer/get_price", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setFilPrice", res.data);
        });
    },
    // 关闭模板
    closeHandler() {
      this.changeMenuHandler(false);
    },
    // 判断是否登录
    SignIn() {
      this.$axios.post("/api/explorer/get_user_info").then((res) => {
        // console.log('layout判断get_user_info',res);
        this.changeIsSignIn(res.code == 0 ? true : false);
        if (res.code == 0) {
          this.changeUserList(res.data);
          this.user_info = res.data;
          this.getProActive();
        }
      });
    },
    // 判断是否专业版本
    getProActive() {
      this.$axios
        .post("/api/explorer/get_pro_user_info", {
          token: this.user_info.token,
        })
        .then((res) => {
          this.changeIsProActive(res.code == 0 ? true : false);
          this.changeProUserList(res.data);

          var dateSpan, sDate1, sDate2, iDays;

          sDate1 = Date.parse(new Date());
          sDate2 = Date.parse(res.data.expire_time);
          dateSpan = sDate2 - sDate1;
          dateSpan = Math.abs(dateSpan);
          iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          if (iDays <= 7 && !localStorage.getItem("expire")) {
            // this.$message({
            //   message: `会员还有 ${iDays} 天到期`,
            //   type: 'warning',
            //   duration:'8000'
            // });
            this.iDays = iDays;
            this.expireFlag = true;
          }
        });
    },
    // 点击其他地方关闭弹窗
    handleClose(done) {
      localStorage.setItem("Popup", true);
      done();
    },
    handleCloseExpire(done) {
      localStorage.setItem("expire", true);
      done();
    },
    // 获取活动弹窗宽度
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "93%";
      } else {
        this.dialogWidth = "476px";
      }
    },
    // 获取标签显示状态
    getTagStatue() {
      this.$axios
        .post("/api/explorer/get_tag_status", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("SET_TagShowFlag", res.data);
        });
      // this.$store.commit('SET_TagShowFlag', false)
    },
  },

  created() {
    this.getMinerTag();
    this.SignIn();

    this.getNetDataHandler();
    this.getOverviewStat()
    this.getFilPrice();
    this.getTagStatue();
  },

  beforeMount() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    if (this.$route.query.type) {
      localStorage.setItem("type", this.$route.query.type);
    }

    // 登陆时通过bus触发时间，判断过期时间
    this.$bus.$on("expire-event", (data) => {
      this.getProActive();
    });

    if (this.$route.fullPath.indexOf("CN") !== -1) {
      this.$router.push(this.$route.fullPath.replace("zh-CN", "zh"));
    } else if (this.$route.fullPath.indexOf("US") !== -1) {
      this.$router.push(this.$route.fullPath.replace("en-US", "en"));
    } else if (this.$route.fullPath.indexOf("KR") !== -1) {
      this.$router.push(this.$route.fullPath.replace("ko-KR", "ko"));
    } else if (this.$route.fullPath.indexOf("JP") !== -1) {
      this.$router.push(this.$route.fullPath.replace("ja-JP", "ja"));
    }
  },

  mounted: function () {
    // 获取全部矿工tag
    this.intervalTag = setInterval(() => {
      this.getMinerTag();
    }, 10 * 60 * 1000);
    // 获取首页全局数据
    this.interval = setInterval(() => {
      this.getNetDataHandler();
      this.getOverviewStat()
    }, 60 * 1000);
    // 获取币价
    // this.intervalPrice = setInterval(() => {
    //   this.getFilPrice()
    // }, 10 * 1000)

    // 手机端调试console.log
    //  var vConsole = new window.VConsole();

    this.getTagStatue();
  },

  beforeDestroy: function () {
    clearInterval(this.intervalTag);
    this.intervalTag = null;
    window.removeEventListener("resize", this.getHeight);
    clearInterval(this.interval);
    this.interval = null;
    clearInterval(this.intervalPrice);
    this.intervalPrice = null;
  },


};
</script>
<style lang="scss">
.popUpWindow {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 490px;
  height: 440px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.popUpWindow-title {
  background: url("../assets/imgs/invitation-alert-titlebg.png") no-repeat
    center;
  background-size: 80% 70%;
}

.popUpWindowPc {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 350px;
  /* height: 440px; */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* .popUpWindow-title{
   background: url('../assets/imgs/invitation-alert-titlebg.png') no-repeat;
    background-size: 100% 80%;
 } */

.myIndex .el-dialog {
  background: url("../assets/imgs/invitation-alert-pcbg.png") no-repeat !important;
  /* background: url('../assets/imgs/invitation-alert-bg.png') no-repeat !important; */
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.dialogPC {
  background: url("../assets/imgs/invitation-alert-pcbg.png") no-repeat !important;
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.dialogPhone {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat !important;
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.myIndex .el-dialog__close {
  color: #fff !important;
}

.myIndex .el-button {
  border: none !important;
}

.myIndex .el-dialog__body {
  padding-bottom: 20px;
}

.myIndex .el-dialog__headerbtn {
  margin-right: 10px;
  margin-top: -10px;
}
.el-submenu__title {
  padding: 0 0 0 8px !important;
  opacity: 0.75;
}
.el-menu {
  border: 0 !important;
}
.remind .el-dialog__body {
  padding: 10px 10px 20px 10px !important;
}

.proImg {
  position: absolute;
  opacity: 0;
  transition: all 0.2s linear;
}
.contacts {
  color: #935e0f;
  border: 1px solid rgba(255, 200, 66, 1);
  background: linear-gradient(218deg, #ffd293 0%, #e0ab5c 100%, #e0ab5c 100%);
  padding: 2px 8px;
  border-radius: 4px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
    .proImg {
      opacity: 1;
    }
  }
}



.shadow {
  box-shadow: 0px 4px 11px 2px rgba(134, 138, 145, 0.31);
}

/*---滚动条默认显示样式--*/
// ::-webkit-scrollbar-thumb{
// background-color:#DCE1E8;
// height:50px;
// outline-offset:-2px;
// outline:2px solid #fff;
// -webkit-border-radius:4px;
// border: 2px solid #fff;
// }
// /*---鼠标点击滚动条显示样式--*/
// ::-webkit-scrollbar-thumb:hover{
// background-color:#848599;
// height:50px;
// -webkit-border-radius:4px;
// }
// /*---滚动条大小--*/
// ::-webkit-scrollbar{
// width:8px;
// height:8px;
// }
// /*---滚动框背景样式--*/
// ::-webkit-scrollbar-track-piece{
// background-color:#fff;
// -webkit-border-radius:0;
// }

</style>
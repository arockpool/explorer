<template>
  <!-- 节点收藏 -->
  <div class='bg-white'>
    <div class="lg:flex lg:mb-6 mb-2 mt-4">
      <!-- 有效算力，算力速增，产出效率 -->
      <ul class="flex justify-left checkbox-content mr-6 lg:mt-0 -mt-2 lg:ml-10">
        <li
          class="flex justify-center items-center checkbox-list cursor-pointer py-1 px-3 lg:px-5 "
          @click="selectStatTimehandler(item)"
          :class="{first: index == 0,last: outStatList.length - 1 == index,active: item.value == outStatTime}"
          v-for="(item, index) in outStatList"
          :key="item.value">
          {{ $t(item.key) }}
        </li>
      </ul>
       <!-- <div class=' lg:hidden block ml-2'>
          <el-select v-model="outStatTime" placeholder="请选择" @change='changeOutStatTime'>
            <el-option
              v-for="item in outStatList"
              :key="item.value+'check'"
              :label="$t(item.key)"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </div> -->
      <!-- 扇区下拉选择框 -->
      <!-- <el-select v-model="value" @change='changeValue' placeholder="请选择" class='lg:mt0 mt-2'>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
    </div>
    <!-- 表格 -->
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lang: this.$store.state.locale,
      user_info: {},
      outStatTime: "raw_power",
      outStatList: [
        { value: "raw_power", key: "Lang.Effective computing power" },
        { value: "efficiency", key: "Lang.Power growth rate" },
        { value: "growth", key: "Lang.Production Efficiency" },
      ],
      // options: [
      //   {
      //     value: "",
      //     label: "全部扇区",
      //   },
      //   {
      //     value: "0",
      //     label: "32G扇区",
      //   },
      //   {
      //     value: "1",
      //     label: "64G扇区",
      //   },
      // ],
      // value: "",
    };
  },
  asyncData({ app }) {},
  mounted() {
    this.$axios.post("/api/explorer/get_user_info").then((res) => {
      // this.add()
      // this.add1()
      if (res.code !== 0) {
        this.$router.push("/");
        return;
      }
      this.user_info = res.data;
    });
    // console.log('收藏节点get_user_info',this.user_info);
  },
  methods: {
    selectStatTimehandler: function (item) {
      // console.log(item);
      if (this.outStatTime == item.value) return;
      this.outStatTime = item.value;
      switch (item.value) {
        case "raw_power":
          this.$router.push(`/${this.lang}/personalMenu/myCollection`);
          break;
        case "efficiency":
          this.$router.push(
            `/${this.lang}/personalMenu/myCollection/efficiency`
          );
          break;
        case "growth":
          this.$router.push(`/${this.lang}/personalMenu/myCollection/growth`);
          break;
        default:
          break;
      }
    },
    changeOutStatTime(){
      switch (this.outStatTime) {
        case "raw_power":
          this.$router.push(`/${this.lang}/personalMenu/myCollection`);
          break;
        case "efficiency":
          this.$router.push(
            `/${this.lang}/personalMenu/myCollection/efficiency`
          );
          break;
        case "growth":
          this.$router.push(`/${this.lang}/personalMenu/myCollection/growth`);
          break;
        default:
          break;
      }
    },
    changeValue() {
      // console.log(this.value);
    },
  },
  beforeMount() {
    // console.log('beforeMount',this.$route.path);
    if (this.$route.path.indexOf("efficiency") != -1) {
      this.outStatTime = "efficiency";
    } else if (this.$route.path.indexOf("growth") != -1) {
      this.outStatTime = "growth";
    } else {
      this.outStatTime = "raw_power";
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (to.path.indexOf("efficiency") != -1) {
          this.outStatTime = "efficiency";
        } else if (to.path.indexOf("growth") != -1) {
          this.outStatTime = "growth";
        } else {
          this.outStatTime = "raw_power";
        }
        // this.outStatTime = to.params.lang
        // console.log(to);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
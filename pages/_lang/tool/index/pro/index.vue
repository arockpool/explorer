<template>
  <div>
    <div class="AcitvePro" v-if="isAcitvePro">
      <AcitvePro></AcitvePro>
      <!-- <ProChildlink v-model="childRouter" />
      <div class="mb-3 ">
        <nuxt-child />
      </div> -->
    </div>

    <div class="notAcitvePro" v-if="!isAcitvePro">
      <NotAcitvePro></NotAcitvePro>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NotAcitvePro from "@/components/common/NotAcitvePro";
import AcitvePro from "@/components/common/AcitvePro";
import ProChildlink from '@/components/common/ProChildlink'


export default {
  asyncData({ app, redirect }) {
    let data = {
      user_info: {},
      isAcitvePro: false,
    };

    return app.$axios
      .post("/api/explorer/get_user_info")
      .then((res) => {
        // console.log(('进入pro');
        if (res.code == 0) {
          data.user_info = res.data;
          return app.$axios.post("/api/explorer/get_pro_user_info", {
            token: res.data.token,
          });
        } else if (res.code == 99905) {
          redirect(`/${res.data}/account`);
          //  return Promise.reject()
          // return data
          return app.$axios.post("/api/explorer/get_pro_user_info", {
            token: "",
          });
        }
      })
      .then((res) => {
        // code为0时专业版
        // console.log('判断是否专业版',res);
        data.isAcitvePro = res.code == 0 ? true : false;
        return data;
      });
  },
  data() {
    return {
      userList: {},
      isAcitvePro: false,
      lang: this.$store.state.locale,
      childRouter:[
        { path: `/${this.$store.state.locale}/pro`, title: 'Lang.罚金', active: false },
        { path: `/${this.$store.state.locale}/pro/flowTo`, title: 'Lang.钱包流向', active: false },
      ]
    };
  },
  computed: {
    ...mapGetters({
      isSignIn: "getIsSignIn",
    }),
  },
  methods: {
    seclectChildRouter(path) {
      this.childRouter.map(item => {
        item.active = path == `${item.path}`
        return item
      })
    }
  },
  mounted: function() {
    this.seclectChildRouter(this.$route.path)
  },
  watch: {
    $route(to) {
      this.seclectChildRouter(to.path)
    }
  },
  components: {
    NotAcitvePro,
    AcitvePro,
    ProChildlink
  },
  
  beforeMount() {
    // if(!this.user_info.token){
    //   this.$router.push(`/${this.lang}/account`)
    // }
  },
};
</script>

<style lang="scss" scoped>

.circular{
  margin: 0 auto;
}
</style>
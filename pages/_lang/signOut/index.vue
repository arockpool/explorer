<template>
  <div>
    <!-- <p>正在退出</p> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      lang: this.$store.state.locale,
    };
  },
  asyncData({ app }) {},
  beforeMount() {
    this.out();
    this.$router.push(`/${this.lang}/`);
  },
  mounted(){
    setTimeout(()=>{
      this.out();
    },100)
  },
  methods: {
    ...mapActions({
      changeIsSignIn: "changeIsSignIn",
      changeIsProActive: "changeIsProActive",
      changeProUserList:"changeProUserList",
      changeUserList: "changeUserList"
    }),
    out() {
      this.$axios.post("/api/explorer/clear_user_info").then((res) => {
        // console.log("clear_user_info", res);
        if (res.code !== 0) return;
        // 是否登录
        this.changeIsSignIn(false);
        // 是否激活付费版
        this.changeIsProActive(false);
        // pro用户信息
        this.changeProUserList(null)
        // 普通用户信息
        this.changeUserList(null)
        sessionStorage.clear();
        localStorage.removeItem('expire')
        Cookie.remove('token')
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
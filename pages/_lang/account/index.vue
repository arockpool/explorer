<template>
  <!-- <div>
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Sign up')}}/{{$t('Lang.Sign in')}}</p>
    <div class='bg-white  rounded-t-lg'>
        <div class="flex items-center justify-center text-2xl lg:h-20 h-16 font-bold">
          <ul class="w-full flex justify-center">
            <li class="flex-1 flex items-center" :class="{'lg:justify-end' : index == 0}" v-for="(item, index) in childRouter" :key="item.path">
              <div class="w-px h-10 bg-E6E6EA" v-if="index > 0"></div>
              <n-link class="flex-1 lg:flex-none text-center lg:text-left block px-10 py-2 mx-3 text-xl font-medium hover:text-main hover:border-main" 
              :class="{'child-link-active': item.active, 'lg:text-right' : index == 0}" :to="item.path">{{$t(item.title)}}</n-link>
            </li>
          </ul>
        </div>
        <nuxt-child />
    </div>
  </div> -->
  <div>
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Sign up')}}</p>
    <div class='bg-white '>
        <div class="">
          <ul class="">
            <li class="" v-for="item in childRouter" :key="item.path">
              <n-link :to="item.path"></n-link>
            </li>
          </ul>
        </div>
        <nuxt-child />
    </div>
  </div>
</template>
<script>


export default {
  name: "Account",

  mixins: [],

  props: [],

  components: {
    // NotAcitvePro,
    // AcitvePro
  },

  watch: {
    $route(to) {
      this.seclectChildRouter(to.path);
    },
  },

  computed: {
    // ...mapGetters({
    //   isSignIn: "getIsSignIn",
    // }),
  },

  asyncData({ app,redirect }) {
    let data = {
      isSignIn:false
    };

    return app.$axios.post("/api/explorer/get_user_info").then((res) => {
      if(res.code == 0){
        data.isSignIn = true
        return app.$axios.post("/api/explorer/get_lang")
      }
      return data
    }).then(res=>{
      if(data.isSignIn){
        redirect(`/${res.data}/`);
      }
      return data
    })
  },

  data: function () {
    return {
      childRouter: [
        {
          path: `/${this.$store.state.locale}/account`,
          title: "Lang.Sign up",
          active: false,
        },
        {
          path: `/${this.$store.state.locale}/account/register`,
          title: "Lang.Sign in",
          active: false,
        },
      ],
      lang: this.$store.state.locale,
    };
  },

  methods: {
    seclectChildRouter(path) {
      this.childRouter.map((item) => {
        item.active = path == `${item.path}`;
        // console.log('1',item.active);
        // console.log('2',path);
        // console.log('3',`${item.path}`);
        return item;
      });
    },
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    }
  },

  mounted: function () {
    this.seclectChildRouter(this.$route.path);
  },

  beforeDestroy: function () {},
};
</script>
<style>
</style>
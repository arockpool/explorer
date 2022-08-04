<template>
  <div class="bg-main">
    <!-- {{getIsProActive}} -->
    <div
      class="
        editionCenter
        text-white
        mx-auto
        flex flex-col
        justify-center
        h-full
        text-opacity-75
        px-3
      "
    >
      <div class="flex lg:py-10 pt-4 pb-3 justify-between items-center">
        <!-- 左边文案 -->
        <div class="lg:w-1/3 leftTxt">
          <div class="flex">
            <n-link to="">
              <img class="h-8 lg:h-12" src="~/assets/img/icon-en-logo.png" />
            </n-link>
            <div class="flex-1"></div>
          </div>
          <div class="lg:mt-6 mt-3 flex flex-col">
            <span class="leading-7">{{ $t("Lang.footer") }}</span>
          </div>
        </div>
        <!-- 中间文案 -->
        <div class="lg:w-1/3 middleTxt">
          <div class="lg:w-1/3">
            <p>Products</p>
            <p @click="window.her = ' https://arockpool.com/explorer'">
              Explorer
            </p>
            <p @click="window.her = ' https://arockpool.com'">Arockpool</p>
            <p @click="window.her = ' https://filecoin.io'">Web3 Storage</p>
          </div>
          <div class="lg:w-1/3">
            <p>Resources</p>
            <p @click="window.her = ' '">Blog</p>
            <p @click="window.her = ' https://docs.arockpool.com'">Docs</p>
            <p @click="window.her = ' '">Solutions</p>
          </div>
          <div class="lg:w-1/3">
            <p>About Us</p>
            <p @click="window.her = ' https://arockpool.com/explorer'">
              Announcements
            </p>
            <p @click="window.her = ' https://arockpool.com/explorer'">
              Terms of Services
            </p>
            <p @click="window.her = ' https://arockpool.com/explorer'">
              Privacy
            </p>
          </div>
        </div>
        <!-- 右边文案 -->
        <div class="lg:w-1/3 lg:block hidden" style="margin-left: 1.45rem">
          <div class="contactImg">
            <div style="margin-right: 20px">
              <n-link to="">
                <img class="h-8 lg:h-12" src="~/assets/img/contact1.svg" />
              </n-link>
            </div>
            <div style="margin-right: 20px">
              <n-link to="">
                <img class="h-8 lg:h-12" src="~/assets/img/contact2.svg" />
              </n-link>
            </div>
            <div style="margin-right: 20px">
              <n-link to="">
                <img class="h-8 lg:h-12" src="~/assets/img/contact3.svg" />
              </n-link>
            </div>
          </div>
          <!-- <img src="@/assets/imgs/contact.png" class='m-auto' alt="" style='width:90px;height:90px;'>
           <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p>
           <p>{{$t('Lang.Get professional data guidance')}}</p> -->
        </div>
      </div>

      <div class="flex lg:hidden text-left mt-2 mb-4 items-center">
        <div class="mr-4">
          <!-- <img src="@/assets/imgs/contact.png" alt="" style='width:90px;height:90px;'> -->
        </div>
        <div>
          <!-- <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p> -->
          <!-- <p>{{$t('Lang.Get professional data guidance')}}</p> -->
        </div>
      </div>
      <!-- 页脚版本号 -->
      <div
        class="
          flex
          items-center
          justify-between
          border-t border-white border-solid border-opacity-25
          h-16
        "
      >
        <span class="flex-1 hidden lg:block"></span>
        <span class="flex-1 lg:text-center"
          >© {{ year }} Atpool.com All Rights Reserved.</span
        >
        <span class="flex-1 text-right hidden lg:block"></span>
        <span class="text-right lg:hidden"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "FooterFrame",

  mixins: [],

  props: [],

  components: {},

  watch: {},

  computed: {
    ...mapGetters({
      getIsProActive: "getIsProActive",
    }),
    lang() {
      return this.$store.state.locale;
    },
  },

  data: function () {
    return {
      year:
        new Date().getFullYear() == "2020"
          ? "2020"
          : "2020-" + new Date().getFullYear(),
      version: "2.1.7",
    };
  },

  methods: {},

  mounted: function () {},

  beforeDestroy: function () {},
};
</script>
<style lang="scss">
.footer {
  /* background:url('../assets/imgs/footerbg.png'); */
}
.leftTxt {
  margin-right: 1.45rem;
}
.middleTxt {
  display: flex;
  justify-content: center;
}
.middleTxt div p:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1.7rem;
}
.middleTxt div p:not(:nth-child(1)) {
  font-size: 13px;
  margin-bottom: 0.18rem;
  cursor: pointer;
}
.contactImg {
  display: flex;
}
// .contactImg img {
//   width: 0.34rem;
//   height: 0.34rem;
// }
</style>
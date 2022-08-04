<template>
  <div class="__nuxt-error-page flex justify-center items-center">
    <div class="error">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
        <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"></path>
      </svg>
      <div class="my-3">
        <!-- <span>{{ error.message }}</span> -->
      </div>
      <div class="mb-32 flex items-center">
        <span>{{$t('Lang.Error')}} !</span>
        <!-- <a class="text-main font-medium flex items-center" :href=`${lang}`>
          <span>返回首页</span>
          <i class="el-icon-arrow-right"></i>
        </a> -->
        <n-link :to="`/${lang}/`"><span class='text-main font-medium ml-4'>{{$t('Lang.Back to home')}}</span><i class="el-icon-arrow-right text-main"></i></n-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  data() {
    return {
      lang:this.$store.state.locale
    }
  },
}
</script>
<style scoped>
.__nuxt-error-page {
  /* padding: 1rem;
  background: transparent !important;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  height: 60vh;
}

.__nuxt-error-page .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  font-size: 12px;
  line-height: 20px;
}
</style>
<template>
  <div id="app">
    <!-- 导航栏 navbar.vue -->
    <navbar/>
    
    <router-view/>
    
  </div>
</template>

<script>
import navbar from '@/components/common/navbar'
import store from '@/vuex/store'
export default {
  name: 'App',
  components:{
    navbar
  },
  store
}
</script>

<style>

</style>

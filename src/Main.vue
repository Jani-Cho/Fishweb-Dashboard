<template>
  <div >
    <navbar v-on:changeMain="changeNav"></navbar>
    <!-- 主要內容 -->
    <div class="main">
        <!-- 首頁 -->
        <router-view></router-view>
        <!-- <home v-if="main_page == 'home'" ></home>
        <portfolio v-if="main_page == 'portfolio'"></portfolio> -->

    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Portfolio from '@/components/Portfolio'
export default {
  name: 'Main',
  data(){
    return{
      main_page: 'home',
    }
  },
  components: {
    'navbar': Navbar,
    'home': Home,
    'portfolio': Portfolio
  },
  methods:{
    changeNav(id){
      console.log(id);
      this.main_page = id
    }
  }

}
</script>

<style>
@import '../src/assets/css/reset.css';
@import '../src/assets/css/dashboard.css';

</style>

<template>
    <!-- 主導覽列 -->
    <div id="Navigation">
        <div class="navbar">
            <div class="navbar_Logo">
                <img src="../assets/image/logo.png" alt="">
            </div>
            <div class="navbar_Item">
                <ul class="navs">
                    <router-link to="/home" active-class="active">
                        <li id="home">
                            <span class="navs_Icon"><i class="fas fa-home"></i></span>
                            <span class="navs_Title">Member 工作室成員</span>
                        </li>
                    </router-link>
                    <router-link to="/portfolio" active-class="active">
                        <li id="portfolio">
                            <span class="navs_Icon"><i class="fas fa-list-alt"></i></span>
                            <span class="navs_Title">Portfolio 作品集</span>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changeNav(id, rm) {

      let nav_active = document.getElementById(id);
      let rm_active = document.getElementById(rm);
      nav_active.classList.add('active')
      rm_active.classList.remove('active')
      this.$emit('changeMain',id);
;    },
  },
}
</script>
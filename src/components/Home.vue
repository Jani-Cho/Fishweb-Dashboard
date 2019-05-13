<template>
    <section id="main_Home" class="main_Page">
        <h2 class="main_title">工作室成員</h2>
        <article class="home_box">
            <div class="box_Img">
                <img :src="'http://www.henrychang.tw/upload/Members/'+ member.Picture" alt="member_pic">
            </div>
            <div class="box_Content">
               <h2>{{member.Name}}</h2>
                <p>{{member.Content}}</p>
                <div class="box_Btn" @click="editModal_Open()">
                    <i class="fas fa-pen"></i>修改成員資料
                </div>
            </div>
        </article>
        <Modal v-if="modalOpen" :member="member" :type="0" v-on:editState="editModal_Close"></Modal>

    </section>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Modal from '@/components/Modal'

Vue.use(VueAxios, axios)
export default {
    data(){
      return{
        modalOpen: false,
        member: '',
        }
    },
    components:{
        'Modal': Modal,
    },

  created(){
    /* 獲取成員資料 */
    Vue.axios.post('/data/APITest/GetMember').then((response) => {
        var data = response.data.content
        this.member = JSON.parse(data)
        console.log(this.member)
        this.Pic = 'http://www.henrychang.tw/upload/Members/'+ this.member.Picture
        this.Name = this.member.Name
        this.Intro = this.member.Content
    })

},
methods:{
    editModal_Open(){
        this.modalOpen = true;
    },
    editModal_Close(state){
        if(state == true){
            this.editSuccess();
        }

        this.modalOpen = false;
    },
    editSuccess(){
        Vue.axios.post('/data/APITest/GetMember').then((response) => {
        var data = response.data.content
        this.member = JSON.parse(data)

    })
    }
}
}
</script>
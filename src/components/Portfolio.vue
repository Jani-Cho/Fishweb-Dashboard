<template>
    <section id="main_Portfolio" class="main_Page">
        <h2 class="main_title">作品集
            <span class="btn add" @click="editModal_Open(1)"><i class="fas fa-plus-circle"></i>新增作品</span>
            <div class="form_Item inline">
                <select name="" id="">
                    <option value="0">選擇類別</option>
                    <option v-for="code in codeType" :value="code.Id" >{{code.Name}}</option>
                </select>
            </div>
            <span class="btn add search">搜尋</span>
            <span class="btn add" @click="editModal_Open(3)"><i class="fas fa-plus-circle"></i>編輯類型</span>
        </h2>
        <main class="projects_List">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>順序</th>
                        <th>類型/Id</th>
                        <th>程式/Id</th>
                        <th>作品名稱</th>
                        <th>協作者</th>
                        <th>預覽</th>
                        <th>作品內容</th>
                        <th>編輯作品資料</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(p, key) in workProjects">
                    <td :name="'edit_Project' + key" :id="p.Id">
                    {{p.Id}}
                    </td>
                    <td>
                    {{p.Order}}
                    </td>
                    <td>
                    {{p.Type}}
                    {{p.TypeId}}
                    </td>
                    <td>
                    {{p.Code}}
                    {{p.CodeId}}
                    </td>
                    <td>
                    {{p.Title}}
                    </td>
                    <td>
                    {{p.Engineer}}
                    </td>
                    <td class="project_Img">
                        <a :href="p.Url" target="_blank">
                        <img :src="'http://www.henrychang.tw/images/work/'+p.Picture" alt="">
                        </a>
                    </td>
                    <td><span class="btn add check" @click="project_Open(2, p.Id)">查看</span></td>
                    <td>
                        <span class="project_Btn" @click="change_Project(p.Id, key-1)" v-if="key != 0 ">
                            <i class="fas fa-arrow-up"></i>
                        </span>
                        <span class="project_Btn disabled" @click="change_Project(p.Id, key-1)" v-if="key == 0 ">
                            <i class="fas fa-arrow-up"></i>
                        </span>
                        <span class="project_Btn " @click="change_Project(p.Id, key+1)" v-if="key +1 < workProjects.length ">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        <span class="project_Btn disabled" @click="change_Project(p.Id, key+1)" v-if="key +1 == workProjects.length ">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        <span class="project_Btn" @click="project_Open(1, p.Id)">
                            <i class="fas fa-pen"></i>
                        </span>
                        <span class="project_Btn" @click="delete_Project(p.Id, p.Title)">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
        <div class="projects" v-if="projectOpen.page"> 
            <div v-if="!projectOpen.pics">

                <h2 class="main_title">
                    <span @click="project_Close()" class="btn add"><i class="fas fa-arrow-left" ></i>返回</span>
                        
                </h2>
                <div class="project_Data">
                    <div class="form_Item">
                        <label for="edit_ProjectName">作品名稱</label>
                        <input id="edit_ProjectName" type="text" :value="projectData.Title">
                    </div>
                    <div class="form_Item">
                        <label for="edit_ProjectCode">程式語言</label>
                        <select id="edit_ProjectCode">
                            <option value="0">選擇類別</option>
                            <option v-for="code in codeType" :value="code.Id" :selected="code.Id == projectData.CodeId">{{code.Name}}</option>
                        </select>
                    </div>
                    <div class="form_Item">
                        <label for="edit_ProjectType">作品類型</label>
                        <select id="edit_ProjectType">
                            <option value="0">選擇類別</option>
                            <option v-for="work in workType" :value="work.Id" :selected="work.Id == projectData.TypeId">{{work.Name}}</option>
                        </select>
                    </div>
                    <div class="form_Item">
                        <label for="edit_UrlType">連結類型</label>
                        <input id="edit_UrlType" type="text" :value="projectData.UrlType">
                    </div>
                    <div class="form_Item">
                        <label for="edit_ProjectUrl">作品連結</label>
                        <input id="edit_ProjectUrl" type="text" :value="projectData.Url">
                    </div>
                    <div class="form_Item">
                        <label for="edit_Engineer">協作者</label>
                        <input id="edit_Engineer" type="text" :value="projectData.Engineer">
                    </div>
                    <div class="form_Item file">
                        <label name="file_Img" for="p_File">更換圖片</label>
                        <input multiple id="p_File" type="file" @change="fileChange" ref="inputer">
                        <img :src="'http://www.henrychang.tw/images/work/'+ projectData.Picture" alt="" id="imgUrl">
                    </div>
                    <h4>點擊次數:{{projectData.ClickCount}}</h4>
                    <div class="form_Button">
                        <button class="btn grey" @click="edit_Cancel()">取消</button>
                        <button class="btn" @click="project_Edit(projectData.Id)">送出</button>
                    </div>
                </div>
            </div>

            <div v-else>
                <h2 class="main_title">作品圖片列表
                    <span @click="project_Close()" class="btn add"><i class="fas fa-arrow-left" ></i>返回</span>

                    <span class="btn add" @click="editModal_Open(4, projectID)"><i class="fas fa-plus-circle"></i>新增作品圖片</span>
                </h2>
                <div class="pics_List project_Data" v-for="(pic, key) in projectPics">
                    <img :name="'edit_Pics' + key" :id="pic.Id" :src="'http://www.henrychang.tw/images/work/' + pic.Picture" alt="">
                    <div class="pics_Btn">

                        <span class="project_Btn" @click="change_Pics(pic.Id, key-1, projectID)" v-if="key != 0 ">
                            <i class="fas fa-arrow-left"></i>
                        </span>
                        <span class="project_Btn disabled" @click="change_Pics(pic.Id, key-1, projectID)" v-if="key == 0 ">
                            <i class="fas fa-arrow-left"></i>
                        </span>
                        <span class="project_Btn " @click="change_Pics(pic.Id, key+1, projectID)" v-if="key +1 < projectPics.length ">
                            <i class="fas fa-arrow-right"></i>
                        </span>
                        <span class="project_Btn disabled" @click="change_Pics(pic.Id, key+1, projectID)" v-if="key +1 == projectPics.length ">
                            <i class="fas fa-arrow-right"></i>
                        </span>
                        <span class="project_Btn" @click="editModal_Open(5, pic.Id)">
                            <i class="fas fa-pen"></i>
                        </span>
                        <span class="project_Btn" @click="delete_Pics(pic.Id, pic.Title, projectID)">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 0:修改成員 1:新增作品集 2.編輯作品集 3.編輯程式 -->
        <Modal v-if="modalOpen" :type="type" :codeType="codeType" :workType="workType" :projectData="projectData" :projectPics="projectPics" :picData="picData" :projectID="projectID" v-on:editState="editModal_Close"></Modal>
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
            type: null,
            codeType: [],/* Code類型 */
            workType: [],/* Work類型 */
            workProjects: [],/* 作品集 */
            projectOpen: {
                page: false,
                pics: false,
            }
            ,
            newId: '',
            projectID: null,
            projectData: [],/* 作品資料 */
            projectPics: [],/* 作品圖片集 */
            picData: [],/* 作品圖片 */
        }
    },
    components:{
        'Modal': Modal,
    },
    mounted(){
            /* code類型 */
            this.getCodeType();
            /* 作品集 */
            this.getProjects();
            /* 作品類型 */
            this.getProjectType();


    },
    methods:{
        /* 取得程式類型 */
        getCodeType(){
            axios.post('/data/APITest/GetCodeType',{
            })
            .then((resp) => {
                // console.log(resp)
                this.codeType = JSON.parse(resp.data.content)
                console.log('code類型',this.codeType)
            });
        },
        /* 取得作品類型 */
        getProjectType(){
            axios.post('/data/APITest/GetWorksType',{
            })
            .then((resp) => {
                // console.log(resp)
                this.workType = JSON.parse(resp.data.content)
                console.log('作品類型',this.workType)
            });
        },
        /* 取得作品集 */
        getProjects(){
            axios.post('/data/APITest/GetWorksProjectList',{
            })
            .then((resp) => {
                this.workProjects = JSON.parse(resp.data.content)
                console.log('作品集',this.workProjects)
            });
        },
        /* 取得單一作品集 */
        getProjectData(id){
            var qs = require('qs');
            axios.post('/data/APITest/GetWorksProject',qs.stringify({
                "id": id
            })
            )
            .then((resp) => {
                this.projectData = JSON.parse(resp.data.content)
                console.log('單一作品集',this.projectData)
            });
        },
        /* 取得成員資料 */
        getMember(){
            axios.post('/data/APITest/GetMember')
            .then((resp) => {
                this.member = JSON.parse(resp.data.content)
                console.log('成員', this.member)
            })
        },
        /* 取得作品圖片 */
        getProjectPics(id){
            var qs = require('qs');
            axios.post('/data/APITest/GetWorksDetailList',qs.stringify({
                "ProjectId": id
            })
            )
            .then((resp) => {
                if(resp.data.result == '1'){
                    // alert(resp.data.content);
                    this.projectPics = JSON.parse(resp.data.content)
                    console.log('作品圖片', this.projectPics)

                }else{
                    alert('無圖片');
                    console.log(resp)
                    return

                }

            })
        },
        /* 取得作品單一圖片 */
        getProjectPic(id){
            console.log('取得作品單一圖片', id)
            var qs = require('qs');
            axios.post('/data/APITest/GetWorksDetail',qs.stringify({
                "id": id
            })
            )
            .then((resp) => {
                if(resp.data.result == '1'){
                    // alert(resp.data.content);
                    this.picData = JSON.parse(resp.data.content)
                    console.log('作品單一圖片', this.picData)
                }else{
                    // alert('無圖片');
                    console.log(resp)
                    return

                }

            })
        },
        imgPreview(file){

            let self = this;
            // 看支持不支持FileReader
            if (!file || !window.FileReader) return;
    
            if (/^image/.test(file.type)) {
                // 創建一個reader
                let reader = new FileReader();
                // 將圖片將轉成 base64 格式
                reader.readAsDataURL(file);
                // 讀取成功後的回調
                reader.onloadend = function () {
                    document.getElementById('imgUrl').src = this.result;
                    this.imgUrl = this.result
                }
                
            }
        },
        fileChange(e) {


            
            this.imgData = e.target.files[0];

            this.imgPreview(this.imgData);
            console.log('e',e.target.id)
            // console.log('圖片預覽成功',this.imgData)
        },

        edit_Cancel(){
            this.projectOpen.page = false
            this.projectOpen.pics = false
        },
        // edit_Post(id){
            
        // },
        /* 彈窗開啟 */
        editModal_Open(id, Pid){
            this.type = id
            this.modalOpen = true;

            console.log('單一作品圖id', Pid)
            if(Pid){
                this.getProjectPic(Pid);
            }
            
        },
        /* 彈窗關閉 */
        editModal_Close(state, type, Pid){
            console.log(state, type, Pid)
            if(state == true){
                if(type == 2){
                    console.log('更新member成功並重整')
                    this.getMember();
                }
                if(type == 3){
                    console.log('更新codetype成功並重整')
                    this.getCodeType()
                    return
                }
                if(type == 4){
                    console.log('更新projects成功並重整')
                    this.getProjects();
                }
                if(type == 5 && Pid){
                    console.log('更新pics成功並重整')
                    this.getProjectPics(Pid);
                }

            }

            this.modalOpen = false;
        },
        /* 刪除作品 */
        delete_Project(id, name){
            if(confirm('確認刪除？')){

                var qs = require('qs');
                axios.post('/data/APITest/DeleteWorksProject',qs.stringify(
                {
                    "id": id,
                    "title": name
                })
                )
                .then((resp) => {
                    if(resp.data.result == '1'){
                        alert(resp.data.content);
                        this.getProjects();
    
                    }else{
                        alert(resp.data.content)
    
                    }
                    console.log(resp)
                });
            }
        },
        /* 更換作品順序 */
        change_Project(id, key){
            let changeTarget = document.getElementsByName('edit_Project'+key)
            let chandeData = {
                "id1": id,
                "id2": changeTarget[0].id
            }
            console.log(chandeData)
            var qs = require('qs');
            axios.post('/data/APITest/ChangeWorksProjectOrder',qs.stringify(chandeData)
            ).then((resp) => {
                if(resp.data.result == '1'){
                    // alert(resp.data.content);
                    this.$emit('editState', true, 4)
                    this.getProjects()
                }else{
                    alert('修改失敗，請重試')
                    return

                }
                console.log('更換作品順序成功',chandeData)
            });
        },

        /* 開啟作品 */
        project_Open(type, id){
            console.log('id', id)
            this.projectOpen.page = true;
            // 1: 單ㄧ作品資料
            // if( type == 1){
                
                this.getProjectData(id)
            // }

            // 2: 查看圖片
            if( type == 2){
                this.projectOpen.pics = true;
                this.projectID = id
                this.getProjectPics(id)
            }
        

        },
        /* 編輯作品 */
        project_Edit(id){

            let edit_ProjectType = document.getElementById('edit_ProjectType').value
            let edit_ProjectCode = document.getElementById('edit_ProjectCode').value
            let edit_UrlType = document.getElementById('edit_UrlType').value
            let edit_ProjectUrl = document.getElementById('edit_ProjectUrl').value
            let edit_ProjectName = document.getElementById('edit_ProjectName').value
            let edit_Engineer = document.getElementById('edit_Engineer').value
            // let p_Engineer = document.getElementById('p_Engineer').value
            let imgUrl = document.getElementById('imgUrl').src

            let formData = new FormData();
            formData.append('id', id)
            formData.append('typeId', edit_ProjectType)
            formData.append('codeId', edit_ProjectCode)
            formData.append('urlType', edit_UrlType)
            formData.append('url', edit_ProjectUrl)
            formData.append('title', edit_ProjectName)
            formData.append('engineer', edit_Engineer)
            if(this.imgData){
                formData.append('file', this.imgData)
            }else{
                formData.append('file', imgUrl)
            }

            console.log('編輯作品集', 'typeId：',formData.get('typeId'),'codeId：',formData.get('codeId'),'urlType：',formData.get('urlType'),'url：',formData.get('url'),'title：',formData.get('title'),'engineer：',formData.get('engineer'),'file：',formData.get('file'),)

            axios.post('/data/APITest/EditWorksProject',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    this.edit_Cancel();
                    this.getProjects();
                }else{
                    console.log(resp)
                    alert('編輯作品失敗，請重新填寫')
                    return

                }
                console.log('編輯作品')
            });
        },
        /* 關閉作品 */
        project_Close(){
            this.projectOpen.page = false;
            this.projectOpen.pics = false;
            this.projectPics = ''

        },
        /* 刪除作品圖片 */
        delete_Pics(id, title, Pid){
            // console.log('刪除單一圖片id',id,'title',title)
            if(confirm('確認刪除？')){

                var qs = require('qs');
                axios.post('/data/APITest/DeleteWorksDetail',qs.stringify({
                    "id": id,
                    "title": title
                })
                )
                .then((resp) => {
                    if(resp.data.result == '1'){
                        // (resp.data.content);
                        this.getProjectPics(Pid)
    
                    }else{
                        console.log(resp)
                        return
    
                    }
    
                })
            }
        },
        /* 更換圖片順序 */
        change_Pics(id, key, Pid){
            let changeTarget = document.getElementsByName('edit_Pics'+key)
            let chandeData = {
                "id1": id,
                "id2": changeTarget[0].id
            }
            console.log(chandeData)
            var qs = require('qs');
            axios.post('/data/APITest/ChangeWorksDetailOrder',qs.stringify(chandeData)
            ).then((resp) => {
                if(resp.data.result == '1'){
                    // alert(resp.data.content);
                    this.$emit('editState', true, 4)
                    this.getProjectPics(Pid)
                }else{
                    alert('修改失敗，請重試')
                    return

                }
                console.log('更換作品順序成功',chandeData)
            });
        }
    }
}
</script>

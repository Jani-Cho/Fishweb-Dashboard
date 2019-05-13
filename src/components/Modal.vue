<template>
    <div id="modal">
        <div class="modal-mask"></div>
        <div class="modal" style="display: block;">
            <div class="close" @click="edit_Cancel"><span>+</span></div>
            <!-- 編輯成員 -->
            <div class="content" v-if="type == 0">
                <h2>修改成員</h2>
                <div class="form_Item file">
                    <input multiple id="file_Img" type="file" @change="fileChange" ref="inputer">
                    <label name="file_Img" for="file_Img">更改頭像</label>
                    <!-- <img :src="imgUrl" alt=""> -->
                    <img class="profilo" id="imgUrl" :src="'http://www.henrychang.tw/upload/Members/'+ member.Picture" alt="">
                </div>
                <div class="form_Item">
                    <label for="edit_Name">Name</label>
                    <input id="edit_Name" type="text" :value="member.Name">
                </div>
                <div class="form_Item">
                    <label for="edit_Content">Content</label>
                    <textarea id="edit_Content" type="text" :value="member.Content" cols="30" rows="10"></textarea>
                </div>
                <div class="form_Button">
                    <button class="btn grey" @click="edit_Cancel()">取消</button>
                    <button class="btn" @click="edit_Post()">送出</button>
                </div>
            </div>
            <!-- 新增作品集類型 -->
            <div class="content" v-if="type == 1">
                <h2>新增作品集</h2>
                <div class="form_Item file">
                    <input multiple id="p_File" type="file" @change="fileChange" ref="inputer">
                    <label name="file_Img" for="p_File">新增作品圖示</label>
                    <img class="project" id="imgUrl" src="" alt="">
                </div>
                <div class="form_Item">
                    <label for="p_Title">名稱</label>
                    <input id="p_Title" type="text">
                </div>
                <div class="form_Item">
                    <label for="p_CodeId">語言</label>
                    <select name="p_CodeId" id="p_CodeId">
                        <option value="0" selected disabled>選擇程式</option>
                        <option :value="code.Id" v-for="code in codeType">{{code.Name}}</option>
                    </select>
                </div>
                <div class="form_Item">
                    <label for="p_TypeId">類型</label>
                    <select name="p_TypeId" id="p_TypeId">
                        <option value="0" selected disabled>選擇類型</option>
                        <option :value="work.Id" v-for="work in workType">{{work.Name}}</option>
                    </select>
                </div>
                <div class="form_Item">
                    <label for="p_Engineer">協作者</label>
                    <input id="p_Engineer" type="text">
                </div>
                <div class="form_Item">
                    <label for="p_UrlType">連結類型</label>
                    <select name="p_UrlType" id="p_UrlType">
                        <option value="0" selected disabled>選擇類型</option>
                        <option value="1">連結</option>
                        <option value="2">下載</option>
                        <option value="3">不提供下載</option>
                    </select>
                </div>
                <div class="form_Item">
                    <label for="p_Url">連結</label>
                    <input id="p_Url" type="text">
                </div>
                <div class="form_Button">
                    <button class="btn grey" @click="edit_Cancel()">取消</button>
                    <button class="btn" @click="add_Project()">送出</button>
                </div>
            </div>
            <!-- 編輯作品集類型 -->
            <div class="content" v-if="type == 2">
                <h2>編輯類型</h2>
                <div class="form_Item">
                    <label for="add_Name">名稱</label>
                    <input id="add_Name" type="text">
                    <div class="btn add">新增</div>
                </div>
                <div class="form_Item">
                    <label for="add_Code">語言</label>
                    <select name="add_Code" id="add_Code">
                        <option value="0">選擇程式</option>
                    </select>
                </div>
                <div class="form_Item">
                    <label for="add_Type">類型</label>
                    <select name="add_Type" id="add_Type">
                        <option value="0">選擇類型</option>
                    </select>
                </div>
                <div class="form_Item">
                    <label for="add_Url">連結</label>
                    <input id="add_Url" type="text">
                </div>
                <div class="form_Button">
                    <button class="btn grey" @click="edit_Cancel()">取消</button>
                    <button class="btn" @click="edit_Post()">送出</button>
                </div>
            </div>
            <!-- 編輯程式類型 -->
            <div class="content" v-if="type == 3">
                <h2>編輯程式類型</h2>
                <div class="form_Item">
                    <label for="add_CodeName">新增類型</label>
                    <input id="add_CodeName" type="text" style="flex:3;">
                    <div class="btn add" @click="add_Code()">新增</div>
                </div>
                <div class="form_Item" v-for="(code, key) in codeType">
                    <label for="edit_Code">{{code.Order}}</label>
                    <input :name="'edit_Code' + key" :id="code.Id" type="text" :value="code.Name">
                    <span class="edit_Btn">
                        <i class="far fa-edit" @click="edit_Code(code.Id)"></i>
                        <i class="fas fa-arrow-up btn" @click="change_Code(code.Id, key-1)" v-if="key != 0 "></i>
                        <i class="fas fa-arrow-up btn disabled" v-if="key == 0 "></i>
                        <i class="fas fa-arrow-down btn" @click="change_Code(code.Id, key+1)" v-if="key +1 < codeType.length "></i>
                        <i class="fas fa-arrow-down btn disabled"  v-if="key +1 == codeType.length "></i>
                        <i class="fas fa-trash-alt btn" @click="delete_Code(code.Name, code.Id)"></i>
                    </span>
                </div>
            </div>
            <!-- 新增作品圖片 -->
            <div class="content" v-if="type == 4">
                <h2>新增作品圖片( id: {{projectID}})</h2>
                <div class="form_Item file">
                    <input multiple id="pic_File" type="file" @change="fileChange" ref="inputer">
                    <label name="file_Img" for="pic_File">新增作品圖示</label>
                    <img id="pic_ImgUrl" src="" alt="">
                </div>
                <div class="form_Item">
                    <label for="p_Title" class="flex2">作品名稱</label>
                    <input id="p_Title" type="text" :value="projectData.Title" readonly>
                </div>
                <div class="form_Item">
                    <label for="pic_Title" class="flex2">圖片標題</label>
                    <input id="pic_Title" type="text">

                </div>
                <div class="form_Item">
                    <label for="pic_Content" class="flex2">圖片說明</label>
                    <textarea name="" id="pic_Content" cols="30" rows="10"></textarea>
                </div>
                <div class="form_Button">
                    <button class="btn grey" @click="edit_Cancel()">取消</button>
                    <button class="btn" @click="add_ProjectPic(projectID)">送出</button>
                </div>
            </div>
            <!-- 編輯作品圖片 -->
            <div class="content" v-if="type == 5">
                <h2>編輯作品圖片</h2>
                <!-- {{picData}} -->
                <div class="form_Item file">
                    <input multiple id="pics_eFile" type="file" @change="fileChange" ref="inputer">
                    <label name="file_Img" for="pics_eFile">編輯作品圖示</label>
                    <img id="pImgUrl" :src="'http://www.henrychang.tw/images/work/'+ picData.Picture" alt="">
                </div>
                <div class="form_Item">
                    <label for="p_Title" class="flex2">作品名稱</label>
                    <input id="p_Title" type="text" :value="picData.ProjectName" readonly>
                </div>
                <div class="form_Item">
                    <label for="edit_PicsTitle" class="flex2">圖片標題</label>
                    <input id="edit_PicsTitle" type="text" :value="picData.Title">

                </div>
                <div class="form_Item">
                    <label for="edit_PicsContent" class="flex2">圖片說明</label>
                    <textarea name="" id="edit_PicsContent" cols="30" rows="10" :value="picData.Content"></textarea>
                </div>
                <div class="form_Button">
                    <button class="btn grey" @click="edit_Cancel()">取消</button>
                    <button class="btn" @click="edit_Pics(picData.Id, projectID)">送出</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Modal from '@/components/Modal'

Vue.use(VueAxios, axios)
export default {
    date(){
        return{
            edit_Name: '',
            edit_Content: '',
            // file: '',
            imgData: '',
            imgUrl: null
        }
    },
    props: ['member','type','codeType','workType','projectData','projectPics','picData','projectID'],
    mounted(){


    },
    methods:{
        imgPreview(file, id){
            // console.log('file',file,'id',id)
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
                    document.getElementById(id).src = this.result;
                    this.imgUrl = this.result
                }
                
            }
        },
        fileChange(e) {

            console.log('e',e.target.id)
            if(e.target.id == 'pic_File'){
                this.imgData = e.target.files[0];
                this.imgPreview(this.imgData, 'pic_ImgUrl');
            }else if(e.target.id == 'pic_eFile'){
                
                this.imgData = e.target.files[0];
                this.imgPreview(this.imgData, 'eImgUrl');
            }else if(e.target.id == 'pics_eFile'){
                
                this.imgData = e.target.files[0];
                this.imgPreview(this.imgData, 'pImgUrl');
            }
            else{

                this.imgData = e.target.files[0];
                this.imgPreview(this.imgData, 'imgUrl');
            }
            // console.log('圖片預覽成功',this.imgData)
        },
        edit_Cancel(){
            this.$emit('editState', false)
        },
        edit_Post(){
            this.edit_Name = document.getElementById('edit_Name').value
            this.edit_Content = document.getElementById('edit_Content').value
        

            let formData = new FormData();
            formData.append('name', this.edit_Name)
            formData.append('content', this.edit_Content)
            formData.append('file', this.imgData)


            console.log('post',formData.has('file'))
            // var qs = require('qs');
            axios.post('/data/APITest/EditMember',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    // location.reload();
                    this.$emit('editState', true, 2)
                }else{
                    alert(resp.data.content)

                }
                console.log(resp)
            });

        },
        /* 新增作品集 */        
        add_Project(){
            // typeId 作品集類型代號
            let p_TypeId = document.getElementById('p_TypeId').value
            // codeId 程式語言類型代號
            let p_CodeId = document.getElementById('p_CodeId').value
            // urlType連結類型 請見 說明
            let p_UrlType = document.getElementById('p_UrlType').value
            // url 連結或下載網址
            let p_Url = document.getElementById('p_Url').value
            // title 作品名稱
            let p_Title = document.getElementById('p_Title').value
            // engineer 協作者(可不傳)
            let p_Engineer = document.getElementById('p_Engineer').value

            let formData = new FormData();
            formData.append('typeId', p_TypeId)
            formData.append('codeId', p_CodeId)
            formData.append('urlType', 1)
            formData.append('url', p_Url)
            formData.append('title', p_Title)
            formData.append('engineer', p_Engineer)
            formData.append('file', this.imgData)

            // console.log('上傳作品集', 'typeId：',formData.get('typeId'),'codeId：',formData.get('codeId'),'urlType：',formData.get('urlType'),'url：',formData.get('url'),'title：',formData.get('title'),'engineer：',formData.get('engineer'),'file：',formData.get('file'),)

            axios.post('/data/APITest/AddWorksProject',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    this.$emit('editState', true, 4)
                }else{
                    console.log(resp)
                    alert('新增作品集失敗，請重新填寫')
                    return

                }
                console.log('新增作品集成功')
            });
            
        },
        /* 新增程式類型 */
        add_Code(){

            let code_Add = document.getElementById('add_CodeName').value

            if( code_Add == "" || code_Add == undefined){
                alert('請輸入正確的程式名稱')
                return
            }
            // console.log('code_Add',code_Add)
            var qs = require('qs');
            axios.post('/data/APITest/AddCodeType',qs.stringify(
                { 'name':  code_Add }
            )
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    document.getElementById('add_CodeName').value = "";
                    this.$emit('editState', true, 3)
                }else{
                    alert('新增程式類別失敗，請重新填寫')
                    return

                }
                console.log('新增code',code_Add,'成功')
            });
            
        },
        /* 刪除程式類型 */
        delete_Code(name, id){

            // console.log('刪除code Name',name)
            // console.log('刪除code Id',id)
            var qs = require('qs');
            axios.post('/data/APITest/DeleteCodeType',qs.stringify(
                { 
                    'id':  id, 
                    'name':  name, 
                }
            )
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    this.$emit('editState', true, 3)
                }else{
                    alert('刪除失敗，請重試')
                    return

                }
                console.log('刪除code',name,'成功')
            });
            
        },
        /* 更換程式類型 */
        change_Code(id, key){

            // console.log('更換id',id)
            // console.log('第',key,'個')
            let changeTarget = document.getElementsByName('edit_Code'+key)
            let chandeData = {
                "id1": id,
                "id2": changeTarget[0].id
            }
            // console.log('抓到',changeTarget[0].id)
            var qs = require('qs');
            axios.post('/data/APITest/ChangeCodeTypeOrder',qs.stringify(chandeData)
            ).then((resp) => {
                if(resp.data.result == '1'){
                    // alert(resp.data.content);
                    this.$emit('editState', true, 3)
                }else{
                    alert('修改失敗，請重試')
                    return

                }
                console.log('更換code成功',chandeData)
            });
            
        },
        /* 修改程式名稱 */
        edit_Code(id){
            let editTarget = document.getElementById(id).value
            console.log('修改內容',editTarget)
            var qs = require('qs');
            axios.post('/data/APITest/EditCodeType',qs.stringify(
                {
                    "id": id,
                    "name": editTarget
                }
            )
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    // location.reload();
                    // this.$emit('editState', true)
                }else{
                    alert(resp.data.content)

                }
                console.log(resp)
            });
            
        },
        /* 新增作品圖片 */
        add_ProjectPic(id){

            let pic_Title = document.getElementById('pic_Title').value
            let pic_Content = document.getElementById('pic_Content').value
            // let pic_File = document.getElementById('pic_File')

            let formData = new FormData();
            formData.append('projectId', id)
            formData.append('title', pic_Title)
            formData.append('content', pic_Content)
            formData.append('file', this.imgData)

            console.log('上傳作品圖片', 'projectId',formData.get('projectId'),'title',formData.get('title'),'content',formData.get('content'),'file',formData.get('file'))

            axios.post('/data/APITest/AddWorksDetail',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    // location.reload();
                    this.$emit('editState', true, 5, id)
                }else{
                    alert(resp.data.content)

                }
                console.log(resp)
            });
        },
        /* 編輯作品圖片 */
        edit_ProjectPic(id){
            console.log(id)
            let pic_eTitle = document.getElementById('pic_eTitle').value
            let pic_eContent = document.getElementById('pic_eContent').value
            let imgUrl = document.getElementById('eImgUrl').src

            let formData = new FormData();
            formData.append('id', id)
            formData.append('title', pic_eTitle)
            formData.append('content', pic_eContent)
            if(this.imgData){
                formData.append('file', this.imgData)
            }else{
                formData.append('file', imgUrl)
            }

            console.log('編輯作品圖片', 'id',formData.get('id'),'title',formData.get('title'),'content',formData.get('content'),'file',formData.get('file'))

            axios.post('/data/APITest/EditWorksDetail',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    // location.reload();
                    this.$emit('editState', true, 5, id)
                }else{
                    alert(resp.data.content)

                }
                console.log(resp)
            });
        },
        /* 編輯作品圖片 */
        edit_Pics(id, Pid){
            // console.log('刪除單一圖片id',id,'title',title)
            let edit_PicsTitle = document.getElementById('edit_PicsTitle').value
            let edit_PicsContent = document.getElementById('edit_PicsContent').value
            let imgUrl = document.getElementById('pImgUrl').src

            let formData = new FormData();
            formData.append('id', id)
            formData.append('title', edit_PicsTitle)
            formData.append('content', edit_PicsContent)
            if(this.imgData){
                formData.append('file', this.imgData)
            }else{
                formData.append('file', imgUrl)
            }

            console.log('編輯圖片', 'id',formData.get('id'),'title',formData.get('title'),'content',formData.get('content'),'file',formData.get('file'))

            axios.post('/data/APITest/EditWorksDetail',formData
            ).then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    // this.getProjectPics(Pid)
                    this.$emit('editState', true, 5, Pid)
                }else{
                    console.log(resp)
                    alert('編輯圖片失敗，請重新填寫')
                    return

                }
            });

        },
    }
}
</script>
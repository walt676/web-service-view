<template>
    <div>
        <div class="padding">
            <el-alert
        title="该语音合成功能使用科大讯飞在线语音合成api,在第一次使用时需要老师联系我添加ip白名单才能使用，我的微信号：KazukiHoshino"
        type="warning"></el-alert>
        </div>
        
        
        <el-input type="textarea"
                :autosize="{ minRows: 4, maxRows: 12}"
                placeholder="请输入需要合成语音的文字内容"
                v-model="originalText">
        </el-input>
        <div class="button">
            <el-button type="primary" plain @click="getResult">语音合成</el-button>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
        return {
            originalText:''
        }
    },
    methods:{
        getResult:function(){
            axios({
                method: 'get',
                url:'http://localhost:' + this.port + 
                '/getVoiceSynthesis?originalText=' + this.originalText,
                responseType: 'blob'
            })
            .then(res =>{
                const content = res.data;
                const blob = new Blob([content])
                const fileName = this.originalText+'.wav'
                if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
                }
            })
            .catch( err =>{
                this.$message({
                    type:'error',
                    message:'合成失败，请老师联系我添加api的ip白名单'
                })
            })
        },
        download(data){
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', '1.wav')
            
            document.body.appendChild(link)
            link.click()
        }
    }
}
</script>
<style scoped>
.button{
    text-align: right;
    padding-top: 1.5rem;
}
.describe{
    padding-top: 3rem;
    text-align:center;
    margin:0px auto;
}
.padding{
    padding-bottom: 2rem;
}
</style>

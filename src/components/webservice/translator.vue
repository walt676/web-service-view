<template>
  <div class="hello">
     <el-alert
        title="该翻译WebService年代较久远，句子的翻译经常提示错误，建议使用简单单词和单个汉字或词组测试"
        type="warning" v-if="$store.state.isLogin">
    </el-alert>
    <el-row :gutter="20" v-if="$store.state.isLogin">
        <el-col :span="13">
            <div class="grid-content bg-purple">
                <div class="translator">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 12}"
                    placeholder="请输入翻译内容"
                    v-model="originalText">
                    </el-input>
                    <div class="button">
                        <el-button type="primary" plain @click="getResult">翻译</el-button>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="grid-content bg-purple">
                <div class="result-text">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 12}"
                    placeholder="翻译结果"
                    v-model="resultText">
                    </el-input>
                </div>               
            </div>
        </el-col>
    </el-row>



    <h4 v-if="!$store.state.isLogin">请登录后使用翻译功能</h4>
    
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'translator',
  data () {
    return {
      originalText:'',
      resultText:''
    }
  },
  methods:{
      getResult:function(){
          axios.post('http://localhost:'+this.port+'/webservice/translator',{
            original: this.originalText,
            userid: this.$store.state.userId
            })
            .then( res =>{
                console.log(res);
                this.resultText = res.data.result[0] +'\n'+
                                    res.data.result[1];
            })
            .catch( err =>{
                console.log(err);
                this.$message({
                    type:'info',
                    message:err.response.data
                })
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.translator{
    padding-bottom: 1rem;
    padding-top: 1.5rem;
}
.button{
    text-align: right;
    padding-top: 1rem;
}
.result-text{
    padding-bottom: 1rem;
    padding-top: 1.5rem;
}
.describe{
    padding-top: 3rem;
    text-align:center;
    margin:0px auto;
}
</style>

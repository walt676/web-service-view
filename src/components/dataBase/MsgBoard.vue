<template>
  <div class="MsgBoard">
      <!-- 标题 -->
      <div class="mes-title">
        <h3>留言板</h3>

      </div>

        <!-- 提交留div -->
        <el-collapse accordion v-model="activeName">
            <el-collapse-item title="展开留言栏" name="1">
                <div class="submitTitle" v-if="$store.state.isLogin">
                    <el-input placeholder="请输入内容" v-model="mbTitle">
                        <template slot="prepend">标题</template>
                    </el-input>
                </div>
                <div class="submit-message" v-if="$store.state.isLogin" style="text-align:right">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容"
                    v-model="mbContent" style="padding-bottom:1rem;"></el-input>
                    <el-button type="success"  @click="submitMessage">提交</el-button>
                </div>
                <div class="submit-message" v-if="!$store.state.isLogin">
                    <i class="el-icon-warning"></i>
                    请登录后再使用留言功能
                </div>
            </el-collapse-item>
        </el-collapse>
      
      
      <!-- 留言板内容 -->
      <div class="card" v-for="m in mbInfos" :key="m.id" v-if="!typeIsJson">
        <div class="card-body">
            <div class="card-title">
                {{m.title}}
            </div>
            <div class="card-author">
            <i class="icon iconfont icon-addressbook_fill"></i>
                <span class="glyphicon glyphicon-user"></span>
                {{m.author}}
            </div>
            <div class="card-content">
                {{m.content}}
            </div>
            <div class="card-time">
                {{m.time}}
            </div>
        </div>
      </div>

      <!-- Json格式表 -->   
      <div id="jsonUserTable" v-if="typeIsJson">
        <p v-for="mb in mbInfos" :key="mb.id">
            {{mb}}
        </p>
    </div>

    <div class="page-number">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click="changePage(pageInfo.currPage - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li v-for="index in indexs" :key="index" class="page-item">
                    <a class="page-link" @click="changePage(index)">{{ index }} </a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click="changePage(pageInfo.currPage + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MsgBoard',
  props:['typeIsJson'],
  data () {
    return {
        msg: 'Welcome to Your Vue.js App',
        mbInfos:[],
        pageInfo:{
            currPage:'',
            totalPage:''
        },
        textarea:'',
        activeName:'1',
        mbTitle:'',
        mbContent:''
    }
  },
  created:function(){
      axios.get('http://localhost:'+this.port+'/getMessageBoard')
      .then(res => {
          console.log(res);
          this.mbInfos = res.data.messageBoard.lists;
          this.pageInfo.currPage = res.data.messageBoard.currPage;
          this.pageInfo.totalPage = res.data.messageBoard.totalPage;
      })
      .catch(err => {
          console.error(err);
      })
  },
  computed:{
      timeFormat:time=>{
          return '1';
      },
      indexs:function(){
          var left = 1;
          var right = this.pageInfo.totalPage;
          var ar=[];
          if(this.pageInfo.totalPage>=5){
              if(this.pageInfo.currPage > 3 && this.pageInfo.currPage < this.pageInfo.totalPage-2){
                  left = this.pageInfo.currPage-2;
                  right = this.pageInfo.currPage +2 ;
              }else{
                  if(this.pageInfo.currPage<=3){
                      right = 5;
                  }else{
                      right = this.totalPage;
                      left = this.totalPage-4;
                  }
              }
          }
          while(left<=right){
              ar.push(left);
              left++;
          }
          return ar;
      }
  },
  methods:{
      submitMessage(){
          if(this.mbTitle==''){
            this.$message.error('标题不能为空');
            return;
          }
          axios.post('http://localhost:'+this.port+'/insertMessageBoard',{
              title:this.mbTitle,
              author:this.$store.state.username,
              content:this.mbContent
          })
            .then(res => {
                console.log(res);
                this.changePage(this.pageInfo.currPage);
                this.mbTitle = '';
                this.mbContent = '';
            })
            .catch(err => {
                console.error(err);
            })
      },
      changePage:function(data){
        if( 0 < data && data <=this.pageInfo.totalPage){
        axios.get('http://localhost:'+this.port+'/getMessageBoard?currentPage='+data)
            .then(res =>{
                console.log(res);
                this.mbInfos = res.data.messageBoard.lists;
                this.pageInfo.currPage = res.data.messageBoard.currPage;
                this.pageInfo.totalPage = res.data.messageBoard.totalPage;
            })
            .catch(err =>{
                console.error(err);
            })
        }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mes-title{
    padding-bottom: 1.5rem;
}
.submit-message{
    padding-bottom: 2rem;
}
.submitTitle{
    padding-bottom: 1rem;
}
.card{
    margin-bottom: 1.5rem;
    clear: both;
}
.card-title{
    color: #b6690c;
    float: left;
    font-weight: 600;
    width: 70%;
}
.card-author{
    color: #999999;
    padding-left: 2.5rem;
    font-weight: 600;
    float: right;
}
.card-content{
    clear: both;
    width: 70%;
    float: left;
}
.card-time{
    float: right;
    color: #999999;
}
</style>

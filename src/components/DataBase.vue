<template>
    
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav nav-tabs flex-column" id="myTab">
              <li class="nav-item active">
                <a class="nav-link" href="#user" data-toggle="tab">
                  用户表 <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#msgBoard" data-toggle="tab">
                  留言板
                </a>
              </li>
            </ul>
          </div>
        </nav>


                    
            <div role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 class="h2">有数据库支持的WebService</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                          
                          <button class="btn btn-sm btn-outline-secondary" @click="changeToNormal()">正常格式</button>
                          <button class="btn btn-sm btn-outline-secondary" @click="changeToJson()">Json格式</button>
                        </div>
                        
                        </div>
                    </div>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade in active" id="user">
                          <!-- 用户表 -->
                          <user-table v-bind:typeIsJson="typeIsJson" v-if="$store.state.isLogin"/>
                          <h4 v-if="!$store.state.isLogin">请先登录!</h4>
                        </div>
                        <!-- 留言板 -->
                        <div class="tab-pane fade" id="msgBoard">
                            <MsgBoardContent v-bind:typeIsJson="typeIsJson"></MsgBoardContent>
                        </div>
                    </div>
            </div>
      </div>
    </div>
</template>

<script>
import userTable from '@/components/dataBase/userTable'
import MsgBoardContent from '@/components/dataBase/MsgBoard'
export default {
  name: 'dataBase',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      typeIsJson: false 
    }
  },
  components:{
      userTable,
      MsgBoardContent
  },
  methods:{
    changeToJson: function(){
      if(!this.typeIsJson){
        this.typeIsJson = true ;  
      }
         
    },
    changeToNormal: function(){
      if(this.typeIsJson){
        this.typeIsJson = false;
      }
      
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/dashboard.css';

</style>

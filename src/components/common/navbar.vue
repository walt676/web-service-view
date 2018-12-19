<template>
    <div class="navbar-common">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">WebService</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">首页 <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/dataBase">有数据库支持的WebService</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/webservice">无数据库支持Webservice</router-link>
                </li>
                </ul>
                

                <ul class="navbar-nav" v-if="!$store.state.isLogin">
                    <li class="nav-item">
                        <router-link class="btn btn-light" to="/login">登录</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="btn btn-light" to="/signup">注册</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.isLogin">
                    <li class="nav-item">
                        <div class="dropdown">
                            <button class="btn btn-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 {{$store.state.username}} <i class="el-icon-arrow-down"></i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click="editInfo">修改资料</a>
                                <a class="dropdown-item" href="#">消息</a>
                                <router-link class="dropdown-item" to="/webservice/translateRecord">翻译记录</router-link>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light" @click="signOut"> 注销</a>
                    </li>
                </ul>
               <!-- <button @click="$store.commit('changeToLogin')">改变</button>
               <button @click="$store.commit('changeToLogout')">改变</button> -->
                
            </div>
        </nav>

      
        
    </div>
    
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  components:{
      
  },
  methods:{
      signOut(){
          this.$store.state.isLogin = false;
          this.$store.state.userId = '';
          this.$store.state.username = '';
          this.$message({
              showClose:true,
              message:'注销成功',
              type:'success'
          })
      },
      editInfo(){
          this.$message({
              showClose: true,
              message: '请使用管理员账号直接修改',
              type: 'error'
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navbar-common{
    z-index: 1020;
    position:sticky;    

}
</style>

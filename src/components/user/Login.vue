<template>
  <div class="row justify-content-md-center login">
    <div class="col-sm-3">
      <form class="form-signin" :model="loginForm" ref="loginForm">
        <h1 class="h3 mb-3 font-weight-normal text-center">登录</h1>
        <label for="inputText" class="sr-only">账号</label>
        <input type="text" id="loginName" v-model="loginForm.id" class="form-control" placeholder="账号" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="password" v-model="loginForm.password" class="form-control" placeholder="密码" required>
        <div class="checkbox mb-3">
          
        </div>
        <button class="btn btn-lg btn-info btn-block" type="submit" @click="doLogin">Sign in</button>
        <div class="alert alert-warning alert-dismissible" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>提示</strong> 可使用默认管理员账号进行登录，账号admin，密码admin
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
import { getToken } from '@/api/Login'
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      loginForm:{
        id: 'admin',
        password: 'admin'
      }
    }
  },
  methods:{
    doLogin() {
    
        axios.post('http://localhost:'+this.port+'/login',{
          loginName:this.loginForm.id,
          password: this.loginForm.password
        })
        .then(res =>{
            console.log(res);
            if(res.data.msg = '登陆成功'){
              this.$store.state.isLogin = true;
              this.$store.state.userId = res.data.userId;
              this.$store.state.username = res.data.username;
              if(res.data.authority == 1){
                this.$store.state.isAdmin = true;
              }else if(res.data.authority == 0){
                this.$store.state.isAdmin = false;
              }
              // 路由跳转至首页
              this.$router.push({path:'/'});
              //弹框提示成功
              this.$message({
                showClose:true,
                message:res.data.msg,
                type:'success'
              })
            }
        })
        .catch(err =>{
            console.log(err);
            this.$message({
                showClose:true,
                message:err.response.data,
                type:'error'
              })
        })
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  padding-top: 6rem;
}
.form-control{
  margin-bottom: 1rem; 
}
.btn-block{
  margin-bottom: 2rem;
}
</style>

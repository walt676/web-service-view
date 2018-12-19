<template>
  <div class="row justify-content-md-center signup">
    <div class="col-sm-5">
      
      <h1 class="h3 mb-3 font-weight-normal text-center">注册</h1>
      <!-- <label for="inputText" class="sr-only">账号</label>
      <input type="text" id="inputText" class="form-control" placeholder="Account number" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        
        
        <el-form-item>
          <button class="btn btn-lg btn-info btn-block" type="submit" @click="submitForm('ruleForm')">注册</button>
          <button class="btn btn-lg btn-secondary btn-block" type="submit" @click="resetForm('ruleForm')">重置</button>
        </el-form-item>
      </el-form>
      <div class="checkbox mb-3">         
        
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'signup',
  data () {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    var validatePass2 = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('请再次输入密码'));
      }else if (value !==this.ruleForm.pass) {
        callback(new Error('两次密码输入不一致！'));
      }else{
        callback();
      }
    };
    var validateEmail = (rule,value,callback)=>{
      if( !(value.indexOf('@')!==-1?true:false) ){
        callback(new Error('请输入正确到邮箱格式'));
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
          id: '',
          name:  '',
          email: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          id:[
            {required: true, message: '请输入账号', trigger:'blur'},
            {min: 5, max: 10, message:'长度在5 到 10个字符',trigger:'blur'}
          ],
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱',trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { required: true }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true }
          ]
        }
    }
  },
  methods:{
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:'+this.port+'/addUser',{
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              password: this.ruleForm.pass,
              email:this.ruleForm.email
            })
            .then(res => {
              console.log(res);
              // 路由跳转至首页
              this.$router.push({path:'/'});
              //弹框提示成功
              this.$message({
                showClose:true,
                message:'注册成功',
                type:'success'
              })
            })
            .catch(err => {
              console.log(err);
              this.$message({
                showClose: true,
                message: '账号或昵称已存在',
                type: 'error'
              })
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup{
  padding-top: 6rem;
}
.form-control{
  margin-bottom: 1rem; 
}
</style>

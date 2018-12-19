<template>
  <div class="hello">
      <div style="padding-bottom:4rem">
        <h3 style="float:left">用户表</h3>
      </div>
    <div class="table-responsive" v-if="!typeIsJson">
        <table class="table table-hover table-sm">
        <thead>
            <tr>
            <th>账号</th>
            <th>姓名</th>
            <th>密码</th>
            <th>邮箱</th>
            <th>权限</th>
            <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="account in accounts" :key="account.id">
                <td>{{account.id}}</td>
                <td>{{account.username}}</td>
                <td>******</td>
                
                <td>{{account.email}}</td>
                <td v-if="account.authority==1">
                    管理员
                </td>
                <td v-if="account.authority==0">
                    用户
                </td>
                <td v-if="$store.state.isAdmin">
                    <el-button class="btn btn-info" @click="showEditUserForm(account)">修改</el-button>
                    <el-button type="danger" class="btn btn-danger" @click="deleteUser(account.id)">删除</el-button>
                </td>
                <td v-if="!$store.state.isAdmin">
                    无权限
                </td>
            </tr>
        </tbody>
        </table>
    </div>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="id" :label-width="formLabelWidth">
                <el-col :span="14">
                    <el-input v-model="form.id" autocomplete="off" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-col :span="14">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-col :span="14">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-col :span="14">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="用户权限" :label-width="formLabelWidth">
                <el-select v-model="form.authority" placeholder="请选择用户权限">
                    <el-option :value="option.id" 
                    v-for="option in options" 
                    :key="option.id" :label="option.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="SubmitUserEdit">确 定</el-button>
        </div>
    </el-dialog>

    <!-- Json格式用户表 -->
    <div id="jsonUserTable" v-if="typeIsJson">
        <p v-for="account in accounts" :key="account.id">
            {{account}}
        </p>
    </div>
    
    <!-- 页数 -->
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
import crypto from 'crypto'
export default {
  name: 'userTable',
  props:['typeIsJson'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      accounts: [
      ],
      userInfo:'',
      pageInfo:{
        currPage:'',
        totalPage:'',
      },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
            id:'',
            username: '',
            password:'',
            email:'',
            authority: ''
        },
        formLabelWidth: '120px',
        options:[
            {
                name:'用户',
                id:0
            },
            {
                name:'管理员',
                id:1
            }
        ]
    }
  },
  created:function(){
    axios.get('http://localhost:'+this.port+'/userTable')
    .then(res =>{
        console.log(res);
        this.accounts = res.data.usertable.lists;
        this.pageInfo.currPage = res.data.usertable.currPage;
        this.pageInfo.totalPage = res.data.usertable.totalPage;
    })
    .catch(err =>{
        console.log(err);
    })
  },
  computed:{
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
    changePage:function(data){
        if( 0 < data && data <=this.pageInfo.totalPage){
        axios.get('http://localhost:'+this.port+'/userTable?currentPage='+data)
            .then(res =>{
                console.log(res);
                this.accounts = res.data.usertable.lists;
                this.pageInfo.currPage = res.data.usertable.currPage;
                this.pageInfo.totalPage = res.data.usertable.totalPage;
            })
            .catch(err =>{
                console.log(err);
            })
        }
    },
    showEditUserForm(data){
        this.form.id = data.id;
        this.form.username = data.username;
        this.form.password = data.password;
        this.form.email = data.email;
        this.form.authority = this.options[data.authority].id;
        this.dialogFormVisible = true;
    },
    SubmitUserEdit(){
        axios.post('http://localhost:'+this.port+'/saveUser',{
            id: this.form.id,
            username: this.form.username,
            password: this.form.password,
            email: this.form.email,
            authority: this.form.authority
        })
        .then(res =>{
            console.log(res);
             axios.get('http://localhost:'+this.port+'/userTable?currentPage='+this.pageInfo.currPage)
            .then(res =>{
                console.log(res);
                this.accounts = res.data.usertable.lists;
                this.pageInfo.currPage = res.data.usertable.currPage;
                this.pageInfo.totalPage = res.data.usertable.totalPage;
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err =>{
            console.log(err);
        })
        this.dialogFormVisible = false;
    },
    deleteUser(inId){
        if(inId == this.$store.state.userId){
            console.log('不能删除当前登录的账户')
        }else{

            this.$confirm('是否永久删除该用户','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                axios.post('http://localhost:'+this.port+'/deleteUser',{
                    id:inId
                })
                .then(res=>{
                    console.log(res);
                    this.changePage(this.pageInfo.currPage);
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    })
                })
                .catch(err =>{
                    console.log(err);
                    this.$message({
                        type:'info',
                        message:'删除失败'
                    })
                })
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                })

            });
            
        }
    }
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-number{
    padding-top: 6%;
}
</style>

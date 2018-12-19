<template>
    <div style="height:100%">
        <div class="chatWindow">
            <div class="dialogue" v-for="item in dialogue" :key="item.id">
                <div class="item">
                    <div class="itemWrap">
                        <div v-if='item.role==="1"'>
                            <div class="left tx"><img src="@/assets/img/boy.png" alt="" width='40' height="40"></div>
                            <div class="d_content content-rebot">{{item.msg}}</div>
                        </div>
                        <div v-if='item.role==="2"'>
                            <div class="right tx"><img src="@/assets/img/default2.png" alt="" width='40' height="40"></div>
                            <div class="d_content content-user">{{item.msg}}</div>
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    
    
        <div class="input-group">
            <input type="text" class="form-control"  placeholder="说点什么.." @keyup.enter="submit" id="robot" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
                <el-button type="primary" @click="submit">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAIContent} from "@/api/api";
export default {
    data(){
        return {
            dialogue:[
                {id:1,msg:'来聊天吧',role:'1'},
            ]
        }
    },
    methods:{

        submit:function(){
            getAIContent({'key':'9857cf36b0bc4a48b8ba3f976e43a4cf','userid':'1234','info':document.getElementById('robot').value})
            .then(res=>{
                console.log(res);
                let robotNew = {"id":this.dialogue.length+1,"msg":res.data.text,"role":"1"};
                
                let myNew = {"id":this.dialogue.length+2,"msg":document.getElementById('robot').value,"role":"2"};
                this.dialogue.push(myNew);
                this.dialogue.push(robotNew);
                document.getElementById('robot').value = '';
                this.id = this.id+2;
            })
            .catch(err=>{
                console.error(err);
            })
           
        }
    }
}
</script>

<style scoped>
.input-group{
    padding-top: 1.5rem;
}
.addDialog input{
    padding: 7px;
    width: 88%;
    border: none;
    border: 1px solid #999;
    border-radius: 14px;
    padding-left: 15px;
    outline: none;
}
.tlq{
  margin-top:60px;
  padding-bottom: 30px;
}
.chatWindow{
    height: 30rem;
    overflow-y: scroll;
}
.chatWindow::-webkit-scrollbar {
        width: 10px;     
        height: 1px;
    }
.chatWindow::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(44, 42, 42, 0.2);
        background: #535353;
    }
.chatWindow::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(63, 59, 59, 0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
.dialogue .left{
  float: left;
}
.dialogue .right{
  float: right;
}
.dialogue .item{
  position: relative;
      min-height: 49px;
    margin-bottom: 2px;
}
.d_content{
   max-width: 65%;
   display:inline-block;
  border-radius: 14px;
  color: #fff;
  padding: 6px 15px 6px 7px;
  font-size: 14px;
}
.dialogue img{
  border-radius: 50%
}
.content-rebot{
 background: #3D88F6;
  margin-top: 6px;
  margin-left: 14px;

}
.content-user{
    background: #03AFC5;
    float: right;
    margin-top: 6px;
    margin-right: 14px;
}
</style>

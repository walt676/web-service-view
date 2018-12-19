<template>
  <div class="hello">
    <div class="m-auto">
      <blockquote class="blockquote text-center">

        <div class="describe">
          <p class="h1">{{ projectMsg }}</p>
          <footer class="blockquote-footer">中间课程作业</footer>
        </div>
        <dl class="row">
          <dt class="col-sm-6">班级</dt>
          <dd class="col-sm-6"> 
            <p>{{ className }}</p>
          </dd>

          <dt class="col-sm-6">学号</dt>
          <dd class="col-sm-6">
            <p> {{ studentId }} </p>
          </dd>

          <dt class="col-sm-6">姓名</dt>
          <dd class="col-sm-6">
            <p>{{ studentName }}</p>
          </dd>
        </dl>
      </blockquote>
    </div>
    <div class="text-center">
      <h4>服务器状况: {{server}}
        <h4 v-if="server==''">离线，请启动服务器</h4>
      </h4>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      projectMsg: '分布式组件与Web服务',
      className: '软工1608',
      studentId: '20165286',
      studentName: '张泽鑫',
      server:''
    }
  },
  created: function(){
    axios.get('http://localhost:8088/checkServer')
    .then( res => {
      this.server = res.data.online;
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height: 100%;
  padding-top: 6%;
}
.describe{
  padding-bottom: 4%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="hello">
      <div class="col-sm-10">
            <div class="card" v-for="tr in trs" :key="tr.tr_id">
                <div class="card-body">
                    <div class="tr_original">
                        <div class="title">翻译前： </div> {{tr.tr_original}}
                    </div>
                    <div class="tr_result">
                        <div class="title">翻译后： </div>{{tr.tr_result}}
                    </div>
                    <div class="tr_time">
                        <div class="title">时间：</div>{{tr.tr_time}}
                    </div>
                </div>                
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

      
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'translateRecord',
  data () {
    return {
        trs:'',
        pageInfo:{
            currPage:'',
            totalPage:''
        }
    }
  },
  created:function(){
      axios.get('http://localhost:'+this.port+'/webservice/getTranslateRecord?user_id='+this.$store.state.userId)
      .then( res =>{
          console.log(res);
          this.trs = res.data.translateRecord.lists;
          this.pageInfo.currPage = res.data.translateRecord.currPage;
          this.pageInfo.totalPage = res.data.translateRecord.totalPage;
      })
      .catch( err =>{
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
        axios.get('http://localhost:'+this.port+'/webservice/getTranslateRecord?currentPage='+data+'&user_id='+this.$store.state.userId)
            .then(res =>{
                console.log(res);
                this.trs = res.data.translateRecord.lists;
                this.pageInfo.currPage = res.data.translateRecord.currPage;
                this.pageInfo.totalPage = res.data.translateRecord.totalPage;
            })
            .catch(err =>{
                console.log(err);
            })
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
    width: 100%;
}

.card{
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.tr_result{
    clear: both;
}
.title{
    color: #b6690c;
    font-weight: 600;
    float: left;
}
</style>

<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav nav-tabs flex-column" id="myTab">
                  <li class="nav-item active">
                      <a class="nav-link" href="#translator" data-toggle="tab">
                      中英文双向翻译 <span class="sr-only">(current)</span>
                      </a>
                  </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="#voiceSynthesis" data-toggle="tab">
                    在线语音合成 <span class="sr-only"></span>
                    </a>
                 </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="#AIchat" data-toggle="tab">
                    AI聊天机器人 <span class="sr-only"></span>
                    </a>
                 </li>
                </ul>
            </div>
            </nav>


                        
            <div role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 class="h2">无数据库支持的WebService</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane fade" id="translator">
                      <!-- 翻译 -->
                      <translator/>
                    </div>
                    <div class="tab-pane fade" id="voiceSynthesis">
                      <!-- 语音合成 -->
                      <voiceSynthesis/>
                    </div>
                    <div class="tab-pane fade" id="AIchat">
                      <!-- 智能聊天结合语音合成 -->
                      <AIchat />
                    </div>
                    
                </div>
            </div>
        </div><!-- row -->
    </div><!-- container-fluid -->
</template>

<script>
import translator from '@/components/webservice/translator'
import voiceSynthesis from '@/components/webservice/voiceSynthesis'
import AIchat from '@/components/webservice/AIchat'
export default {
  name: 'HelloWorld',
  components:{
    translator,
    voiceSynthesis,
    AIchat
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px; /* Height of navbar */
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

/*
 * Utilities
 */

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

</style>

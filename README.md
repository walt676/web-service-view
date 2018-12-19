# webserver

> a ssm-vue project about webserver

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 说明

项目将第一个和第二个任务整合在一个系统中。采用了前后端分离模式体现SOA、RESTful思想。后端采用了Spring+SpringMVC+Mybatis，用Spring Boot开发，数据处理使用MySQL数据库，前端使用Vue2+Vuex+Vue-router+Axios，用Vue-cli脚手架开发并打包。
有数据库支持的第一个任务实现了系统用户登录、注册，权限划分，留言板功能，权限划分。管理员可以对用户进行查删改，普通用户可查看用户表、留言板、发布留言、查看留言。查看自己翻译记录（第二个任务中功能）。
无数据库支持的第二个任务使用WSDL完成中英文在线双向翻译并记录翻译记录的功能，不过该外部WebService的年代比较久远，稍复杂的单词或句子无法完成翻译。
还有科大讯飞的在线语音合成api与图灵机器人的AI机器人聊天api。


### 有数据库支持的WebService



### 无数据库支持的WebService

#### 翻译
使用外部WSDL，年代比较久远，复杂句子、单词经常无法翻译，请尝试使用简单的单词或汉字完成双语翻译的测试

#### 在线语音合成
请先联系我添加科大讯飞ip白名单才能使用

#### AI聊天机器人
使用图灵机器人api，一天总使用限制1000次

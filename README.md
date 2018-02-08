# NodeMiddle
node中间层项目demo，

### 技术栈

* node
* express
* webpack
* pug
* axios
* es6
* AMD

### 项目概要

* 使用express搭载webpack-dev-middleware和webpack-hot-middleware进行热加载
* 内置dev（开发环境）和 production（生产环境）两种启动方式
* 采用axios承担中间层与后端的异步通信的任务，内置的axios.all()，可以在中间层代理多个后端请求一并返回，轻松实现Bigpipe
* 使用webpack+es6/AMD，从**前端层面实现了模块化和组件化**
* AMD用在Contorl层的模块化，在**node中间层实现了模块化**


## 启动

安装依赖
> npm install
  
  
启动 开发环境
> npm run dev
  
  
编译+启动生产环境
> npm run build  

> npm start

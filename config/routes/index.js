var express = require('express');
var router = express.Router();
var config = require('../config');
var axios = require('axios');

router.use('/', require('./default'));                      // 首页

router.use('/Car:id', require('./carIndex'));                  // 介绍主页

router.use('/Rank', require('./rank'));                     // 排行榜

router.use('/Api', require('./interface'));                 // 前端接口

// router.use('/Login', require('./login'));                   // 登录 和 退出


module.exports = router;
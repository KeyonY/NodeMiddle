/**
  * 验证用户是否登录
  */
var config = require('../config/config');
var axios = require('axios');

var addUser = function (req, res, next) {
    next();
    /*axios.get(config.origin + '/Api/Auth/Base', config.axiosHeaders(req, {}))
	    .then((response) => {
	    if(response.data.Status === 0) {
            req.userInfo_ = {};
            req.userInfo_.hasLogin = true;
            req.userInfo_.baseInfo = response.data.Data;
            next();
        }else if(response.data.Status === 405) {
            res.redirect("/Login");
        }
    }).catch((e) => {
        console.log('status_status');
        if(e.response.status === 401) {
            req.userInfo_ = {};
            req.userInfo_.hasLogin = false;
            req.userInfo_.baseInfo = {};
            next();
        }else {
            res.send(e.response.data);
        }
    });*/
}

module.exports = addUser;
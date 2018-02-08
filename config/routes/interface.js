var express = require('express');
var router = express.Router();
var config = require('../config');
const common = require('../common');
const auth = require('../../middleware/addUser');
var axios = require('axios');
var request = require('request');
var http = require('http');

/*
// 接口-用户首次登陆设计身份
router.get('/Member/SetRole', (req, res, next) => {
    axios.get(config.origin + '/Api/Member/SetRole', config.axiosHeaders(req, {
        params: {role: req.query.role}
    }))
        .then(res1 => {
            res.send(res1.data);
        }).catch(e => {
            config.sendError(res, e);
    })
})


// 接口-雇主发送已有的多个需求给设计师
router.post('/Master/SendRequestToDesigner', (req, res, next) => {
	axios.post(config.origin + '/Api/Master/SendRequestToDesigner', {
		userID: req.body.userID || null,
		requestID: JSON.parse(req.body.requestID) || null
	}, config.axiosHeaders(req))
		.then((res2) => {
			res.send(res2.data);
		}).catch((e) => {
		config.sendError(res, e);
	})
});

// 接口-设计师接单设置
router.post('/Member/SetRequestConfig', (req, res, next) => {
	axios.post(config.origin + '/Api/Member/SetRequestConfig', {
		acceptOrder: req.body.acceptOrder || null,
		isFullTime: req.body.isFullTime || null,
		remark: req.body.timeDescribe || null,
		showContact: req.body.showContact || null
	}, config.axiosHeaders(req))
		.then((res2) => {
			res.send(res2.data);
		}).catch((e) => {
		config.sendError(res, e);
	})
});
*/

module.exports = router;
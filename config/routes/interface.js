var express = require('express');
var router = express.Router();
var config = require('../config');
const common = require('../common');
const auth = require('../../middleware/addUser');
var axios = require('axios');
var request = require('request');
var http = require('http');

/*
// 接口-用户首次登陆
router.get('/User/Role', (req, res, next) => {
    axios.get(config.origin + '/Api/User/Role', config.axiosHeaders(req, {
        params: {role: req.query.role}
    }))
        .then(res1 => {
            res.send(res1.data);
        }).catch(e => {
            config.sendError(res, e);
    })
})


// 接口-发送多个需求
router.post('/User/SendRequest', (req, res, next) => {
	axios.post(config.origin + '/Api/User/SendRequest', {
		userID: req.body.userID || null,
		requestID: JSON.parse(req.body.requestID) || null
	}, config.axiosHeaders(req))
		.then((res2) => {
			res.send(res2.data);
		}).catch((e) => {
		config.sendError(res, e);
	})
});

// 接口-设置
router.post('/User/Set', (req, res, next) => {
	axios.post(config.origin + '/Api/User/Set', {
		remark: req.body.remark || null,
		contact: req.body.contact || null
	}, config.axiosHeaders(req))
		.then((res2) => {
			res.send(res2.data);
		}).catch((e) => {
		config.sendError(res, e);
	})
});
*/

module.exports = router;

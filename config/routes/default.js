var express = require('express');
var router = express.Router();
var addUser = require('../../middleware/addUser');
var axios = require('axios');
var config = require('../config');
var common = require('../common');
var localOptions = require('../../build/localOptions');
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5a791f0df6b5690e010750a3/api';

// 首页
router.get('/', addUser, (req, res, next) => {
	axios.all([
		axios.get('/Api/Carous'),
		axios.get('/Api/Cars/Top10', {params: {page: req.query.page || 1}}),
	])
		.then(axios.spread(function (res1, res2){
			config.throwError(next, res1, res2);
			var page = req.query.page || 1;
			res.render('Default/index', {
				title: config.title('首页'),
				keywords: config.keywords,
				description: config.description,
				identity: 0,
				carList: res1.data.Data,
				top10: res2.data.Data.slice((page-1)*3,page*3)
			});
		})).catch(e => {
		config.renderError(req, res, e);
	})
});

module.exports = router;
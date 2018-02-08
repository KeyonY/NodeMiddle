var express = require('express');
var router = express.Router();
var addUser = require('../../middleware/addUser');
var config = require('../config');
var common = require('../common');
var axios = require('../naxios');


// TA的个人主页-设计师-TA的案例
router.get('/', addUser, (req, res, next) => {
	var targetId = req.originalUrl.match(/\/Car(.*?)$/i)[1];
	axios.all([
		axios.get(config.origin + '/Api/Car/Top10', {params:{}}),
	])
		.then(axios.spread(function (res1){
			config.throwError(next, res1);
			res.render('Home/carIndex', {
				title: config.title('Top10排行'),
				keywords: config.keywords,
				identity: 0,
				carList: res1.data.Data,
			});
		})).catch(e => {
		config.renderError(req, res, e);
	})
});

module.exports = router;
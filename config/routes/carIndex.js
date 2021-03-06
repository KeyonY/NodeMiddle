var express = require('express');
var router = express.Router();
var addUser = require('../../middleware/addUser');
var axios = require('../naxios');
var config = require('../config');
var common = require('../common');


// 汽车详情
router.get('/', addUser, (req, res, next) => {
	var targetId = req.originalUrl.match(/\/Car(.*?)$/i)[1];
	axios.all([
		axios.get('/Api/Car/Top10', {params:{}}),
	])
		.then(axios.spread(function (res1){
			config.throwError(next, res1);
			res.render('Home/carIndex', {
				title: config.title('Top10排行'),
				keywords: config.keywords,
				menuNav: 1,
				carList: res1.data.Data,
			});
		})).catch(e => {
		config.renderError(req, res, e);
	})
});

module.exports = router;
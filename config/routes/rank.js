var express = require('express');
var router = express.Router();
var addUser = require('../../middleware/addUser');
var axios = require('../naxios');
var config = require('../config');
var common = require('../common');


// 排行榜
router.get('/', addUser, (req, res, next) => {
	axios.all([
		axios.get('/Api/Cars/Top10', {params:{}}),
	])
		.then(axios.spread(function (res1){
			config.throwError(next, res1);
			res.render('Home/rank', {
				title: config.title('Top10排行'),
				keywords: config.keywords,
				menuNav: 2,
				top10: res1.data.Data,
			});
		})).catch(e => {
		config.renderError(req, res, e);
	})
});

module.exports = router;
'use strict';

var path = require('path');
var axios = require('axios');
var localOptions = require('../build/localOptions');

// BASIC CONFIG
module.exports = {
  // port on which to listen
  port: 8011,
  // root Path
  root: path.resolve(__dirname,'../'),
  // config Path
  configRoot: path.normalize(__dirname),
  // origin
  origin: 'http://127.0.0.1:8011',
  // if debug
  isDebug: process.env.NODE_ENV === 'dev',
  // title
  title: function (title) {
	  return title + '-Keyon Y'
  },
  // keywords
  keywords: 'Keyon Y-前端工程师-xilan.me',
  // description
  description: '专注于HTML5，JavaScript，NodeJS等前端技术，关注前沿技术',
  // set axios.interceptors for request Headers
  axiosHeaders: function (req, obj) {
	if(!req.cookies['token']) {return obj}
	else{
		if(!obj) {return {headers: {'Authorization': 'Bearer ' + req.cookies['token'], "Cookie" : 'ASP.NET_SessionId=' + req.cookies['ASP.NET_SessionId']}, "Referer": localOptions.host};}
		else {
			var result = {headers: {'Authorization': 'Bearer ' + req.cookies['token'], "Cookie" : 'ASP.NET_SessionId=' + req.cookies['ASP.NET_SessionId']}, "Referer": localOptions.host};
			for(var k of Object.keys(obj)){
				result[k] = obj[k];
			}
			return result;
		}
	  }
  },
  // render Error
  renderError: function (req, res, e) {
	  res.render('Error/error', {
		  error: 'Not Found',
		  status: 404,
		  message: 'Not Found'
	  });
  },
  // throw origin error
  throwError: function (next, ...res) {
      for(var v of res){
	      if(v.data.Status != 0){
      		let err = new Error(v.data.Msg || v.data.message);
      		err.status = v.data.Status;
      		next(err);
      		return;
	      }
      }
  },
  sendError: function (res, e) {
      res.send({
          error: 'Not Found',
          status: 404,
          message: 'Not Found'
      })
  }
}
var axios = require('axios');

var http = axios.create({
	baseUrl: 'https://www.easy-mock.com/mock/5a791f0df6b5690e010750a3/api',
	timeout: 1000
})

module.exports = http;
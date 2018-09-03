var datalist = require('./data.json');
var data = {
    '/api/dataList': datalist
}
module.exports = function(url) {
    return JSON.stringify(data[url])
}
module.exports = function (key, dataList) {
    let content = '';
    switch (key) {
        case 'get':
        case 'Get':
            // akos_request_get_{function_name}
            content = require('./template/common.tpl').get(dataList[3]);
            break;
        case 'post':
        case 'Post':
            // akos_request_post_{function_name}
            content = require('./template/common.tpl').post(dataList[3]);
            break;
        default:
            break;
    }
    return content
}
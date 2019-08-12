module.exports = function (key, dataList) {
    let content = '';
    switch (key) {
        case 'table':
        case 'tb':
            // akos_bookshelf_table_{table_name}
            content = require('./template/common.tpl').table(dataList[3]);
            break;
        case 'service':
            // akos_bookshelf_service_{table_name}
            content = require('./template/common.tpl').service(dataList[3]);
            break;
        case 'create':
            // akos_bookshelf_create_{table_name}_{function_name}
            content = require('./template/common.tpl').create(dataList[3], dataList[4]);
            break;
        case 'update':
            // akos_bookshelf_update_{table_name}_{function_name}
            content = require('./template/common.tpl').update(dataList[3], dataList[4]);
            break;
        case 'delete':
        case 'del':
            // akos_bookshelf_delete_{table_name}_{function_name}
            content = require('./template/common.tpl').delete(dataList[3], dataList[4]);
            break;
        case 'retrieve':
            // akos_bookshelf_retrieve_{table_name}_{function_name}
            content = require('./template/common.tpl').retrieve(dataList[3], dataList[4]);
            break;
        default:
            break;
    }
    return content
}
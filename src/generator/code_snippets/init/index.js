module.exports = function (key, dataList) {
    let content = '';
    switch (key) {
        case 'app':
            // akos_init_app
            content = require('./template/app.tpl')();
            break;
        case 'db':
            // akos_init_db
            content = require('./template/db.tpl')();
            break;
        case 'model':
            // akos_init_model_{name}
            const name = dataList[3];
            content = require('./template/model.tpl')(name);
            break;
        default:
            break;
    }
    return content
}
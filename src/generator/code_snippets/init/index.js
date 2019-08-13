module.exports = function (key, dataList) {
    let content = '';
    const name = dataList[3];
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
            content = require('./template/model.tpl')(name);
            break;
        case 'config':
            // akos_init_config
            content = require('./template/config.tpl')();
            break;
        default:
            break;
    }
    return content
}
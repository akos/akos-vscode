module.exports = function (key, data) {
    let content = '';
    switch (key) {
        case 'app':
            // akos_init_app
            content = require('./app.tpl')();
            break;
        case 'db':
            // akos_init_db
            content = require('./db.tpl')();
            break;
        case 'model':
            // akos_init_model_{name}
            const name = data.split('_')[3];
            content = require('./model.tpl')(name);
            break;
        default:
            break;
    }
    return content
}
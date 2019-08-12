// 初始化数据表table结构
module.exports.table = function (tableName) {
    let Template = 'const {{Table_name}} = db.Model.extend({\n' +
        '    // table关联模板\n' +
        '    tableName: \'{{Table_name}}\',\n' +
        '    idAttribute: \'Id\',//primary key，默认Id，自行修改\n' +
        '});';
    Template = Template.replace(/\{\{Table_name\}\}/g, tableName)
    return Template;
}
// 初始化数据库操作service
module.exports.service = function (tableName) {
    let Template = 'const knex = require(\'@/model/db\').knex;\n' +
        'const ipUpHistory = require(\'@/model/local\').{{Table_name}};\n' +
        'const log = require(\'@/utils/logger\').createLogger(\'app:service:{{Table_name}}Db\');\n' +
        'const {{Table_name}}Db = {\n' +
        '    /*\n' +
        '     * 补全数据库实现方法\n' +
        '     */\n' +
        '\n' +
        '};\n' +
        '\n' +
        'module.exports = {{Table_name}}Db;';
    Template = Template.replace(/\{\{Table_name\}\}/g, tableName)
    return Template;
}
// 初始化查询方法retrieve-R
module.exports.retrieve = function (tableName, functionName) {
    if (!tableName)
        tableName = 'model';
    if (!functionName)
        functionName = 'retrieve';
    let Template = '{{Function_name}}(model) {\n' +
        '    return {{Table_name}}.where(model).fetchAll() \n// fetchAll方法获取全部符合条件结果，fetch方法获取符合条件的一个结果，根据需求自定义改造改造\n' +
        '                      .then(info => info && info.toJSON()) // 得到结果集，自定义改造\n' +
        '                      .catch(error => {\n' +
        '                          console.error(error); // 自定义错误处理和日志打印\n' +
        '                          throw error;\n' +
        '                      });\n' +
        '}';
    Template = Template.replace(/\{\{Table_name\}\}/g, tableName)
    Template = Template.replace(/\{\{Function_name\}\}/g, functionName)
    return Template;
}
// 初始化新增方法create
module.exports.create = function (tableName, functionName) {
    if (!tableName)
        tableName = 'model';
    if (!functionName)
        functionName = 'create';
    let Template = '// model为存储的内容，需要匹配相应数据表，否则报错\n' +
        '{{Function_name}}(model) {\n' +
        '    return new {{Table_name}}().save(model).then((info) => info && info.toJSON()).catch((error) => {\n' +
        '        console.error(error);// 自定义错误处理和日志打印\n' +
        '        throw error;\n' +
        '    });\n' +
        '}';
    Template = Template.replace(/\{\{Table_name\}\}/g, tableName)
    Template = Template.replace(/\{\{Function_name\}\}/g, functionName)
    return Template;
}
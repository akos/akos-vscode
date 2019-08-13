module.exports = function (serviceName) {
    let Template = 'const log = require(\'@/utils/logger\').createLogger(\'akos:service:{{Service_name}}\');\n' +
    '/**\n' +
    ' * Service层描述\n' +
    ' */\n' +
    'const {{Service_name}}Service = {\n' +
    '    helloAkos(model) {\n' +
    '        return \'hello Akos!\';\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    'module.exports = {{Service_name}}Service;';
    Template = Template.replace(/\{\{Service_name\}\}/g, serviceName)
    return Template;
}
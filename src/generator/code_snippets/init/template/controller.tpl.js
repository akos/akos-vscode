module.exports = function (controllerName) {
    let Template = 'const log = require(\'@/utils/logger\').createLogger(\'akos:controller:{{Controller_name}}\');\n' +
    '/**\n' +
    ' * Controller层功能描述\n' +
    ' */\n' +
    'module.exports = {\n' +
    '    async helloAkos(ctx) {\n' +
    '        ctx.setBodyContent(200, \'hello Akos!\')\n' +
    '    },\n' +
    '}';
    Template = Template.replace(/\{\{Controller_name\}\}/g, controllerName)
    return Template;
}
module.exports = function () {
    let Template = 'const result = require(\'dotenv\').config();\n' +
    '\n' +
    'if (result.error) { throw new Error(result.error, \'dotevn parse error\'); } else { console.info(\'dotevn parsed envs:  %O\', result.parsed); }\n' +
    'process.env.HOSTNAME = result.parsed.HOSTNAME;\n' +
    '\n' +
    'const config = require(\'config\');\n' +
    'console.log(\'HOSTNAME: %s\', config.util.getEnv(\'HOSTNAME\'));\n' +
    'console.log(\'config %O\', config);\n' +
    '\n' +
    'module.exports = config;\n';
    return Template;
}
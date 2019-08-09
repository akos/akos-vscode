module.exports = function() {
    return '\'use strict\';\n' +
    '\n' +
    'const config = require(\'config\');\n' +
    'const logger = require(\'@/utils/logger\');\n' +
    '\n' +
    'const log = logger.createLogger(\'app:model:db\');\n' +
    'const dbConfig = config.db;\n' +
    '// db\n' +
    '/**\n' +
    ' * 数据库连接\n' +
    ' */\n' +
    'const knex = require(\'knex\')({\n' +
    '    client: \'mysql2\',\n' +
    '    connection: {\n' +
    '        host: dbConfig.host,\n' +
    '        database: dbConfig.database,\n' +
    '        user: dbConfig.user,\n' +
    '        password: dbConfig.password,\n' +
    '        charset: \'utf8\',\n' +
    '    },\n' +
    '    pool: {\n' +
    '        min: 0,\n' +
    '        max: dbConfig.poolSize || 10,\n' +
    '    },\n' +
    '    debug: true,\n' +
    '});\n' +
    '\n' +
    'log.info(`数据库连接：connect to ${dbConfig.host}#${dbConfig.database}`);\n' +
    '\n' +
    'const db = require(\'bookshelf\')(knex);\n' +
    'db.plugin(\'pagination\');\n' +
    'db.plugin(\'registry\');\n' +
    '\n' +
    'module.exports = {\n' +
    '    db,\n' +
    '    knex\n' +
    '};\n';
}
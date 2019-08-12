module.exports = function() {
    return '"use strict";\n' +
    'require(\'module-alias/register\');\n' +
    '// 将.env中配置到环境变量\n' +
    'require(\'../config\');\n' +
    '\n' +
    '// middleware文件夹\n' +
    'const handleCustomCode = require(\'@/plugin/handleCustomCode\');\n' +
    'const cache = require(\'@/plugin/cache\');\n' +
    'const ensureFile = require(\'@/plugin/ensureFile\');\n' +
    'const bunyanLogger = require(\'@uronjs/bunyan-logger\');\n' +
    '// 项目内部其他\n' +
    'const log = require(\'@/utils/logger\').createLogger(\'app\');\n' +
    'const downloadFileSchedule = require(\'@/schedule/downloadFile\');\n' +
    'const routers = require(\'@/routers/index\');\n' +
    '// 公共包\n' +
    'const Koa = require(\'koa\');\n' +
    'const config = require(\'config\');\n' +
    'const koaBody = require(\'koa-better-body\');\n' +
    'const convert = require(\'koa-convert\');\n' +
    'const loadMw = require(\'@/plugin/loadMiddlewares\');\n' +
    '/**\n' +
    ' * 程序入口app，初始化插件，中间件\n' +
    ' * @param options\n' +
    ' * @returns {*}\n' +
    ' */\n' +
    'module.exports = (options) => {\n' +
    '    // 兼容koa1的中间件写法\n' +
    '    const app = new Koa();\n' +
    '\n' +
    '    const _use = app.use;\n' +
    '    app.use = (x) => _use.call(app, convert(x));\n' +
    '    log.important(\'兼容Koa1完-convert中间件完成\');\n' +
    '\n' +
    '    app.keys = config.keys;\n' +
    '\n' +
    '    app.on(\'error\', (error, ctx) => {\n' +
    '        if (!ctx) {\n' +
    '            console.error(\'触发了koa error 事件 [无ctx] message: %s error\', error.message);\n' +
    '        } else {\n' +
    '            const otherInfo = `ctx.reqId: ${ctx.reqId} originalUrl: ${ctx.originalUrl}`;\n' +
    '            error.message += `otherInfo: ${otherInfo}`;\n' +
    '            console.error(\'触发了koa error 事件 message: %s \', error.message);\n' +
    '        }\n' +
    '    });\n' +
    '    log.important(\'全局监听错误初始化完成\');\n' +
    '    // 日志\n' +
    '    app.use(bunyanLogger({\n' +
    '        name: \'icp_v4\',\n' +
    '    }));\n' +
    '    app.use(bunyanLogger.requestIdContext());\n' +
    '    app.use(bunyanLogger.requestLogger());\n' +
    '    log.important(\'加载bunyanLogger初始化中间件完成\');\n' +
    '    // 插件\n' +
    '    cache(app);\n' +
    '    ensureFile();\n' +
    '    // 挂载插件\n' +
    '    handleCustomCode(app);\n' +
    '\n' +
    '    if(config.scheduleOpen){\n' +
    '        downloadFileSchedule.getDowoloadFile();\n' +
    '        log.important(\'定时任务加载开启\');\n' +
    '    }\n' +
    '\n' +
    '    // 正文解析初始化\n' +
    '    app.use(koaBody({\n' +
    '        multipart: true,\n' +
    '        keepExtensions: true,\n' +
    '        strict: false,\n' +
    '\n' +
    '    }));\n' +
    '    log.important(\'加载正文解析初始化中间件完成\');\n' +
    '\n' +
    '    app.use(bunyanLogger.printKoaBetterBody());\n' +
    '    log.important(\'加载bunyanLogger优化中间件完成\');\n' +
    '\n' +
    '    // 插件: 加载自定义中间件 在文件uron.config.js中,配置middlewares\n' +
    '    loadMw(app, options);\n' +
    '\n' +
    '    log.important(\'返回挂载方法初始化完成\');\n' +
    '    // 业务逻辑\n' +
    '    // 定义code方法\n' +
    '    app.use(routers.routes()).use(routers.allowedMethods());\n' +
    '    log.important(\'路由初始化完成\');\n' +
    '    return app;\n' +
    '};\n'
}
module.exports = function (templateName) {
    let Template = 'const bookshelf = require(\'@/model/db\').db;\n' +
        'const {{Template_name}} = require(\'@/model/index\').{{Template_name}};//model引用路径，默认index，自行校正\n' +
        'const log = require(\'@/utils/logger\').createLogger(\'app:service:{{Template_name}}\');\n' +
        '\n' +
        'const {{Template_name}}Db = {\n' +
        '    /**\n' +
        '     * 查询一条记录\n' +
        '     * @param model 为查询条件，格式json如：{id: 0}\n' +
        '     * @returns {Promise<T>}\n' +
        '     */\n' +
        '    find(model) {\n' +
        '        return {{Template_name}}.where(model).fetchAll()\n' +
        '                       .then(info => info && info.toJSON())\n' +
        '                       .catch(error => {\n' +
        '                           log.error(error);\n' +
        '                           throw error;\n' +
        '                       });\n' +
        '    },\n' +
        '    /**\n' +
        '     * 创建或更新记录\n' +
        '     * @param model\n' +
        '     * @returns {Promise<T>}\n' +
        '     */\n' +
        '    createOrUpdate(model){\n' +
        '        return {{Template_name}}.where(\'Id\', model.Id).fetch()\n' +
        '                   .then(info => {\n' +
        '                       if (info) {\n' +
        '                           info.set(model);\n' +
        '                           if (info.hasChanged()) {\n' +
        '                               return info.save()\n' +
        '                           } else {\n' +
        '                               return info;\n' +
        '                           }\n' +
        '                       } else {\n' +
        '                           return new {{Template_name}}().save(model);\n' +
        '                       }\n' +
        '                   })\n' +
        '                   .then(info => info && info.toJSON())\n' +
        '                   .catch(error => {\n' +
        '                       log.error(error);\n' +
        '                       throw error;\n' +
        '                   });\n' +
        '    },\n' +
        '\n' +
        '    // 保存数据-批量处理\n' +
        '    saveList(modelArray) {\n' +
        '        return bookshelf.transaction((t) => {{Template_name}}.collection(modelArray).invokeThen(\'save\', null, {\n' +
        '            // method: \'insert\',//显性，则固定方法，隐性，则支持插入和更新，默认主键\n' +
        '            transacting: t,\n' +
        '            require: false\n' +
        '        }).then((info) => info).catch(error => {\n' +
        '            log.error(error);\n' +
        '            throw error;\n' +
        '        }));\n' +
        '    },\n' +
        '    //\n' +
        '    // 删除记录\n' +
        '    del(model) {\n' +
        '        return {{Template_name}}.query((qb) => {\n' +
        '            qb.where(\'Id\', \'=\', model.Id);\n' +
        '        }).destroy({ require: false }).then((info) => info && info.toJSON()).catch(error => {\n' +
        '            log.error(error)\n' +
        '            throw error;\n' +
        '        });\n' +
        '    },\n' +
        '};\n' +
        'module.exports = {{Template_name}}Db;\n';
    Template = Template.replace(/\{\{Template_name\}\}/g, templateName)
    return Template;
}
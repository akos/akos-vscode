// 初始化get方法
module.exports.get = function (functionName) {
    if(!functionName)
      functionName = 'get'
    let Template = '// rp需要引入request-promise\n' +
    '{{Function_name}}(model) {\n' +
    '    // 请求路径\n' +
    '    const uri = `${config.url}/${model.path}`; // 默认从config中获取请求地址，请求路径作为传参\n' +
    '    const options = {\n' +
    '        method: \'GET\',\n' +
    '        uri,\n' +
    '        json: true,\n' +
    '    };\n' +
    '    if (model.qs)\n' +
    '        options.qs = model.qs;\n' +
    '    return rp(options).then((response) => {\n' +
    '        // 输出请求结果\n' +
    '        console.log(JSON.stringify(response));\n' +
    '        return response;\n' +
    '    }).catch((error) => {\n' +
    '        // 输出错误信息\n' +
    '        console.error(JSON.stringify(error));\n' +
    '        throw error;\n' +
    '    });\n' +
    '},';
    Template = Template.replace(/\{\{Function_name\}\}/g, functionName)
    return Template;
}

// 初始化post方法
module.exports.post = function (functionName) {
    if(!functionName)
      functionName = 'post'
    let Template = '// rp需要引入request-promise\n' +
    '{{Function_name}}(model) {\n' +
    '    const uri = `${config.ownUrl}/${model.path}`;\n' +
    '    let body = {};\n' +
    '     const options = {\n' +
    '        method: \'POST\',\n' +
    '        uri,\n' +
    '        body,\n' +
    '        json: true,\n' +
    '    };\n' +
    '    if (model.body)\n' +
    '        options.body = model.body;\n' +
    '    return rp(options).then((response) => {\n' +
    '        // 输出请求结果\n' +
    '        console.log(JSON.stringify(response));\n' +
    '        return response;\n' +
    '    }).catch((error) => {\n' +
    '        // 输出错误信息\n' +
    '        console.error(JSON.stringify(error));\n' +
    '        throw error;\n' +
    '    });\n' +
    '},';
    Template = Template.replace(/\{\{Function_name\}\}/g, functionName)
    return Template;
}

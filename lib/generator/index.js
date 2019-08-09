const init = require('./code_snippets/init');

module.exports = {
     getSnippets(data) {
        let content = '';
        if (!!data) {
            const dataList = data.split('_');
            const sort = dataList[0];
            const model = dataList[1];
            const key = dataList[2];
            if (sort === 'akos') {
                if (model === 'init') {
                    content = init(key, data);
                }
            }
        }
        const operation = content ? true : false;
        return { operation, content }
    }

};
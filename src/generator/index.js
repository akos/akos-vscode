const init = require('./code_snippets/init');
const bookshelf = require('./code_snippets/bookshelf');
const request = require('./code_snippets/request');
module.exports = {
    getSnippets(data) {
        let content = '';
        // 避开自定义标记符号
        data.replace(/\{/g, '');
        data.replace(/\}/g, '');

        if (!!data) {
            const dataList = data.split('_');
            const sort = dataList[0];
            const model = dataList[1];
            const key = dataList[2];
            if (sort === 'akos') {

                switch (model) {
                    case 'init':
                        content = init(key, dataList);
                        break;
                    case 'bk':
                    case 'bookshelf':
                        content = bookshelf(key, dataList);
                        break;
                    case 'request':
                    case 'rp':
                        content = request(key, dataList);
                        break;

                    default:
                        break;
                }
            }
            const operation = content ? true : false;
            return { operation, content }
        }

    }
}
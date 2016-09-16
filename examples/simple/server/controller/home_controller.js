'use strict';

const api = require('../service/api');

exports.index = function* () {
    try {
        const ids = (yield api.fetchNewTopStories()) || [];
        const res = yield api.fetchItems(ids.slice(0, 15));

        yield this.render('page/home', {
            title: 'Hacker News',
            result: res
        });
    } catch (e) {
        this.throw(404);
    }
};

'use strict';

exports.index = function* () {
    try {
        const renderView = 'page/home';
        let pageData = {
            title: 'Hacker News'
        };

        yield this.render(renderView, pageData);
    } catch (e) {
        this.throw(404);
    }
};

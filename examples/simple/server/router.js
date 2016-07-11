'use strict';

const homeController = require('./controller/home_controller');

const routerRule = function(router) {
    router.get('/', function*() {
        this.body = 'hello';
    });

    // 访问/home
    router.get('/home', homeController.index);
};

module.exports = routerRule;

'use strict';

const Koa = require('koa');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static');
const KncRender = require('../../../index');
const routerRule = require('./router');
const config = require('./config');
const filter = require('./filter/index');
const fs = require('fs');
const logger = console;

// path
const staticPath = config.staticPath;
const viewPath = config.viewPath;
const componentPath = config.componentPath;
const componentDataSource = config.componentDataSource;

let app = new Koa();
let router = koaRouter();
let staticMap = {};

try {
    if (config.mapPath && fs.statSync(config.mapPath)) {
        staticMap = require(config.mapPath);
    }
} catch (e) {
    // logger.error(e);
}

process.on('uncaughtException', function(err) {
    logger.error(`Uncaught exception:${err.stack}`);
});

const kncRender = new KncRender(app, {
    ext: 'html',
    path: viewPath,
    componentPath: componentPath,
    componentDataSource: componentDataSource,
    staticURL: '/combo?',
    staticCombo: true,
    staticMap: staticMap,
    filter: filter,
    nunjucksConfig: {
        autoescape: true,
        watch: true
    }
}, {
    dir: componentPath
});

kncRender.start();

// 路由
routerRule(router);

// 错误处理
app.use(function*(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        logger.error(`[URL]:${this.url},[STACK]:${err.stack}`);
    }
});

app.use(koaStatic(staticPath));
app.use(router.routes()).use(router.allowedMethods());

app.port = parseInt(process.env.PORT, 10) || 5001;
app.startServer = function() {
    app.listen(app.port, function() {
        console.log('server started %d', app.port);
    });
};

if (require.main === module) {
    app.startServer();
}

module.exports = app;

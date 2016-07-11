'use strict';

const path = require('path');
const join = path.join;

/**
 * 配置
 */

module.exports = {
    // 静态资源目录
    staticPath: join(__dirname, '../public'),

    // views目录
    viewPath: join(__dirname, '../views'),

    // components目录
    componentPath: join(__dirname, '../views/components'),

    // 组件数据源目录
    componentDataSource: join(__dirname, './service/components'),

    // 资源表路径
    mapPath: join(__dirname, '../public/map.json'),

    // 日志路径
    logPath: join(__dirname, '../private/log')
};

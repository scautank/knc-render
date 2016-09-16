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

    // data filter
    dataFilter: function(data, extra) {
        extra = extra || {};

        if (extra.name === 'list') {
            return {
                $list: data
            };
        }

        return data;
    },

    // 资源表路径
    mapPath: join(__dirname, '../public/map.json'),

    // 日志路径
    logPath: join(__dirname, '../private/log')
};

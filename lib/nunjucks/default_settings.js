'use strict';

module.exports = {
    // 模板后缀名
    ext: 'html',

    // 模板路径
    path: '',

    // 组件路径
    componentPath: '',

    // 组件默认模板
    componentDefaultTmpl: 'index',

    // 静态资源路径
    staticURL: '/',

    // 静态资源是否开启combo
    staticCombo: false,

    // 静态资源表
    staticMap: {},

    // nunjucks模板过滤器
    filter: {},

    // 数据过滤
    dataFilter: function(data) {
        return data;
    },

    // nunjucks配置
    nunjucksConfig: {}
};

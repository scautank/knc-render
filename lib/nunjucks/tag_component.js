'use strict';

const debug = require('debug')('knc-render:lib:nunjucks:tag_component');
const nunjucks = require('nunjucks');

/**
 * 组件TAG
 * @param {object} options
 */
function Component(options) {
    this.tags = ['component'];

    this.parse = function(parser, nodes) {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true);

        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args, null);
    };

    this.run = function(context, params, callback) {
        const config = options.config;
        const componentName = params.name;
        const dataSource = params.dataSource;
        const data = params.data || {};

        if (!componentName) {
            debug('Component name can not be empty.');
            callback(null, '');
        }

        // 当前组件模板
        const currComponentTmpl = `${config.componentPath}/${componentName}/${config.componentDefaultTmpl}${config.ext}`;

        // 优先通过数据源获取数据渲染
        if (dataSource) {
            // 获取页面全局参数
            const $GLOBAL = context.ctx.$GLOBAL || {};

            try {
                const dataService = require(`${config.componentDataSource}/${dataSource}`);

                dataService($GLOBAL).then(function(res) {
                    debug('Data source render, %s', componentName);

                    const data = {};

                    data[`$${dataSource}`] = res;
                    render(componentName, currComponentTmpl, data, callback);
                }, function(e) {
                    debug('[ERROR] Get data error by the data source, %s', e);
                    callback(null, '');
                });
            } catch (e) {
                debug('[ERROR] Render errors by data source, %s', e);
                callback(null, '');
            }
        } else {
            debug('Data render, %s', componentName);
            render(componentName, currComponentTmpl, data, callback);
        }
    };
}

function render(name, tmpl, data, callback) {
    let renderResult = nunjucks.render(tmpl, data);

    renderResult = `<div data-component-name="${name}">${renderResult}</div>`;
    callback(null, new nunjucks.runtime.SafeString(renderResult));
}

module.exports = Component;

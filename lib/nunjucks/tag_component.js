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
        const dataFilter = config.dataFilter;
        const componentName = params.name;
        const theme = params.theme || 'default';
        const extra = params.extra || {};
        let data = params.data || {};

        if (!componentName) {
            debug('Component name can not be empty.');
            callback(null, '');
        }

        if (typeof dataFilter === 'function') {
            data = dataFilter(data, extra) || {};
        }

        debug('Data render, %s', componentName);

        // 当前组件模板
        const currComponentTmpl = `${config.componentPath}/${componentName}/${config.componentDefaultTmpl}${config.ext}`;
        let renderResult = nunjucks.render(currComponentTmpl, data);

        renderResult = `<div class="${componentName}_${theme}" data-component-name="${componentName}">${renderResult}</div>`;
        callback(null, new nunjucks.runtime.SafeString(renderResult));
    };
}

module.exports = Component;

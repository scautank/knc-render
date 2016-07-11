'use strict';

const debug = require('debug')('knc-render:lib:nunjucks:index');
const path = require('path');
const nunjucks = require('nunjucks');
const utils = require('../utils/');
const injectStatic = require('./inject_static');
const Resource = require('./resource');
const RequireExtension = require('./tag_require');
const ComponentExtension = require('./tag_component');

// default setting
const defaultSettings = require('./default_settings');

/**
 * nunjucks中间件
 * @param {object} config - 配置
 * @return {function}
 */
const koaNunjucks = function(config) {
    config = config || {};
    utils.extend(defaultSettings, config);
    config.path = path.resolve(process.cwd(), config.path);

    if (config.ext) {
        config.ext = `.${config.ext.replace(/^\./, '')}`;
    } else {
        config.ext = '';
    }

    const env = nunjucks.configure(config.path, config.nunjucksConfig);
    const _resource = new Resource({
        staticURL: config.staticURL,
        map: config.staticMap
    });

    env.addExtension('RequireExtension', new RequireExtension({
        resource: _resource
    }));
    env.addExtension('ComponentExtension', new ComponentExtension({
        config: config,
        resource: _resource
    }));

    // add filter
    const filters = config.filter;

    for (let k in filters) {
        if (filters.hasOwnProperty(k)) {
            env.addFilter(k, filters[k]);
        }
    }

    let render = function*(view, context, callback) {
        _resource.reset();

        view += config.ext;
        this.type = 'html';
        this.body = yield new Promise(function(resolve, reject) {
            env.render(view, context, function(err, res) {
                if (err) {
                    debug('[ERROR] Render error, %s', err);
                    return reject('');
                }

                callback && callback();
                resolve(injectStatic(view, res, _resource, config.staticCombo));
                debug('%s rendered', view);
            });
        });
    };

    render.env = env;
    return render;
};

module.exports = koaNunjucks;

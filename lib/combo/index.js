'use strict';

const path = require('path');
const fs = require('fs');
const utils = require('../utils/');
const defaultSettings = require('./default_settings');
const debug = require('debug')('knc-render:lib:combo:index');

/**
 * combo中间件
 * @param {object} config - 配置
 * @return {function}
 */
const koaCombo = function(config) {
    config = config || {};
    utils.extend(defaultSettings, config);

    const staticDir = config.dir || '';

    return function* (next) {
        // /combo?t1.js,t2.js
        const queryStr = this.querystring;

        if (!queryStr) {
            return yield next;
        }

        const files = queryStr.split(',');
        const contents = files.map(function(file) {
            const ext = path.extname(file);
            const realPath = path.join(staticDir, file);

            if (!ext || config.ext.indexOf(ext.substring(1)) === -1) {
                debug('[ERROR] Path error.');
                this.throw(404);
            } else {
                let content = '';

                try {
                    content = fs.readFileSync(realPath, 'utf-8');
                } catch (e) {
                    debug('[ERROR] Read file error.');
                    this.throw(404);
                }
                return content;
            }
        }.bind(this));

        debug('combo service, %s', queryStr);
        this.set('Cache-Control', `public, max-age=${config.maxAge}`);
        this.type = path.extname(files[0]).slice(1);
        this.body = contents.join('\n');
    };
};

module.exports = koaCombo;

'use strict';

const koaMount = require('koa-mount');
const debug = require('debug')('knc-render');

// middleware
const koaNunjucks = require('./lib/nunjucks/index');
const koaCombo = require('./lib/combo/index');
const nunjucksDefaultSettings = require('./lib/nunjucks/default_settings');

class KncRender {
    constructor(koaCtx, tmplOptions, comboOptions) {
        if (typeof koaCtx !== 'object') {
            throw Error('The First argument must be a koa object.');
        }

        this.koaCtx = koaCtx;
        this._tmplOptions = tmplOptions;
        this._comboOptions = comboOptions;
    }

    start() {
        const app = this.koaCtx;

        // template render
        app.context.render = koaNunjucks(this._tmplOptions);
        if (typeof this._comboOptions === 'object' && this._comboOptions) {
            // combo
            const comboURL = (this._tmplOptions.staticURL || nunjucksDefaultSettings.staticURL).replace(/\?$/g, '');

            app.use(koaMount(comboURL, koaCombo(this._comboOptions)));
        }

        debug('knc-render start.');
    }
}

module.exports = KncRender;

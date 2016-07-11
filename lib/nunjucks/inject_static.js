'use strict';

const CONSTANTS = require('./constants');
const debug = require('debug')('knc-render:lib:nunjucks:inject_static');

function injectStatic(key, html, resource, isCombo) {
    let css = '';
    let js = '';
    let stylePos = 0;
    let scriptPos = 0;

    // 是否开启combo
    if (isCombo) {
        css = resource.getStyle();
        js = resource.getScript();
    } else {
        css = resource.getAllStyle();
        js = resource.getAllScript();
    }

    debug('Style output, %s', css);
    debug('Script output, %s', js);

    // 找到第一个STYLE_PLACEHOLDER的位置
    stylePos = html.indexOf(CONSTANTS.STYLE_PLACEHOLDER);
    if (stylePos >= 0) {
        html = html.replace(CONSTANTS.STYLE_PLACEHOLDER, css);
    } else {
        // 没找到就找"</head>"的位置
        stylePos = html.indexOf('</head>');
        if (stylePos >= 0) {
            html = html.substring(0, stylePos) + css + html.substring(stylePos);
        } else {
            html = css + html;
        }
    }

    // 找到第一个SCRIPT_PLACEHOLDER的位置
    scriptPos = html.indexOf(CONSTANTS.SCRIPT_PLACEHOLDER);
    if (scriptPos >= 0) {
        html = html.replace(CONSTANTS.SCRIPT_PLACEHOLDER, js);
    } else {
        // 没找到就找"</body>"的位置
        scriptPos = html.indexOf('</body>');
        if (scriptPos >= 0) {
            html = html.substring(0, scriptPos) + js + html.substring(scriptPos);
        } else {
            html = html + js;
        }
    }

    return html;
}

module.exports = injectStatic;

'use strict';

const RE_SCRIPT = /\.js$/;
const RE_STYLE = /\.css$/;

/**
 * 是否js文件
 * @param {string} fileName
 * @return {boolean}
 */
exports.isScriptFile = function(fileName) {
    return RE_SCRIPT.test(fileName);
};

/**
 * 是否样式文件
 * @param {string} fileName
 * @return {boolean}
 */
exports.isStyleFile = function(fileName) {
    return RE_STYLE.test(fileName);
};

/**
 * 扩展方法（浅拷贝）
 * @param {object}
 * @param {object}
 * @return {object}
 */
exports.extend = function(from, to) {
    to = to || {};
    for (let i in from) {
        if (from.hasOwnProperty(i) &&
            !to.hasOwnProperty(i) &&
            from[i]) {
            to[i] = from[i];
        }
    }
    return to;
};

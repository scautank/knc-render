'use strict';

const utils = require('../utils/');

/**
 * 静态资源处理
 * @param {object} opts
 */
class Resource {
    constructor(opts) {
        this._styles = [];
        this._scripts = [];
        this.options = opts;
    }

    /**
     * 保存静态资源信息
     * @param {string} file
     */
    save(file) {
        if (utils.isScriptFile(file)) {
            saveTo(this._scripts, file);
        } else if (utils.isStyleFile(file)) {
            saveTo(this._styles, file);
        }
    }

    /**
     * 获取所有style路径，非combo
     * @return {string}
     */
    getAllStyle() {
        return this._styles.map(function(style) {
            return `<link rel="stylesheet" href="${this.options.staticURL}${style}" />`;
        }.bind(this)).join('\r\n');
    }

    /**
     * 获取所有script路径，非combo
     * @return {string}
     */
    getAllScript() {
        return this._scripts.map(function(script) {
            return `<script src="${this.options.staticURL}${script}"></script>`;
        }.bind(this)).join('\r\n');
    }

    /**
     * 获取所有style路径，combo
     * @return {string}
     */
    getStyle() {
        if (this._styles.length === 0) {
            return '';
        }

        let files = this.resolve(this._styles);

        if (this.options.map.hasOwnProperty(files)) {
            files = this.options.map[files];
        }
        return `<link rel="stylesheet" href="${files}" />`;
    }

    /**
     * 获取所有script路径，combo
     * @return {string}
     */
    getScript() {
        if (this._scripts.length === 0) {
            return '';
        }

        let files = this.resolve(this._scripts);

        if (this.options.map.hasOwnProperty(files)) {
            files = this.options.map[files];
        }
        return `<script src="${files}"></script>`;
    }

    /**
     * 合并文件路径
     * @param {array} resourceList
     * @return {string}
     */
    resolve(resourceList) {
        const resourceMap = this.options.map;

        return this.options.staticURL + resourceList.map(function(file) {
            return resourceMap[file] || file;
        }).join(',');
    }

    /**
     * 清除数据
     */
    reset() {
        this._scripts = [];
        this._styles = [];
    }
}

/**
 * 保存方法
 * @param {array} list
 * @param {string} item
 */
function saveTo(list, item) {
    if (list.indexOf(item) === -1) {
        list.push(item);
    }
}

module.exports = Resource;

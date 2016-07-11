'use strict';

const api = require('../api');

module.exports = function() {
    return new Promise(function(resolve, reject) {
        api.fetchNewTopStories().then(function(ids) {
            api.fetchItems(ids.slice(0, 15)).then(function(res) {
                resolve(res);
            }, function(e) {
                reject(e);
            });
        }, function(e) {
            reject(e);
        });
    });
};

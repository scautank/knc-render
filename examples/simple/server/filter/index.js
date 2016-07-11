'use strict';

const moment = require('moment');

exports.formatTime = function(time) {
    return moment().format('YYYY-MM-DD HH:m');
};

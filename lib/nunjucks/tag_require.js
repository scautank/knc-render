'use strict';

const debug = require('debug')('knc-render:lib:nunjucks:tag_require');

/**
 * 资源收集TAG
 * @param {object} options
 */
function Require(options) {
    this.tags = ['require'];

    this.parse = function(parser, nodes) {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true);

        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtension(this, 'run', args, null);
    };

    this.run = function(context, path) {
        debug('Add path, %s', path);
        options.resource.save(path);
    };
}

module.exports = Require;

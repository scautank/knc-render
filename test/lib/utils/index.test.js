'use strict';

const should = require('should');
const utils = require('../../../lib/utils/index');

describe('test/lib/utils/index.test.js', function() {
    it('should isScriptFile', function() {
        const scriptFileName = 'test.js';
        const styleFileName = 'test.css';
        let result = utils.isScriptFile(scriptFileName);

        result.should.be.true;
        result = utils.isScriptFile(styleFileName);
        result.should.be.false;
    });

    it('should isStyleFile', function() {
        const scriptFileName = 'test.js';
        const styleFileName = 'test.css';
        let result = utils.isStyleFile(scriptFileName);

        result.should.be.false;
        result = utils.isStyleFile(styleFileName);
        result.should.be.true;
    });

    it('should extend object', function() {
        let parent = {
            foo: 1,
            bar: 2
        };
        let child = {
            a: 1
        };
        let result = utils.extend(parent, child);

        parent.should.have.properties('foo', 'bar');
        child.should.have.properties('foo', 'bar', 'a');
        result.should.have.properties('foo', 'bar', 'a');
    });
});

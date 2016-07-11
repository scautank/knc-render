'use strict';

const koa = require('koa');
const join = require('path').join;
const request = require('supertest');
const should = require('should');
const mount = require('koa-mount');
const koaCombo = require('../../../lib/combo/index');

describe('test/lib/combo/index.test.js', function() {
    const staticDir = join(__dirname, '../../fixtures/public');

    it('should combo js files', function(done) {
        const app = koa();

        app.use(mount('/combo', koaCombo({
            dir: staticDir,
            ext: ['js', 'css']
        })));

        request(app.listen())
            .get('/combo?js/header.js,js/list.js')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                res.text.should.containEql('This is header.');
                res.text.should.containEql('This is list.');
                done();
            });
    });

    it('should combo css files', function(done) {
        const app = koa();

        app.use(mount('/combo', koaCombo({
            dir: staticDir,
            ext: ['js', 'css']
        })));

        request(app.listen())
            .get('/combo?css/header.css,css/list.css')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                res.text.should.containEql('position: relative;');
                res.text.should.containEql('width: 100px;');
                done();
            });
    });

    it('should combo css files failed', function(done) {
        const app = koa();

        app.use(mount('/combo', koaCombo({
            dir: staticDir,
            ext: ['js']
        })));

        request(app.listen())
            .get('/combo?css/header.css,css/list.css')
            .expect(404, done);
    });

    it('should get 404', function(done) {
        const app = koa();

        app.use(mount('/combo', koaCombo({
            dir: staticDir,
            ext: ['js', 'css']
        })));

        request(app.listen())
            .get('/combo')
            .expect(404, done);
    });

    it('should set cache-control headers', function(done) {
        const app = koa();

        app.use(mount('/combo', koaCombo({
            dir: staticDir,
            ext: ['js', 'css'],
            maxAge: 86400
        })));

        request(app.listen())
            .get('/combo?css/header.css,css/list.css')
            .expect('Cache-Control', 'public, max-age=86400')
            .expect(200, done);
    });
});

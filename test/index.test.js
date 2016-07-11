'use strict';

const koa = require('koa');
const join = require('path').join;
const request = require('supertest');
const should = require('should');
const KoaNunjucks = require('../index');

describe('test/index.test.js', function() {
    const staticPath = join(__dirname, './fixtures/public');
    const viewsPath = join(__dirname, './fixtures/views');
    const componentsPath = join(__dirname, './fixtures/views/components');

    it('should render correctly', function(done) {
        const app = koa();
        const koaNunjucks = new KoaNunjucks(app, {
            path: viewsPath,
            componentPath: componentsPath,
            staticCombo: true,
            staticURL: '/combo?'
        });

        koaNunjucks.start();

        app.use(function*() {
            yield this.render('home');
        });

        request(app.listen())
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                res.text.should.containEql('Hello! This is header component.');
                res.text.should.containEql('Hello! This is list component.');
                done();
            });
    });

    it('should render combo', function(done) {
        const app = koa();
        const koaNunjucks = new KoaNunjucks(app, {
            path: viewsPath,
            componentPath: componentsPath,
            staticCombo: true,
            staticURL: '/combo?'
        });

        koaNunjucks.start();

        app.use(function*() {
            yield this.render('home');
        });

        request(app.listen())
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                res.text.should.containEql('/combo?css/header.css,css/list.css');
                res.text.should.containEql('/combo?js/header.js,js/list.js');
                done();
            });
    });
});

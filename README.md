# knc-render

基于koa和nunjucks的服务端组件化渲染方案

----

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/knc-render.svg
[npm-url]: https://npmjs.org/package/knc-render
[travis-image]: https://img.shields.io/travis/scautank/knc-render.svg
[travis-url]: https://travis-ci.org/scautank/knc-render
[downloads-image]: http://img.shields.io/npm/dm/knc-render.svg
[downloads-url]: https://npmjs.org/package/knc-render

## 特性

- 基于koa和nunjucks
- 组件化开发

## 安装

```bash
  npm install knc-render --save
```

## 使用

#### 启动

```text
// template render
const app = new Koa();
const KncRender = require('knc-render');

const kncRender = new KncRender(app, {
    ext: 'html', // 模板后缀名
    path: '', // 模板路径
    componentPath: '', // 组件路径
    componentDataSource: '', // 组件数据源路径
    componentDefaultTmpl: 'index', // 组件默认模板
    staticURL: '/combo?', // 静态资源路径
    staticCombo: true, // 静态资源是否开启combo
    staticMap: {}, // 静态资源表
    filter: {}, // nunjucks模板过滤器
    nunjucksConfig: { // nunjucks配置
        autoescape: true,
        watch: true
    }
}, {
    dir: '', // 读取文件目录
    ext: ['js', 'css'], // 允许读取文件的后缀名
    maxAge: 60 * 60 * 1000 // 缓存时间，默认一天
});

kncRender.start();
```

#### require

```text
关闭combo的时候，require进来的资源为staticURL目录下的文件
打开combo的时候，require进来的资源应该是dir目录下的，包含在ext里面的后缀名的文件
{% require "c_list/index.js" %}
```

#### component

component可以有3个参数，name,data,dataSource

```text
{% component name="c_list",dataSource="list" %}
这种情况会找componentPath目录下的c_list目录下的[componentDefaultTmpl.ext]文件，并且执行componentDataSource下的list文件暴露出来的方法（必须返回一个promise对象），拿到数据之后再渲染
```

```text
{% component name="c_list",data="" %}
这种情况会找componentPath目录下的c_list目录下的[componentDefaultTmpl.ext]文件，并且直接拿data来进行渲染
```

#### 资源表格式

```text
{
    "css/header.css": "css/header-423dsdol",
    "js/header.js": "js/header-gk34o1k3" 
}
```

## 组件规范

```text
- c_header
 |- images
 |- scss
 |- js
 |- index.html
 |- index.scss
 |- index.js
 |- schema.json
```

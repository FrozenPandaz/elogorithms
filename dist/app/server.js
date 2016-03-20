"use strict";
var path = require('path');
var express = require('express');
require('angular2-universal-preview/polyfills');
var angular2_universal_preview_1 = require('angular2-universal-preview');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var html_component_1 = require('./server-only-app/html.component');
var app = express();
var root = path.join(path.resolve(__dirname, '..'));
core_1.enableProdMode();
app.engine('.html', angular2_universal_preview_1.expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');
function ngApp(req, res) {
    var baseUrl = '/';
    var url = req.originalUrl || '/';
    res.render('index', {
        directives: [html_component_1.Html],
        providers: [
            core_1.provide(router_1.APP_BASE_HREF, { useValue: baseUrl }),
            core_1.provide(angular2_universal_preview_1.REQUEST_URL, { useValue: url }),
            router_1.ROUTER_PROVIDERS,
            angular2_universal_preview_1.NODE_LOCATION_PROVIDERS,
            angular2_universal_preview_1.NODE_PRELOAD_CACHE_HTTP_PROVIDERS,
        ],
        async: false,
        preboot: false
    });
}
app.use(express.static(root, { index: false }));
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);
app.listen(3000, function () {
    console.log('Listen on http://localhost:3000');
});

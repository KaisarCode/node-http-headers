var hdr = {};
var mimes = require('kc-mime-list');
var ctype = require('kc-fctype');

// Set content type
hdr.ctype = function(res, type = 'html', chs = 'utf-8') {
    var fl = 'f.'+type;
    var ctv = ctype(fl, mimes);
    ctv += '; charset='+chs;
    res.setHeader('Content-Type', ctv);
}

// Cors
hdr.cors = function(res, orig = '*') {
    res.setHeader('Access-Control-Allow-Origin', orig);
}

// No index
hdr.noIndex = function(res) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
}

// No cache
hdr.noCache = function noCache(res) {
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache', 'no-cache');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('Expires', 'Mon, 01 Jan 1970 00:00:00 GMT');
}

// Redirect
hdr.redirect = function(res, url) {
    var url = url || '/';
    res.setHeader('Refresh', '0; URL='+url);
}

// Status 200
hdr.ok =
hdr.set200 =
function(res) {
    res.statusCode = 200;
    res.statusMessage = 'Ok';
}

// Status 301
hdr.moved =
hdr.set301 =
function(res) {
    res.statusCode = 301;
    res.statusMessage = 'Moved Permanently';
}

// Status 400
hdr.badRequest =
hdr.set400 =
function(res) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
}

// Status 401
hdr.unauthorized =
hdr.set401 =
function(res) {
    res.statusCode = 401;
    res.statusMessage = 'Unauthorized';
}

// Status 403
hdr.forbidden =
hdr.set403 =
function(res) {
    res.statusCode = 403;
    res.statusMessage = 'Forbidden';
}

// Status 404
hdr.notFound =
hdr.set404 =
function(res) {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
}

// Status 405
hdr.methodNotAllowed =
hdr.set405 =
function(res) {
    res.statusCode = 405;
    res.statusMessage = 'Method Not Allowed';
}

// Status 413
hdr.requestTooLarge =
hdr.set413 =
function(res) {
    res.statusCode = 413;
    res.statusMessage = 'Request Entity Too Large';
}

// Status 500
hdr.serverError =
hdr.set500 =
function(res) {
    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';
}

// Status 503
hdr.serviceUnavailable =
hdr.set503 =
function(res) {
    res.statusCode = 503;
    res.statusMessage = 'Service Unavailable';
}

// Cookie
hdr.setCookie = function(res, k, v = '', opt) {
    opt = opt || {};
    var cfg = [];
    opt.path = opt.path || '/';
    cfg.push('Path='+opt.path);
    if (
    typeof opt.sameSite == 'undefined'
    || opt.sameSite === true
    || opt.sameSite === 1
    ) opt.sameSite = 'strict';
    if (
    opt.sameSite === false ||
    opt.sameSite === 0) opt.sameSite = 'none';
    cfg.push('SameSite='+opt.sameSite);
    if (opt.secure) cfg.push('Secure');
    if (opt.domain) cfg.push('Domain='+opt.domain);
    if (opt.maxAge) cfg.push('Max-Age='+opt.maxAge);
    if (opt.httpOnly) cfg.push('HttpOnly');
    cfg = cfg.join(';');
    res.setHeader('Set-Cookie', k+'='+v+';'+cfg);
}

// Set CSP
hdr.csp = function(res, v) {
    if (v == 'lax') {
        var s =
        "default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval';"+ 
        "script-src * data: blob: 'unsafe-inline' 'unsafe-eval';"+
        "connect-src * data: blob: 'unsafe-inline';"+
        "img-src * data: blob: 'unsafe-inline';"+
        "frame-src * data: blob: ;"+
        "style-src * data: blob: 'unsafe-inline';"+
        "font-src * data: blob: 'unsafe-inline';";
    } else {
        if (typeof v['default-src'] == 'undefined')
        v['default-src'] = v['default-src'] || ["'self'"];
        if (typeof v['script-src'] == 'undefined')
        v['script-src'] = v['script-src'] || ["'self'", "'unsafe-inline'"];
        if (typeof v['style-src'] == 'undefined')
        v['style-src'] = v['style-src'] || ["'self'", "'unsafe-inline'"];
        if (typeof v['font-src'] == 'undefined')
        v['font-src'] = v['font-src'] || ["'self'"];
        if (typeof v['img-src'] == 'undefined')
        v['img-src'] = v['img-src'] || ["'self'", "data:"];
        if (typeof v['connect-src'] == 'undefined')
        v['connect-src'] = v['connect-src'] || ["'self'"];
        if (typeof v['frame-src'] == 'undefined')
        v['frame-src'] = v['frame-src'] || ["'self'"];
        if (typeof v['frame-ancestors'] == 'undefined')
        v['frame-ancestors'] = v['frame-ancestors'] || ["'none'"];
        var s = '';
        for (var i in v) {
        s += i;
        v[i].forEach(function(a){
            s += ' '+a;
        }); s += ';'; }
    }
    res.setHeader('Content-Security-Policy', s);
}

// Export
module.exports = hdr;

# HTTP Headers
[nodejs] HTTP response headers.

### Install
```
npm install kc-headers
```

### Use
```js
var http = require('http');
var hdr = require('kc-headers');
http.createServer(function(req, res){
    
    hdr.csp(res);
    hdr.cors(res);
    hdr.noCache(res);
    hdr.noIndex(res);
    hdr.ctype(res, 'html');
    hdr.setCookie(res, 'test', 1);
    
}).listen(8888);
```

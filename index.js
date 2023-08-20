var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var filename = 'index.html';
    var q = url.parse(req.url, true)
    if (q.pathname.length > 1) {
        var pagename = q.pathname.slice(1);
        filename = pagename + ".html";
    }

    if (filename !== 'index.html' && filename !== 'about.html' && filename !== 'contact-me.html') {
        fs.readFile('404.html', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write('404 Not Found');
                return res.end()
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write('404 Not Found');
                return res.end()
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }

}).listen(3000);
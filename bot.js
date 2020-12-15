var fs = require('fs');

var token;

fs.readFile('token.txt', 'utf8', function(err, data) {
        if (err) throw err;
        token = data;
});

var fs = require('fs');

fs.readFile('token.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
});

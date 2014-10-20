var http = require('http')
  , fs = require('fs')
  , options = {
      host: 'news.watchout.tw',
      path: '/tagged/市長給問嗎',
      method: 'GET'
    };

http.get(options, function(response) {
  var bodyChunks = [];
  response.on('data', function(chunk) {
      bodyChunks.push(chunk);

  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    //console.log('BODY: ' + body);
    fs.writeFileSync('data/index.html', body);

  });
  //process DOM
  response.on('error', function(err) {
    res.send('error: ' + err.message);
  });
});
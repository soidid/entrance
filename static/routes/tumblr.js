var http = require('http'),
    cheerio = require('cheerio');


exports.index = function(req, res){

  var options = {
      host: 'news.watchout.tw',
      path: '/tagged/市長給問嗎',
      method: 'GET'
  };
  var request = http.get(options, function(response) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      var bodyChunks = [];
      response.on('data', function(chunk) {
          bodyChunks.push(chunk);

      }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          //console.log('BODY: ' + body);
          $ = cheerio.load(body);

          //console.log($.html('#posts'));
          $('#blog_main_title').text("市長，給問嗎？新聞頻道");
          $('#musou_link').remove();
          $('.nav-menu').remove();

          $('.read_more').each(function (i, elem) {
              // reset link
              $(this).attr('href', '/news/'+$(this).attr('href').split('post/')[1]);
          });

          var parsedDOM = $.html('');
          //send processed DOM
          return res.render('news', { data:parsedDOM });

      })
      //process DOM
      response.on('error', function(err) {
          res.send('error: ' + err.message);
      });



  });



};

exports.post = function(req, res){
  var path;
  var name = req.params.news_id;
  var sub_id = req.params.sub_id;
  if(sub_id) {
    path = '/post/'+name+'/'+sub_id;
  } else {
    path = '/post/'+name;
  }
  var options = {
      host: 'news.watchout.tw',
      path: path,
      method: 'GET'
  };
  console.log(name);
  var request = http.get(options, function(response) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      var bodyChunks = [];
      response.on('data', function(chunk) {
          bodyChunks.push(chunk);

      }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          //console.log('BODY: ' + body);
          $ = cheerio.load(body);

          //console.log($.html('#posts'));
          $('#blog_main_title').text("市長，給問嗎？新聞頻道");
          $('.nav-menu').remove();
          //$('.read_more')

          var parsedDOM = $.html('');
          //send processed DOM
          return res.render('news', { data:parsedDOM });

      })
      //process DOM
      response.on('error', function(err) {
          res.send('error: ' + err.message);
      });


  });



};

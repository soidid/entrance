var http = require('http'),
    fs = require('fs')
    cheerio = require('cheerio');


exports.index = function(req, res){
  fs.readFile('data/index.html', function (err, data){
    var $ = cheerio.load(data.toString());
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
  });
};

exports.post = function(req, res){
  var path;
  var name = req.params.news_id;
  var sub_id = req.params.sub_id;
  if(fs.existsSync('data/posts/' + name + '.html')){
    fs.readFile('data/posts/' + name + '.html', function (err, data) {
      $ = cheerio.load(data.toString());
      //console.log($.html('#posts'));
      $('#blog_main_title').text("市長，給問嗎？新聞頻道");
      $('.nav-menu').remove();
      //$('.read_more')

      var parsedDOM = $.html('');
      //send processed DOM
      return res.render('news', { data:parsedDOM });
    });
  } else {
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
            if(!fs.existsSync('data/posts')) {
              fs.mkdirSync('data/posts');
            }
            fs.writeFileSync('data/posts/' + name + '.html', body);
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
  }
};

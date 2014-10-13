var express = require('express'),
    tumblr = require('./routes/tumblr'),
    http = require('http'),
    path = require('path');
    

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/news', tumblr.index);
app.get('/news/:news_id', tumblr.post);
app.get('/news/:news_id/:sub_id', tumblr.post);
app.get('/', function(req, res){
	return res.render('index');
	
});

app.listen(app.get('port') , function () {
  console.log('Express server listening on port ' + app.get('port'));
});


/*
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
*/
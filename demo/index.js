var express = require('express');
var fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5029))
app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('*', function(req,res,next) {
  templateData = {
    global_env: {}
  }
  res.render('index', templateData);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

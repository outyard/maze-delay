var express = require('express');
var app = express();
var http = require('http').createServer(app);
var delay = 500;

app.use(express.static(__dirname + '/'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
http.listen(port, function(){
  console.log('listening on port ' + port);
});

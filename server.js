var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var delay = 500;

app.use(express.static(__dirname + '/'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
http.listen(port, function(){
  console.log('listening on port ' + port);
});

io.on('connection', function(socket){
  console.log('connection');

  socket.on('buttonPress', (button) => {
    setTimeout(function() {
      socket.broadcast.emit('buttonPress', button);
    }, delay);
  });

  socket.on('restart', (data) => {
    setTimeout(function() {
      socket.broadcast.emit('restart', data);
    }, delay);
  });

  socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
      socket.connect();
    }
    else{
      console.log('disconnect');
    }
  });
});

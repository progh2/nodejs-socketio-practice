// 모듈을 추출합니다.
var http = require('http');
var fs = require('fs')
var socketio = require('socket.io');

// 웹 서버를 생성합니다.
var server = http.createServer(function (request, response){
  // HTMULPage.html 파일을 읽습니다.
  fs.readFile('HTMLPage.html', function( error, data){
    response.writeHead(200, { 'Content-Type':'text/html'});
    response.end(data);
  });
}).listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000');
});

// 소켓 서버를 생성 및 실행
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
  // hello 이벤트
  socket.on('hello', function(data){
    // 클라이언트가 전송한 데이터를 출력합니다.
    console.log('Client Send data:', data);

    // 클라이언트에 smart 이벤트를 발생시킵니다.
    //io.sockets.emit('smart', data); // public
    socket.broadcast.emit('smart', data);
    //socket.emit('smart', data);
  })
});

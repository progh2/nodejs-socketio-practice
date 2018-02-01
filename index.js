// 모듈을 추출합니다.
var http = require('http');
var fs = require('fs')
var socketio = require('socket.io');

// 웹 서버를 생성합니다.
var server = http.createServer();
// 소켓 서버를 생성 및 실행
var io = socketio.listen(server);
  var roomName = null;
server.listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000');
});

// 웹 서버 이벤트를 연결합니다.
server.on('request', function (request, response){
  // HTMULPage.html 파일을 읽습니다.
  fs.readFile('HTMLPage.html', function( error, data){
    response.writeHead(200, { 'Content-Type':'text/html'});
    response.end(data);
  });
});

io.sockets.on('connection', function(socket){
  // 방 이름을 저장할 변수


  // join 이벤트
  socket.on('join', function(data){
    console.log('방 조인! : ' + data);
    roomName = data;
    socket.join(data);
  });

  // messasge 이벤트
  socket.on('message', function(data){
    console.log(':::'+roomName + ' message event! : ' + data );
    io.sockets.in(roomName).emit('message', data);
  });
});

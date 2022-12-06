const express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const {
   handleConnect,
   handleConnecting,
   handleDisconnect,
   handleConnect_failed,
   handleError,
   handleMessage,
   handleReconnect,
   handleReconnecting,
   handleReconnect_failed,
} = require('./error');

const {
   initUserConnect,
   releaseUserConnect,
   changeUsername,
   joinRoom,
   recvMsg
} = require('./proc');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

io.on('connection', function(socket){
   
   let username = "";

   username = initUserConnect(io.sockets, socket);

   socket.on('change_username', function(data){ username = changeUsername(io.sockets, socket, username, data);});
   socket.on('join_room', function(data){ joinRoom(io.sockets, socket, username, data);});
   socket.on('custom_msg', function(data){ recvMsg(io.sockets, socket, username, data);});

   socket.on('connect', handleConnect);
   socket.on('connecting', handleConnecting);
//   socket.on('disconnect', handleDisconnect);
   socket.on('disconnect', function(data){ releaseUserConnect(io.sockets, socket, username);});
   socket.on('connect_failed', handleConnect_failed);
   socket.on('error', handleError);
   socket.on('message', handleMessage);
   socket.on('reconnect', handleReconnect);
   socket.on('reconnecting', handleReconnecting);
   socket.on('reconnect_failed', handleReconnect_failed);   
});

http.listen(3000, function(){
   console.log('listening on localhost:3000');
});
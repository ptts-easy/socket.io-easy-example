var socket = io();
var g_username = "";

socket.on('connect', handleConnect);
socket.on('connecting', handleConnecting);
socket.on('disconnect', handleDisconnect);
socket.on('connect_failed', handleConnect_failed);
socket.on('error', handleError);
socket.on('message', handleMessage);
socket.on('reconnect', handleReconnect);
socket.on('reconnecting', handleReconnecting);
socket.on('reconnect_failed', handleReconnect_failed);

socket.on('username', recvUsername);
socket.on('update_users', recvUserList);
socket.on('custom_error', recvCustomError);
socket.on('custom_message', recvCustomMessage);


function recvCustomMessage(msg) {

   console.log(msg);

  const sender = msg.username;
  const message = msg.message;

﻿  let recv_msg = document.getElementById('recv_msg');

  let formed_msg = "";

  if (g_username == sender) {
    formed_msg = `<div style="text-align:right;"><b>${sender}</b><br>${message}&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
  } else {
    formed_msg = `<div style="text-align:left;"><b>${sender}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;${message}</div>`;
  }

  recv_msg.innerHTML += formed_msg;
}

function recvUsername(username) {
   g_username = username;
   document.getElementById('user_name').value = username;
}

function recvCustomError(message) {
   console.log(`%c${message.type} `, "color:red", message.data);
   alert(message.data);
}

function recvUserList(username_list) {

   const old_recverlist = getRecvers();

   let html_userlist = "";

   for (let user_item of username_list) {

      const user_id = `${user_item.roomname}::${user_item.username}`;
      let input_value, input_check;

      let html_username;

      if (user_item.roomname == "room") {
         input_value = "room";
      } else if (user_item.username == "*") {
         input_value = "*";
      } else {
         input_value = user_item.username;
      }

      if (old_recverlist.indexOf(input_value) >= 0) {
         input_check = "checked";
      } else {
         input_check = "";
      }

      html_username= `<li class="list-group-item">
                        <input type="checkbox" class="form-check-input" id="${user_id}" name="${user_id}" value="${input_value}" ${input_check}>
                        <label class="form-check-label" for="${user_id}">${user_id}</label>
                     </li>`;

      html_userlist += html_username;
   }

   document.getElementById('user_list').innerHTML = html_userlist;
}

function changeUsername() {
   const username = document.getElementById('user_name').value;
   socket.emit('change_username', username);
}

function joinRoom() {
   const roomname = document.getElementById('room_name').value;
   socket.emit('join_room', roomname);
}

function getRecvers() {
   const user_list = document.getElementById('user_list');

   const users = user_list.getElementsByTagName('input'); 

   const recvers = [];

   for (let key in users) {
      const user = users[key];
      if (user.checked == true) {
         recvers.push(user.value);
      }
   }

   return recvers;
}

function sendMessage() {
   const msg = document.getElementById('send_msg').value;

   if (msg == "") {
      alert("to send message is empty.");
      return;
   }

   const recvers = getRecvers();

   socket.emit('custom_msg', {recvers:recvers, msg:msg});
}

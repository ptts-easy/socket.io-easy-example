
function handleConnect() {
    console.log("\x1b[34m%s\x1b[0m", "Connect ...");
}

function handleConnecting() {
    console.log("\x1b[34m%s\x1b[0m", "Connecting ...");
   console.log("Connecting ...");
}

function handleDisconnect() {
    console.log("\x1b[31m%s\x1b[0m", "Disconnect ...");
}

function handleConnect_failed() {
    console.log("\x1b[31m%s\x1b[0m", "Connect_failed ...");
}

function handleError() {
    console.log("\x1b[31m%s\x1b[0m", "Error ...");
}

function handleMessage() {
    console.log("\x1b[32m%s\x1b[0m", "Message ...");
}

function handleReconnect() {
    console.log("\x1b[34m%s\x1b[0m", "Reconnect ...");
}

function handleReconnecting() {
    console.log("\x1b[34m%s\x1b[0m", "Reconnecting ...");
}

function handleReconnect_failed() {
    console.log("\x1b[31m%s\x1b[0m", "Reconnect_failed ...");
}

module.exports = {
  handleConnect, 
  handleConnecting, 
  handleDisconnect, 
  handleConnect_failed, 
  handleError, 
  handleMessage, 
  handleReconnect, 
  handleReconnecting, 
  handleReconnect_failed
};
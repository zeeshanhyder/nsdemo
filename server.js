const WebSocket = require('ws');
const fs = require('fs');

// WebSocket Handler
const ws = new WebSocket('ws://localhost:9001',{
  perMessageDeflate: false
});

// WebSocket Server
const wsServer = new WebSocket.Server({
  port: 9001
});



/*
*
* Function definitions
*
*/

function incomingMessageHandler(payload){
  //handle payload here
  console.log(payload);
}


function sendWelcomeCSV(){
  //read or generate a csv file and pass that on
  return 'Hello!';
}

function sendCSVFile(connection){
  fs.readFile('MOCK.csv', 'utf8', function(err, data){
      if(err){
        console.log('FILE_READ_ERROR');
        return;
      }

      connection.send(data,{binary:true});
      console.log('CSV_TRANSFER_COMPLETE');
  });
}

function newConnection(connection){
  //handle connection
  console.log('WS_CONNECTION_OK');
  connection.on('message', incomingMessageHandler);
  sendCSVFile(connection);
}


// definitions end



// on connection open
ws.on('open', function(){
  console.log('WS_INIT_OK');
});


// on connection
wsServer.on('connection', newConnection);

wsServer.on('close', function(){
  console.log('WS_CONNECTION_CLOSE');

})

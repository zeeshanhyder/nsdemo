const WebSocket = require('ws');
const fs = require('fs');
var express = require('express');


//create web server to serve our client websocket html file
var http = express();

// use static files
http.use(express.static('public'))

http.get('/', function(req,res){
  res.send('<div><p>Client is available at: <b>/client</b><p>Server is available at: <b>ws://127.0.0.1:9001</b></p></div>');
});


//Fire up webserver
http.listen(9000, function () {
  console.log('INFO: Webserver fired up on port 9000');
})

// WebSocket Handler
const ws = new WebSocket('ws://localhost:9001',{
  perMessageDeflate: false
}, function(){
  console.log('INFO: WebSocket Server fired up on port 9001')
});

// Fire up WebSocket server
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


function sendCSVFile(connection){
  // fs.readFile('MOCK.csv', 'utf8', function(err, data){
  //     if(err){
  //       console.log('FILE_READ_ERROR');
  //       return;
  //     }
  //
  //     connection.send(data,{binary:true});
  //     console.log('CSV_TRANSFER_COMPLETE');
  // });

  var stream = fs.createReadStream('MOCK.csv');
  stream.on('data', (chunk)=>{
    connection.send(chunk, {binary: true});
  });
  stream.on('end',()=>{
    console.log('INFO: CSV_TRANSFER_COMPLETE_OK');
  });
}

function newConnection(connection){
  //handle connection
  console.log('INFO: WS_CONNECTION_OK');
  connection.on('message', incomingMessageHandler);
  sendCSVFile(connection);
}


// definitions end



// on connection open
ws.on('open', function(){
  console.log('INFO: WS_INIT_OK');
});


// on connection
wsServer.on('connection', newConnection);

wsServer.on('close', function(){
  console.log('WS_CONNECTION_CLOSE');

})

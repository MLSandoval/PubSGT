
const express = require('express');
const fs = require('fs');

const server = express();

//this creates an endpoint that allows us to load all the files from the html folder
const htmlDirectory = __dirname + '/html';
const staticMiddlewareFunction = express.static(htmlDirectory);

server.use(staticMiddlewareFunction);

//endpoint training wheels, no real function to this 
server.get('/myFirstEndpoint', function(request, response){
    console.log('this is your endpoint. bro. sick.' + request.url);
    response.send('this is your endpoint. bro. sick: ' + Date.now());
});

server.get('/getstudents', function(request,response){
    const data = fs.readFileSync(__dirname + '/dummydata/getstudents.json');
    response.send(data);
});

server.listen(3001, function(){
    console.log('listened to port 3001 successfully.');
    //response.send('listened to port 3001 successfully.');
});


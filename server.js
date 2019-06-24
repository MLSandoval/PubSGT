
const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const creds = require('./mysql_credentials.js');

const db = mysql.createConnection(creds);

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

server.get('/getstudents', function(request, response){
    db.connect(function(){
        var query = "SELECT * FROM `grades`";
        db.query(query, function(error, data, fields){
            if(!error){
                response.send({
                    success: true,
                    data
                })
            }else{
                console.log('error: ', error);
            }
        })
    });
    // dummyData example to make endpoint work from local file instead of a database
    // const data = fs.readFileSync(__dirname + '/dummydata/getstudents.json');
    // response.send(data);
});

server.listen(3001, function(){
    console.log('listened to port 3001 successfully.');
    //response.send('listened to port 3001 successfully.');
});

// server.read('/readstudents', function(request, response){
//     const mysql = fs.readFileSync(__dirname + '/')
//     response.send(data);
// });
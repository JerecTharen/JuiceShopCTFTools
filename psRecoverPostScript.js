//config vars
const fs = require('fs');
const http = require('http');
const events = require('events');

const basePath = 'http://juice-shop-jerec.herokuapp.com';
const postPath = 'http://juice-shop-jerec.herokuapp.com/rest/user/reset-password?';

class Emitter extends events{}
const main = new Emitter();

function callEnd(){
    console.log('Script Has Ended. General Kenobi!!');
}

///Main program
///Summary: Code to execute if site is online
try{
    main.on('siteOnline', ()=>{
    let formSub = http.request({
        host: postPath,
        method: 'POST'
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
        formSub.write();
        formSub.end();
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
}

catch(ex){
    console.error(ex);
    callEnd();
}





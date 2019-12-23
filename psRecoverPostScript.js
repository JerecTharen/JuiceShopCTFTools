//config vars
const fs = require('fs');
const http = require('http');
const events = require('events');

//live path
const basePath = 'http://juice-shop-jerec.herokuapp.com';
//localhostpath
// const basePath = 'http://localhost:3000';
const postPath = '/rest/user/reset-password';
//Make sure to update this with your cookie
const cookie='io=xffIPIctIzrNVCJAAAAK; language=en';
// const cookie = 'Cookie: language=en; cookieconsent_status=dismiss; continueCode=vN1kmKJEbPR98Nvwken713oW6yBG2bHbGlmrXMQaYVZgjO4qLxp5zD2VbR7g; io=ETWUBhKZj3aWfp0jAAAA';

let mainRan = false;

class Emitter extends events{}
const main = new Emitter();

function callEnd(){
    console.log('Script Has Ended. General Kenobi!!');
}

//Form Data to submit
const data = JSON.stringify({
    email:"test@test.com",
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
        let postOptions = {
            host: basePath,
            path: postPath,
            method: 'POST',
            port: 80,
            headers: {
                'Contenet-Type': 'application/json, text/plain, */*',
                'Content-Length': data.length,
                'Cookie': cookie,
                'Connection': 'keep-alive',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate'
            }
        };
        mainRan = true;
        let formSub = http.request(postOptions, (postResp)=>{
            if(postResp.statusCode === 200)
            {
                console.log('Post Successful');
            }
            else{
                console.log('recieved status', postResp.statusCode);
            }
        });
        formSub.on('data', (formData)=>{
            console.log('data from post:', formData);
        });

        //For some reason the enotfound error does not show up with this
        //so comment it out to see the error
        formSub.on('error', (err)=>{
            console.error('error in post:'. err);
            callEnd();
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
        //Use this to see what html is returned from ping
        //console.log('web chunk', chunk.toString());
        main.emit('siteOnline');
    });
});

//This submits the http request
req.end();





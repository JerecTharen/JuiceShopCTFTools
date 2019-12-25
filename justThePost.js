const basePath = 'http://localhost:3000';
const postPath = '/rest/user/reset-password';
const http = require('http');

//Form Data to submit
const data = JSON.stringify({
    email:"test@test.com",
    answer:"test",
    new:"test123",
    repeat:"test123"
});

let postOptions = {
    host: basePath,
    path: postPath,
    method: 'POST',
    port: 80,
    headers: {
        'Contenet-Type': 'application/json, text/plain, */*',
        'Content-Length': data.length,
        // 'Cookie': cookie,
        // 'Connection': 'keep-alive',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate'
    }
};

let formSub = http.request(postOptions, (postResp)=>{
    if(postResp.statusCode === 200)
    {
        console.log('Post Successful');
    }
    else{
        console.log('recieved status:', postResp.statusCode);
    }
});
formSub.on('data', (formData)=>{
    console.log('data from post:', formData);
});

//For some reason the enotfound error does not show up with this
//so comment it out to see the error
// formSub.on('error', (err)=>{
//     console.error('error in post:'. err);
// });


console.log('submitting post');
formSub.write(data);
formSub.end();
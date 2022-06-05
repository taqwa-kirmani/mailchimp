const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var fname = req.body.firstname;
    var lname = req.body.secondname;
    var email = req.body.email;

    var data = {
        members : [
           { email_adress : email,
            Status : "subscribed",
            merge_fields : {
                FNAME : fname,
                LNAME : lname
            }
          } 
        ]
    };
    var jsondata = JSON.stringify(data);
    const url = "server_prefix+68b57b419c531778fe64d766d06e05e2-us13";
    const options = {
        method : "POST",
        auth : "Taqwa:API_key"
    }
    const request = https.get(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
         response.on(data,function(data){
             console.log(JSON.parse.data);
         })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/"); //redirect to home route 
})
app.listen(3000,function(){
    console.log("The server is running on PORT 3000.")
});
















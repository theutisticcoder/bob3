var codes=[];
const express = require("express")
var app = express();
app.use(express.static(__dirname));
app.use(express.static(__dirname + "testgame"));
app.use(express.static(__dirname + "testgame/*"));
var people = [];
const server = require("http").createServer(app);
const socket = require('socket.io');
var io = socket(server);
var users = [];
var passwords = [];
var checked=false;


io.on("connection", (socket)=> {
    socket.on("test", ()=> {
        socket.emit("conn");
    })
    socket.on("username", (data)=> {
        if(users.includes(data.username)){
            socket.emit("tryagain");
        }
        else{
            users.push(data.username);
            passwords.push(data.password);
            socket.emit("success");
        }
    })
    socket.on("LogIn",(data)=>{
        console.log("Users: " + users + ", passwords: " + passwords)
        for(let i=0; i<users.length;i++){
            if(users[i]===data.U && passwords[i]===data.P){
               checked=true;
               console.log("Logged In!")
            }
            console.log(checked)
        }
        if(checked){
            socket.emit("Log");

            }
            else{
                socket.emit("false")
            }
            checked=false;
})
socket.on("check",c=>{
    if(codes.includes(c)){
        socket.emit("tryagain");
    }
    else{
        console.log(codes);
        codes.push(c);
        socket.emit("check",c);
    }
   
});

socket.on("checkCode",c=>{
    if(codes.includes(c)){
        socket.emit("code",c);
    }
    else{
       
        socket.emit("tryagainjoin");
    }
   
});
    socket.on("delete",c=>{
        codes.splice(codes.findIndex(e=>e===c),codes.findIndex(e=>e===c))
        console.log(codes);
        })
}


 )
 server.listen(3000, ()=> {
    console.log("listening");
 })


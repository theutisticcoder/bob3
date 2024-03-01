const express = require("express")
var app = express();
app.use(express.static(__dirname));
app.use(express.static(__dirname + "testgame"));
app.use(express.static(__dirname + "testgame/*"));

const server = require("http").createServer(app);
const io = require("socket.io")(server);
var users = [];
var passwords = [];
var checked=false;
server.listen(3000, ()=> {
    console.log("listening on 3000");
});
io.on("connection", (socket)=> {
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

        }
 )

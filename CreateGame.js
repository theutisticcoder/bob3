var code="";

const socket=io();

document.querySelector("#Create").onclick = Digit;
function Digit(){
        code=Math.floor(Math.random()*1000000);
    code=code.toString();
    while(code.length<6){
        code="0"+code;
    }
    document.getElementById("number").innerHTML=code;
    socket.emit("check",code);
    
}

function loadgame(){
    document.querySelector("#gamewindow").contentWindow.gameInstance.SendMessage("ConnectToServer","Start");       
    setTimeout(()=> {
        document.querySelector("#gamewindow").contentWindow.gameInstance.SendMessage("ConnectToServer","funkyCode",code);       
    }, 10000);
}

socket.on("check",(c)=>{
    document.getElementById("Create").innerHTML="Start Game"
    document.getElementById("gamewindow").style.left="-10vw";
    document.getElementById("box").style.left="75vw";
    code = c;
    document.querySelector("#gamewindow").hidden=false;
        loadgame();
    document.querySelector("#gamewindow").style.position = "relative";
    document.getElementById("Create").onclick=()=>{
        socket.emit("delete",code);
        document.getElementById("gamewindow").style.left="0vw";
        document.getElementById("box").hidden=true;
    }
       
    
   
})

socket.on("tryagain",Digit);
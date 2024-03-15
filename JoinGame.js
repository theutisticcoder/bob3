const socket=io();
var code="";



function join(){

        code=document.querySelector("input").value;
        socket.emit("checkCode",code);
    }
   

document.querySelector("button").onclick = join;
function loadgame(){
    document.querySelector("#gamewindow2").contentWindow.gameInstance.SendMessage("ConnectToServer","Start");       
    setTimeout(()=> {
        document.querySelector("#gamewindow2").contentWindow.gameInstance.SendMessage("ConnectToServer","Join",code);       
    }, 10000);
}
socket.on("code",(c)=>{
    code = c;
   
    document.querySelector("#gamewindow2").hidden=false;
        loadgame();
        document.querySelector("#gamewindow2").style.position = "relative";
       
    
   
})

socket.on("tryagainjoin",()=>{
    alert("code not found");
});
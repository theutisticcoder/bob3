const socket=io()
async function LoginIn(){
const { value: uname } = await Swal.fire({
    title: "Type your username",
    input: "text",
    inputLabel: "Username",
    showCancelButton: true
  });
  const { value: password } = await Swal.fire({
    title: "Type your password",
    input: "password",
    inputLabel: "password",
    showCancelButton: true
  });
  socket.emit("LogIn",{U:uname,P:password})
  socket.on("success", async()=> {
    await Swal.fire({text: "Username set!"});
})
}
LoginIn()
socket.on("Log",()=>{
    document.write("<h1>Logged in!</h1>")
   onclick="window.location.href='UserScreen.html'"
})

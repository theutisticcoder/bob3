const socket = io();
async function username(){
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
      socket.emit("username", {username: uname, password: password});
}
socket.on("success", async()=> {
    await Swal.fire({text: "Username set!"});
})
socket.on("tryagain",async ()=> {
    const { value: uname } = await Swal.fire({
        title: "Type another username",
        input: "text",
        inputLabel: "Your username was taken.",
        showCancelButton: true
      });
      const { value: password } = await Swal.fire({
        title: "Type your password",
        input: "password",
        inputLabel: "password",
        showCancelButton: true
      });
      socket.emit("username", {username: uname, password: password});
})
username()
 socket.on("Log",()=>{
    console.log("logged in");
    window.location.href="UserScreen.html";
})
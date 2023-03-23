const express = require('express')
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})
let user=[]
io.on("connection",(socket)=>{
    user.push({id:socket.id, userName:''})
    socket.emit("me", socket.id)
    socket.on("setuser",(data)=>{
       let hh =  user.map((d)=>{
                if(d.id===data.id){
                    console.log(d.id, data.id   );
                    return {...d,userName:data.userName}
                }
                else{
                    return {...d}
            }
        })
        // console.log("after set:", hh)
        user = hh;
        socket.emit("getUser",user)
        console.log("after set:", user)
    })
    socket.on("send",(data)=>{
        for(let i = 0; i < user.length; i++){
            if(data.from !== user[i].id)
                socket.to(user[i].id).emit("recieve", JSON.stringify({"msg":data.msg, "status":"sender"}))
        }
    })

    socket.on("disconnect",()=>{
        console.log("disconnected socket", socket.id);
        user = user.filter((sid) => sid.id !== socket.id);
    })
})



server.listen(8080,()=>console.log("server running at 8080 port"))
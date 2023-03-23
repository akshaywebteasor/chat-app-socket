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
    user.push(socket.id)
    console.log(user)
    socket.emit("me", socket.id)
    socket.on("setuser",(data)=>{
        console.log("setuser",data)
    })
    socket.on("send",(data)=>{
        console.log((data));
        for(let i = 0; i < user.length; i++){
            if(data.from !== user[i])
                socket.to(user[i]).emit("recieve", data.msg)
        }
    })

    socket.on("disconnect",()=>{
        console.log("disconnected socket", socket.id);
        user = user.filter((sid) => sid !== socket.id);
    })
})



server.listen(8080,()=>console.log("server running at 8080 port"))
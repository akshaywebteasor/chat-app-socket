const express = require('express')
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3006",
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
                    return {...d,userName:data.userName}
                }
                else{
                    return {...d}
            }
        })
        user = hh;
        socket.emit("getUser",user)
        socket.broadcast.emit("getUser",user)
    })
    socket.on("send",(data)=>{
        socket.to(data.to).emit("recieve", JSON.stringify({"msg":data.msg, "status":"sender", "from":data.from}))
    })

    socket.on("disconnect",()=>{
        user = user.filter((sid) => sid.id !== socket.id);
        socket.broadcast.emit("getUser",user)
    })
})



server.listen(8080,()=>console.log("server running at 8080 port"))
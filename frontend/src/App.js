import './App.css'
import {io} from "socket.io-client"
// import MessageChat from "./chat/messageChat"
import { useEffect, useRef, useState } from 'react'
import UserEnter from './users'
const socket = io("http://localhost:8080/")
function App() {
  const [id, setId] = useState()
  const userNameRef = useRef()
  useEffect(()=>{
    socket.on("getUser",(data)=>{
        console.log(data)
    })
    },[])
  useEffect(()=>{
    socket.on("me",(id)=>setId(id))
  },[])

  const handelAddName = ()=>{
    socket.emit("setuser",{id,userName:userNameRef.current.value})
  }
  return (<>
        <UserEnter userNameRef={userNameRef} handelAddName={handelAddName} socket={socket} />
        {/* <MessageChat socket={socket} id={id}/> */}
    </>
  );
}

export default App;

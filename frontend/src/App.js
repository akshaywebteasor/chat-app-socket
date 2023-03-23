import {useEffect, useRef, useState} from "react"
import './App.css';
import {io} from "socket.io-client"
import {IoMdSend} from "react-icons/io"
const socket = io("http://localhost:8080/")
function App() {
  const [id, setId] = useState()
  const messageRef = useRef()
  const [sendmassage, setSendMassage] = useState([])
  const [recivedmassage, setrecivedMassage] = useState([])
  useEffect(()=>{
    socket.on("me",(id)=>setId(id))
  },[])
  
  useEffect(()=>{
    socket.emit("setuser",{userName:"user"+(Math.random() * (10000-1)),id})
  },[id])

  useEffect(() => {
    socket.on("recieve",(data)=>{
      console.log("data"+recivedmassage)
      setrecivedMassage([...recivedmassage , data])
    })
  }, [recivedmassage])
  
  const sendmessage = ()=>{
    socket.emit("send",{msg:messageRef.current.value,form:id})
    setSendMassage([...sendmassage , messageRef.current.value])
  }
  return (<>
  <div className="main">
    <div className="container-sm">
      <div className="box1">
        <p className="text-info ">hiiii</p>
      </div>
      <div className="box2">
        <p className="text-warning">hiiii</p>
      </div>
      {sendmassage.map(d=>
      <div className="box1">
        <p className="text-info">{d}</p>
      </div>
      )}
      {recivedmassage.map(d=>
      <div className="box2">
        <p className="text-warning">{d}</p>
      </div>
      )}
      
    </div>
    <div class="fixed-bottom container-sm  p-3">
        <div className="input-group mb-3">
          <input type="text" class="form-control" ref={messageRef} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <span class="input-group-text" id="basic-addon2" onClick={sendmessage}><IoMdSend/></span>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;

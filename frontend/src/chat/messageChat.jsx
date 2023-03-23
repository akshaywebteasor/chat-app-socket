import { useEffect, useRef, useState } from "react"
import {IoMdSend} from "react-icons/io"

function MessageChat({socket,id}){
    
  const messageRef = useRef()
  //const [sendmassage, setSendMassage] = useState([])
  const [recivedmassage, setrecivedMassage] = useState([])
  
  console.log(recivedmassage)
    socket.emit("setuser",{userName:"user"+(Math.random() * (10000-1)),id})

  useEffect(() => {
    socket.on("recieve",(data)=>{
      console.log("data"+data)
      setrecivedMassage([...recivedmassage , JSON.parse(data)])
    })
  }, [recivedmassage, socket])
  
  const sendmessage = ()=>{
    socket.emit("send",{msg:messageRef.current.value,form:id})
    setrecivedMassage([...recivedmassage , {msg:messageRef.current.value,status:"reciever"}])
    messageRef.current.value=''
  }

    return (<>
        <div className="main">
        <div className="container-sm overflow-auto ">
        
        {recivedmassage.map(d =><div className={d.status==="reciever"?"box1":"box2"}>
            <p className={d.status==="reciever"?"text-info":"text-warning"}>{d.msg}</p>
        </div>
        )}
        
        </div>
        <div className="fixed-bottom container-sm  p-3">
            <div className="input-group mb-3">
            <input type="text" className="form-control" ref={messageRef} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <span className="input-group-text" id="basic-addon2" onClick={sendmessage}><IoMdSend/></span>
            </div>
        </div>
        </div>
    </>)
}
export default MessageChat
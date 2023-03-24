import { useEffect, useState } from "react"
import UserList from "./listing"


function UserEnter({socket,handelAddName, userNameRef, id}){
    const [users, setUsers]=useState([])
    const [currentUser, serCurrentUser] = useState([])
    useEffect(()=>{
        socket.on("getUser",(data)=>{
            console.log(data)
            serCurrentUser(data.filter((d)=>d.id===id && d.userName))
            setUsers([...data.filter((d)=>d.id!==id && d.userName)])
        })
    },[socket,users,id])
    console.log("frnt:",currentUser)

    return (<> 
        {currentUser.length===0 && <div>
            <div>
                <label>Name</label>
                <input type={"text"} ref={userNameRef}/>
            </div>
            <button onClick={handelAddName}>create user</button>
        </div>}
        {currentUser.length>0 && <UserList socket={socket} from={currentUser[0]} users={users}/>}
    </>)
}
export default UserEnter
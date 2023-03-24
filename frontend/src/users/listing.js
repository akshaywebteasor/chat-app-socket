import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MessageChat from "../chat/messageChat"
import './index.css'
function UserList({socket, users, from}) {
    const [to, setTo] = useState()
    const [show, setShow] = useState(false)
    const selectUser = (id)=>{
        setTo(id)
    }

    return (<>
        {to ?<>
                <Button onClick={()=>setTo('')}>back</Button>
                <MessageChat socket={socket} from={from.id} to={to}/>
            </>
        :
        <div>
            {users.map((user,i)=>{
                return <div key={i}><span className="users-listing" onClick={()=>selectUser(user.id)}>{user.userName}</span></div>
            })}
            <div className="fixed-bottom">
               <span className="profile"> {from.userName}</span>
               <Button onClick={()=>setShow(true)}>Create Group</Button>
            </div>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container mt-5">
                    <select className="selectpicker" multiple aria-label="Default select example" data-live-search="true">
                        <option value={"1"}>One</option>
                        <option value={"2"}>Two</option>
                        <option value={"3"}>Three</option>
                        <option value={"4"}>Four</option>
                    </select>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShow(false)}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
                </Modal.Footer>
            </Modal>
        </div>}
    </> );
}

export default UserList;
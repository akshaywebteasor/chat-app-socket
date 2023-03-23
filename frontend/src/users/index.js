

function UserEnter({socket,handelAddName, userNameRef}){
    
    return (<div>
        <div>
            <label>Name</label>
            <input type={"text"} ref={userNameRef}/>
        </div>
        <button onClick={handelAddName}>create Room</button>
    </div>)
}
export default UserEnter
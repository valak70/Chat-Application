import React, { useState } from 'react'
import "./chatList.css"
import AddUser from './addUser/AddUser';

const ChatList = () => {
    const [symbol,setSymbol] = useState(false);
    const handleClick = ()=>{
        setSymbol(!symbol);
    }
  return (
    <div className="chatList">
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" placeholder='search' />
            </div>
            <img src={symbol ? "./minus.png":"./plus.png"} alt="" onClick={handleClick} className='add'/>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Manoj</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Manoj</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Manoj</span>
                <p>Hello</p>
            </div>
        </div>
        {symbol && <AddUser/>}
    </div>
  )
}

export default ChatList
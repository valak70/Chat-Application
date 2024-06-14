import React, { useEffect, useState } from 'react'
import "./chatList.css"
import AddUser from './addUser/AddUser';
// import { useStore } from 'zustand';
import { useUserStore } from '../../../lib/userStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ChatList = () => {
    const [symbol,setSymbol] = useState(false);
    const [chats,setChats] = useState([]);
    const {currentUser} = useUserStore()
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
            setChats(doc.data().chats);
        });
    
      return () => {
        unsub();
      }
    }, [currentUser.id])
    console.log(chats);
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
        {chats.map((chat)=>(
            <div className="item" key = {chat.chatId}>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Manoj</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
        ))}
        {symbol && <AddUser/>}
    </div>
  )
}

export default ChatList
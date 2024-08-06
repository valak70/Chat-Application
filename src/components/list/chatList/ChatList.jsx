import React, { useEffect, useState } from 'react'
import "./chatList.css"
import AddUser from './addUser/AddUser';
// import { useStore } from 'zustand';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
    const [symbol,setSymbol] = useState(false);
    const [chats,setChats] = useState([]);
    const {currentUser} = useUserStore() 
    const {chatId, changeChat} = useChatStore()
    console.log(chatId);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            const items = res.data().chats;
            const promises = items.map(async (item)=>{
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();
                return {...item,user};
            });
            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));
        }
    );
    
      return () => {
        unsub();
      }
    }, [currentUser.id])
    // console.log(chats);
    const handleClick = ()=>{
        setSymbol(!symbol);
    }
    const handleChange = async (chat) => {
        const userChats = chats.map((item) => {
          const { user, ...rest } = item;
          return rest;
        });
    
        const chatIndex = userChats.findIndex(
          (item) => item.chatId === chat.chatId
        );
    
        userChats[chatIndex].isSeen = true;
    
        const userChatsRef = doc(db, "userChats", currentUser.id);
    
        try {
          await updateDoc(userChatsRef, {
            chats: userChats,
          });
          changeChat(chat.chatId, chat.user);
        } catch (err) {
          console.log(err);
        }
      };
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
            <div className="item" key = {chat.chatId} onClick={()=>handleChange(chat)}
                style={{
                    backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
                }}>
                <img src={chat.user.avatar || "./avatar.png"} alt="" />
                <div className="texts">
                    <span>{chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
        ))}
        {symbol && <AddUser/>}
    </div>
  )
}

export default ChatList
import React, { useState } from 'react'
import "./addUser.css"
import { toast } from 'react-toastify'
import { collection, doc, getDocs, query, serverTimestamp, where, setDoc, arrayUnion, updateDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { set } from 'firebase/database'
import { useUserStore } from '../../../../lib/userStore'


const AddUser = () => {
  const [user,setUser] = useState(null)
  const {currentUser} = useUserStore();
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
        const newChatRef = doc(chatRef);  // Create a new document reference
        await setDoc(newChatRef, {  // Use setDoc instead of set
            createdAt: serverTimestamp(),
            messages: [],
        });
        await updateDoc(doc(userChatsRef,user.id),{
          chats : arrayUnion({
            chatId : newChatRef.id,
            lastMessage : "",
            receiverId : currentUser.id,
            updatedAt : Date.now()
          })
        })
        await updateDoc(doc(userChatsRef,currentUser.id),{
          chats : arrayUnion({
            chatId : newChatRef.id,
            lastMessage : "",
            receiverId : user.id,
            updatedAt : Date.now()
          })
        })
    } catch (err) {
        console.error('Error adding document:', err);
        toast.error('Error adding document: ' + err.message);
    }
};
  const handleSearch = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        setUser(querySnapshot.docs[0].data())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username'/>
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
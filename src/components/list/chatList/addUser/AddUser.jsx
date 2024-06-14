import React, { useState } from 'react'
import "./addUser.css"
import { toast } from 'react-toastify'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'


const AddUser = () => {
  const [user,setUser] = useState(null)
  const handleAdd = async ()=>{
    
  }
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
import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
  const [emoji,setEmoji] = useState(false);
  const [text,setText] = useState("");
  const endRef = useRef(null);
  useEffect( () => {
    endRef.current?.scrollIntoView({behaviour : "smooth"})
  },[])
  const handleClick = () => {
    setEmoji(!emoji)
  }
  const handleEmoji = (e) =>{
    setText((prev) => prev + e.emoji)
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Manoj</span>
            <p>lorem ipsum</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>abcdjfsklfhnsdklfghlerhtgfn fasfgusafgeyu gy efushauefhgis</p>
            <span>5 min ago</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <p>abcdjfsklfhnsdklfghlerhtgfn fasfgusafgeyu gy efushauefhgis</p>
            <span>5 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>abcdjfsklfhnsdklfghlerhtgfn fasfgusafgeyu gy efushauefhgis</p>
            <span>5 min ago</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <img src="https://github.com/ealush/emoji-picker-react/assets/11255103/c28cc954-dc1d-4d82-91a8-64a74cf1d598" alt="" />
            <p>abcdjfsklfhnsdklfghlerhtgfn fasfgusafgeyu gy efushauefhgis</p>
            <span>5 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="img.png" alt="" />
          <img src="camera.png" alt="" />
          <img src="mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message....' value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <div className="emoji">
          <img src="emoji.png" onClick={handleClick} alt="" />
          <div className="picker">
          { emoji && <EmojiPicker onEmojiClick={handleEmoji}/>}
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat
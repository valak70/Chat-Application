import { onAuthStateChanged } from "firebase/auth"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
// import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { useEffect } from "react"
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/userStore"
import { useChatStore } from "./lib/chatStore"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"

const App = () => {
  // const user = false
  const {currentUser,isLoading,fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid)
    })
  
    return () => {
      unsub();
    }
  }, [fetchUserInfo])
  
  if(isLoading) return <div className="loading">Loading....</div>

  return (
    // <div className='container'>
    //   {
    //     currentUser ? (
    //       <>
    //       <List/>
    //       {chatId && <Chat/>}
    //       {chatId && <Detail/>}
    //       </>
    //     ) : (
    //       <Login/>
    //     )
    //   }
    //   <Notification/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element ={<Register/>}></Route>
        <Route path="/login" element ={<Login/>}></Route>
        <Route path="/" element ={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
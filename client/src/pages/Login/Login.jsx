import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import logo from "/logo.jpg"
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import { loginRoute } from '../../../../api/utils/apiRoutes'
import axios from "axios"

const Login = () => {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username : "",
        password:""
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(handleValidate()){
          const {username,password} = values
          const {data} = await axios.post(loginRoute,{
            username,
            password,      
          }) 
          if(data.status === false){
            toast.error(data.msg)
          }
          if(data.status === true){
            toast.success(data.msg)
            localStorage.setItem("chat-app-user", JSON.stringify(data.user))
            navigate("/")
          }
        }
    }
    const handleChange = (event)=>{
        setValues({...values, [event.target.name] : event.target.value})
        // console.log(values);
    }
    
    const handleValidate = ()=>{
      const {username,password} = values
      if(username === "" || password === ""){
        toast.error("Username or Password cannot be empty")
        return false;
      }
      return true;
    }


  return (
    <>
    <div className="formContainer">
        <form onSubmit={handleSubmit}>
            <div className='brand'>
                <img src={logo} alt="" />
                <h1>Gossip</h1>
            </div>
            {/* <label htmlFor="file">
                <img src={ "./avatar.png"} alt="" />
                Upload an image    
            </label>
            <input type="file" id='file' style={{display:'none'}} onChange={handleAvatar}/> */}
            <input type="text" placeholder='Username' name="username" onChange={handleChange} />
            {/* <input type="text" placeholder='Email' name='email' onChange={handleChange}/> */}
            <input type="password" placeholder='password' name='password' onChange={handleChange}/>
            {/* <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange}/> */}
            <button type='submit'>Sign In</button>
            <span>Don't have an account, <Link to="/register">Sign Up</Link></span>
        </form>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
    </>
  )
}

export default Login
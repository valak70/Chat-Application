import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import logo from "/logo.jpg"
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import { registerRoute } from '../../../../api/utils/apiRoutes'
import axios from "axios"

const Register = () => {
    const [values,setValues] = useState({
        username : "",
        email: "",
        password:"",
        confirmPassword:""
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(validate()){
            // console.log(registerRoute);
            const {username,password,email} = values
            const {data} = await axios.post(registerRoute,{
              username,
              email,
              password,      
            }) 
        }
    }
    const handleChange = (event)=>{
        setValues({...values, [event.target.name] : event.target.value})
        console.log(values);
    }
    const validate = ()=>{
        const {username,email,password,confirmPassword} = values
        if (password !== confirmPassword) {
            toast.error("Passwords don't match.");
            return false;
          } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.");
            return false;
          } else if (password.length < 6) {
            toast.error("Password should be equal or greater than 8 characters.");
            return false;
          } else if (email === "") {
            toast.error("Email is required.");
            return false;
          } else return true;
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
            <input type="text" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="password" placeholder='password' name='password' onChange={handleChange}/>
            <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange}/>
            <button type='submit'>Sign Up</button>
            <span>Already have an account, <Link to="/login">Login</Link></span>
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

export default Register
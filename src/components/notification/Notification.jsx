import React from 'react'
import "./notification.css"
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

const Notification = () => {
  return (
    <div>
        <ToastContainer position='bottom-right'/>
    </div>
  )
}

export default Notification
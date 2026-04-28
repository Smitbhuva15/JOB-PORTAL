import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context-Api/AuthContext'
import React, { useContext, useEffect, useState } from 'react'

const ProtectedRoutes = ({children}) => {

 const {userData}=useContext(AuthContext)
 const navigate=useNavigate()

 useEffect(() => {
  const storedRole = localStorage.getItem("user-role");

    if (storedRole !== "recruiter" && userData?.role !== "recruiter") {
      navigate("/");
    }
   
 }, [userData, navigate]);


  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoutes
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context-Api/AuthContext'
import React, { useContext, useEffect, useState } from 'react'

const ProtectedRoutes = ({children}) => {

 const {userData}=useContext(AuthContext)
 const navigate=useNavigate()

 useEffect(() => {
    if(userData===null || userData.role!=="recruiter"){
        navigate('/')
    }
   
 }, []);


  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoutes
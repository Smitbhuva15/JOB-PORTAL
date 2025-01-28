import { getallcompany } from '@/store/companyslice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const  GetAllCompany= () => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
   
  
    const fetchingAllCompany = async () => {
      
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/company`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            if (response.ok) {
                const data = await response.json();
                // console.log(data.companies  )
                dispatch( getallcompany(data.companies) )
                
            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    };
  
    useEffect(() => {
        fetchingAllCompany();
    }, [ token,dispatch]); 
}

export default GetAllCompany
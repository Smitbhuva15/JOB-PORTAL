import { getsinglecompany } from '@/store/companyslice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const GetsingleCompny =async (companyId) => {

    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
 
    const isUpdate=useSelector(store=>store.company.isupdate)
    const API_URL = import.meta.env.VITE_API_URL;
 

      useEffect(() => {
        const fechingSingleCompany=async()=>{
            try {
                const response = await fetch(`${API_URL}/user/v2/api/get/companybyid/${companyId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data.companie)
                    dispatch(getsinglecompany(data.companie))
                    
                } else {
                    const errorMessage = await response.json();
                    console.log(errorMessage)
                }
            } catch (error) {
                console.log(error)
            }
        
         }
        fechingSingleCompany()   
      }, [companyId, token, dispatch,isUpdate]);


}

export default GetsingleCompny
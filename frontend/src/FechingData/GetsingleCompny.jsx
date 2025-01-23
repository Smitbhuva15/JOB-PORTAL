import { getsinglecompany } from '@/store/companyslice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const GetsingleCompny =async (companyId) => {

    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
 
    const isUpdate=useSelector(store=>store.company.isupdate)
 

      useEffect(() => {
        const fechingSingleCompany=async()=>{
            try {
                const response = await fetch(`http://localhost:5000/user/v2/api/get/companybyid/${companyId}`, {
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
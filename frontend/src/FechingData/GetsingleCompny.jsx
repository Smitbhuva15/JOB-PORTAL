import { getsinglecompany } from '@/store/companyslice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetsingleCompny =async (companyId) => {

    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
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

      useEffect(() => {
        fechingSingleCompany()   
      }, [companyId,dispatch]);


}

export default GetsingleCompny
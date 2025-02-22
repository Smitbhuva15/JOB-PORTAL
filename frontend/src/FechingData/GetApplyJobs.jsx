import { getapplyjob } from '@/store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetApplyJobs = () => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
   
    const API_URL = import.meta.env.VITE_API_URL;
  
    const fetchingApplyJob = async () => {
      
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/application/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            if (response.ok) {
                const data = await response.json();
                // console.log(data.applicationapplybyOneUser )
                dispatch(getapplyjob(data.applicationapplybyOneUser) )
                
            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    };
  
    useEffect(() => {
        fetchingApplyJob();
    }, [ token]); 


}

export default GetApplyJobs
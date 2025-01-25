import { getapplyjob } from '@/store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetApplyJobs = () => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
   
  
    const fetchingApplyJob = async () => {
      
        try {
            const response = await fetch(`http://localhost:5000/user/v2/api/get/application/me`, {
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
import { getadminjob } from '../store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetAdminCreateJob = () => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch=useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  
    const fetchingAdminJobs = async () => {
      
        try {
            const response = await fetch(`${API_URL}/user/v2/api/admin/create/job`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            if (response.ok) {
                const data = await response.json();
                // console.log(data.jobs)
              
                dispatch( getadminjob(data.jobs) )
                
            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    };
  
    useEffect(() => {
        fetchingAdminJobs();
    }, [ token]); 
}

export default GetAdminCreateJob
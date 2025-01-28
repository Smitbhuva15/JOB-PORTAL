import { getsinglejob } from '../store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetSingleJob =async (jobId) => {
  
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

    const fetchingSingleData = async () => {
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/jobbyid/${jobId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(getsinglejob(data.job)); 
            } else {

                const errorMessage = await response.json();
                console.log(errorMessage);
              
            }
        } catch (error) {
            console.log(error);
          
        }
    };

    useEffect(() => {
      
            fetchingSingleData();
        
    }, [jobId, token,dispatch]); 
}

export default GetSingleJob
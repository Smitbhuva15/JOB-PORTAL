import { getsinglejob } from '../store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetSingleJob =async (jobId) => {
  
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch = useDispatch();
    const fetchingSingleData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/v2/api/get/jobbyid/${jobId}`, {
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
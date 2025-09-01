import { getsinglejob } from '../store/jobSlice';
import React from 'react'


const GetSingleJob =async (jobId,token,dispatch,API_URL) => {
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
}

export default GetSingleJob
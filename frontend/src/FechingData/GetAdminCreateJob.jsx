import { getadminjob } from '../store/jobSlice';
import React from 'react'


const GetAdminCreateJob =async (token,dispatch, API_URL) => {
        try {
            const response = await fetch(`${API_URL}/user/v2/api/admin/create/job`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            if (response.ok) {
                const data = await response.json();
                dispatch( getadminjob(data.jobs) )
                
            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
}

export default GetAdminCreateJob
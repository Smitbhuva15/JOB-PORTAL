import { getsinglecompany } from '@/store/companyslice';
import React from 'react'


const GetsingleCompny =async (companyId,token,dispatch,isUpdate,API_URL) => {

            try {
                const response = await fetch(`${API_URL}/user/v2/api/get/companybyid/${companyId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    dispatch(getsinglecompany(data.companie))
                    
                } else {
                    const errorMessage = await response.json();
                    console.log(errorMessage)
                }
            } catch (error) {
                console.log(error)
            }
}

export default GetsingleCompny
import { getapplyjob } from '@/store/jobSlice';
import React from 'react'

const GetApplyJobs = async (token, dispatch, API_URL) => {
    try {
        const response = await fetch(`${API_URL}/user/v2/api/get/application/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getapplyjob(data.applicationapplybyOneUser))

        } else {
            const errorMessage = await response.json();
            console.log(errorMessage)
        }
    } catch (error) {
        console.log(error)
    }
}

export default GetApplyJobs
import { getApplicantdata } from '../store/applicationSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetApplicant = (jobId) => {

    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const dispatch = useDispatch();
    const feachingApplicatantData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/v2/api/get/appication/admin/${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                dispatch( getApplicantdata(data.job))
               

            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        feachingApplicatantData()
    }, [jobId, token]);

}

export default GetApplicant
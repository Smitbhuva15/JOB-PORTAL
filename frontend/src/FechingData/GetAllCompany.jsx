import { getallcompany } from '@/store/companyslice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const  GetAllCompany=async (token,dispatch,API_URL) => {
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/company`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
  
            if (response.ok) {
                const data = await response.json();
                dispatch( getallcompany(data.companies) )
                
            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
}

export default GetAllCompany
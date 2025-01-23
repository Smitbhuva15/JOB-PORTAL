import { getalljob } from '../store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const GetAllJobs = () => {
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const dispatch=useDispatch();

  const fetchingAllJobs = async () => {
    
      try {
          const response = await fetch(`http://localhost:5000/user/v2/api/get/alljob`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const data = await response.json();
              // console.log(data.allJobs)
              dispatch( getalljob(data.allJobs) )
              
          } else {
              const errorMessage = await response.json();
              console.log(errorMessage)
          }
      } catch (error) {
          console.log(error)
      }
  };

  useEffect(() => {
      fetchingAllJobs();
  }, [ token]); 
}

export default GetAllJobs
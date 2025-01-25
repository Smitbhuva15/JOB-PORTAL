import { getalljob } from '../store/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const GetAllJobs = () => {
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const dispatch=useDispatch();
  const searchdata=useSelector(store=>store.job.searchdata)
  

  const fetchingAllJobs = async () => {
    
      try {
          const response = await fetch(`http://localhost:5000/user/v2/api/get/alljob?keyword=${searchdata}`, {
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
  }, [ token,searchdata]); 
}

export default GetAllJobs
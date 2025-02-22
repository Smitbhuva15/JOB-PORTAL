import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  // console.log(token)
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
 
  
  const isVerify = !!token;

  const getuserData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/user/v2/api/get/userdata`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }

      })

      if (response.ok) {
        const res = await response.json();
        setUserData(res.userDetail)
        setLoading(false);
      }
      else {
        const errormessage = await response.json();
        console.log(errormessage);
        setLoading(false);
      }

    } catch (error) {
      console.log(error)
    }

  }



  const handelLogout = () => {
    setToken("");
    localStorage.removeItem('token-jobportal');
    localStorage.removeItem('user-role');
    toast.success("user Logout succesfully!!")
    window.location.reload(true)
   
  }

  useEffect(() => {
    getuserData()

  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isVerify, userData, setToken, handelLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

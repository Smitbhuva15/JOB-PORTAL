import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  // console.log(token)
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  
  const isVerify = !!token;

  const getuserData = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/user/v2/api/get/userdata', {
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

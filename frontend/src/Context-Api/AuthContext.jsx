import { createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    const isVerify=!!token;

    const getuserData=async()=>{
      try {
        setLoading(true)
        const response=await fetch('http://localhost:5000/user/v2/api/get/userdata',{
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
        console.log(response)
        if(response.ok){
            const res=await response.json();
            // console.log(res.userdata);
            setUserData(res.userdata)
            setLoading(false);
        }
        else{
            const errormessage=await response.json();
            console.log(errormessage);
            setLoading(false);
        }
        
      } catch (error) {
        console.log(error)
      }

    }
  


  return (
    <AuthContext.Provider value={{token,isVerify,userData}}>
      {children}
    </AuthContext.Provider>
  );
};

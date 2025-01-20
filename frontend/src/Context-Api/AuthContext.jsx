import { createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));

    const isVerify=!!token;

    // const getuserData=async()=>{
    //     const response=await fetch('')
    // }
  


  return (
    <AuthContext.Provider value={{token,isVerify}}>
      {children}
    </AuthContext.Provider>
  );
};

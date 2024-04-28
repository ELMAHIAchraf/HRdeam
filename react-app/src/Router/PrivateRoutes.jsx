import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { axiosInstance } from "../Axios";
// import axios from 'axios';
export const PrivateRoutes = () => {

    const [isAuth, setIsAuth] = useState(null);
    const checkAuth = async () => { 
    try {
      const token = `Bearer ${localStorage.getItem("token")}`
        const response = await axiosInstance.get("/user", {
          headers:{
            Authorization : token
          }
        })
        setIsAuth(true)
    } catch (error) {
        setIsAuth(false)
    }
    };
    useEffect(() => {
      checkAuth();
    }, []);
    
    if(isAuth === null) return <div className='w-screen h-screen flex justify-center items-center bg-[#0000005e] fixed top-0 '><i className="fa-duotone fa-spinner-third fa-spin text-6xl text-[#007cff]"></i></div>

  
return (isAuth ? <Outlet/> : <Navigate to='/'/>)
  
}
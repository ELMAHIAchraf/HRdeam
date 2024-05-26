import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { axiosInstance } from "../Axios";
export const PrivateRoutes = ({children, role}) => {

    const [isAuth, setIsAuth] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const checkAuth = async () => { 
    try {
      const token = `Bearer ${localStorage.getItem("token")}`
        const response = await axiosInstance.get("/user", {
          headers:{
            Authorization : token
          }
        })
        setIsAuth(true)
        setUserRole(response.data.role)
    } catch (error) {
        setIsAuth(false)
        setUserRole(null)
    }
    };
    useEffect(() => {
      checkAuth();
    }, []);
    
    if(isAuth === null && userRole===null) return <div className='w-screen h-screen flex justify-center items-center bg-[#0000005e] fixed top-0 z-50'><i className="fa-duotone fa-spinner-third fa-spin text-6xl text-[#007cff]"></i></div>

  
    return (isAuth && userRole === role ? children : <Navigate to='/'/>)
  
}
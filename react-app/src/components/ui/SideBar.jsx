import { useState, useEffect } from "react";
import { axiosInstance } from "../../Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUser } from '../../State/userSlice';


export const SideBar = () => {

   const [selection, setSelection] = useState('Dashboard');
   const [open, setOpen] = useState(null);
//    const [toggleState, setToggleState] = useState(false);
   const [isLargeWidth, setIsLargeWidth] = useState(window.innerWidth > 1024 ? true : false );
   const changeWidth = () => window.innerWidth > 1024 ? setIsLargeWidth(true) : setIsLargeWidth(false)
   const changeStat = () => isLargeWidth ? setOpen(true) : setOpen(false) 
   useEffect(() => {
      changeStat();
   }, [isLargeWidth]);
   addEventListener('resize', changeWidth)

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logout = async() =>{
        try{
            const response = await axiosInstance.post('/logout');
            localStorage.removeItem('token');
            dispatch(removeUser());
            navigate('/');
            toast.success(response.data.message);
        }catch(e){
            toast.error(e.response.data.message);  
        }   
    
   }
   
  return (
    <>
        
   {
   !isLargeWidth &&
      <div className=" cursor-pointer bg-white py-4 fixed w-full top-0 left-0 lg:bg-transparent" onClick={()=>setOpen(1)}>
         <i className="fa-solid fa-bars text-[#007cff] fa-lg ml-3" ></i>
      </div>
   }

<div id="drawer-navigation"  className={`fixed top-0 left-0 z-40 h-screen border-2 border-[#ebebeb] p-4 ${open ? '': 'overflow-y-auto transition-transform -translate-x-full'} bg-white w-80`}>

    {
      !isLargeWidth &&
         <button type="button"  className="text-gray-500 bg-transparent hover:bg-[#007bff7b]  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center" onClick={()=>setOpen(0)}>
            <i className="fa-regular fa-xmark text-lg"></i>
            <span className="sr-only">Close menu</span>
         </button>
    }

  <div className="py-4 overflow-y-auto relative ">
    
        <div className="flex items-center">
            <img src="Logo.svg" alt="logo" className="w-10"/>
            <p className="font-semibold ml-3 text-2xl">HRdream</p>
        </div>
      <ul className="relative space-y-2 font-medium ">
         <li className="mt-8">
            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group h-14 cursor-pointer ${selection =='Dashboard' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`} onClick={()=>setSelection('Dashboard')}>
               <i className={`fa-sharp fa-regular fa-grid-2 fa-lg ${selection=='Dashboard'? 'text-[#007cff]' : 'text-[#081321]'}  ml-2`}></i>
               <span className={`ms-3 ${selection=='Dashboard'? 'text-[#007cff]' : 'text-[#081321]'}`}>Dashboard</span>
            </a>
         </li>
         <li>
            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Applicant' ? 'bg-gray-100 border-[#007cff] border-2' : ''} `}  onClick={()=>setSelection('Applicant')}>
               <i className={`fa-sharp fa-solid fa-chart-mixed fa-lg  ${selection=='Applicant'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>
               <span className={`ms-3 ${selection=='Applicant'? 'text-[#007cff]' : 'text-[#081321]'}`}>Applicant Tracker</span>
            </a>
         </li>
         <li>
            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Employees' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Employees')}>
            <i className={`fa-regular fa-user-group fa-lg ${selection=='Employees'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Employees'? 'text-[#007cff]' : 'text-[#081321]'}`}>Employees</span>
            </a>
         </li>
         <li>
            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Away' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Away')}>
            <i className={` fa-regular fa-hand-wave fa-flip-horizontal fa-lg ${selection=='Away'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Away'? 'text-[#007cff]' : 'text-[#081321]'}`}>Who&apos;s away</span>
            </a>
         </li>
         <li className="pt-72" onClick={logout}>
            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Logout' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Logout')}>
            <i className={`fa-solid fa-arrow-right-from-bracket fa-lg ${selection=='Logout'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Logout'? 'text-[#007cff]' : 'text-[#081321]'}`}>Log out</span>
            </a>
         </li>
         
      </ul>
   </div>
</div>

    </>
  )
}


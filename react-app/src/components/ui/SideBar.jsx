import { useState, useEffect } from "react";
import { axiosInstance } from "../../Axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUser } from '../../State/userSlice';
import Echo from '@/pusher';
import { notify } from "./notify";
import { addDepartment, removeDepartment } from "@/State/departmentSlice";
import { AddAbsence } from "@/State/absenceSlice";


export const SideBar = () => {

   const [selection, setSelection] = useState(sessionStorage.getItem('selection') && sessionStorage.getItem('selection')!='Logout' ? sessionStorage.getItem('selection') : 'Dashboard');
   const [open, setOpen] = useState(null);

   const [isLargeWidth, setIsLargeWidth] = useState(window.innerWidth > 786 ? true : false );
   const changeWidth = () => window.innerWidth > 786 ? setIsLargeWidth(true) : setIsLargeWidth(false)
   const changeStat = () => isLargeWidth ? setOpen(true) : setOpen(false) 
   useEffect(() => {
      changeStat();
   }, [isLargeWidth]);
   addEventListener('resize', changeWidth)

   useEffect(() => {
      sessionStorage.setItem('selection', selection);
   }, [selection]);


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

   useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('ManageDepartmentEvent', (e) => {
          notify(e);
         if(e.action == 'create'){
            dispatch(addDepartment(e.data));
         }else{
            dispatch(removeDepartment(e.data));
         }

      });
    }, []); 

   useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('ManageAbsenceEvent', (e) => {
         notify(e);
         dispatch(AddAbsence(e.data));
      });
    }, []); 

    useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('ManageVacationRequestEvent', (e) => {
         if(!selection==='Dashboard') notify(e)
      });
    }, []); 

    useEffect(() => {
      Echo.private(`vacation-request-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('VacationRequestEvent', (e) => {
        if(!selection==='Dashboard') notify(e)
      });
    }, []);

    useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('ManageApplicationsEvent', (e) => {
         if(!selection==='Applicant') notify(e);
      });
    }, []); 

     const [isAdmin, setIsAdmin] = useState(false);

     useEffect(() => {
      const userRole = JSON.parse(localStorage.getItem('user'))?.admin;
      setIsAdmin(userRole === 'admin');
    }, []);

  return (
    <>
        
   {
   !isLargeWidth &&
      <div className=" cursor-pointer py-5 fixed top-0 left-0 " onClick={()=>setOpen(1)}>
         <i className="fa-solid fa-bars text-[#007cff] fa-lg ml-3 z-40" ></i>
      </div>
   }

<div id="drawer-navigation"  className={`fixed top-0 left-0  h-screen border-2 border-[#ebebeb] p-4 ${open ? '': 'overflow-y-auto transition-transform -translate-x-full'} bg-white w-80 z-50`}>

    {
      !isLargeWidth &&
         <button type="button"  className="text-gray-500 bg-transparent hover:bg-[#007bff7b] rounded-lg text-sm w-8 h-8 float-right inline-flex items-center justify-center" onClick={()=>setOpen(0)}>
            <i className="fa-regular fa-xmark text-lg"></i>
            <span className="sr-only">Close menu</span>
         </button>
    }

  <div className="py-4 overflow-y-auto relative ">
    
        <div className="flex items-center">
            <img src="Logo.svg" alt="logo" className="w-10"/>
            <p className="font-semibold ml-3 text-2xl">HRdream</p>
        </div>
      <ul className="relative  font-medium ">
         <li className="mt-8 hover:cursor-pointer">
            <Link to="/home" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group h-14 cursor-pointer ${selection =='Dashboard' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`} onClick={()=>setSelection('Dashboard')}>
               <i className={`fa-sharp fa-regular fa-grid-2 fa-lg ${selection=='Dashboard'? 'text-[#007cff]' : 'text-[#081321]'}  ml-2`}></i>
               <span className={`ms-3 ${selection=='Dashboard'? 'text-[#007cff]' : 'text-[#081321]'}`}>Dashboard</span>
            </Link>
         </li>
         <li className="mt-2 cursor-pointer">
            <Link to="/announcement" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Announcement' ? 'bg-gray-100 border-[#007cff] border-2' : ''} `}  onClick={()=>setSelection('Announcement')}>
               <i className={`fa-regular fa-bullhorn fa-lg  ${selection=='Announcement'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>
               <span className={`ms-3 ${selection=='Announcement'? 'text-[#007cff]' : 'text-[#081321]'}`}>Announcements</span>
            </Link>
         </li>
         <li className="mt-2 cursor-pointer">
            <Link to="/applicant" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Applicant' ? 'bg-gray-100 border-[#007cff] border-2' : ''} `}  onClick={()=>setSelection('Applicant')}>
               <i className={`fa-sharp fa-solid fa-chart-mixed fa-lg  ${selection=='Applicant'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>
               <span className={`ms-3 ${selection=='Applicant'? 'text-[#007cff]' : 'text-[#081321]'}`}>Applicant Tracker</span>
            </Link>
         </li>
         <li className="mt-2 cursor-pointer">
            <Link to="/employees" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Employees' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Employees')}>
            <i className={`fa-regular fa-user-group fa-lg ${selection=='Employees'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Employees'? 'text-[#007cff]' : 'text-[#081321]'}`}>Employees</span>
            </Link>
         </li>
         <li className="mt-2 cursor-pointer">
            <Link to="/away" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Away' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Away')}>
            <i className={` fa-regular fa-hand-wave fa-flip-horizontal fa-lg ${selection=='Away'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Away'? 'text-[#007cff]' : 'text-[#081321]'}`}>Who&apos;s away</span>
            </Link>
         </li>
         {
            isAdmin &&
            <li className="mt-2 cursor-pointer">
            <Link to="/admin" className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group h-14 cursor-pointer ${selection =='Human Resources' ? 'bg-gray-100 border-[#007cff] border-2' : ''}`}  onClick={()=>setSelection('Human Resources')}>
            <i className={`fa-regular fa-user-tie fa-lg ${selection=='Human Resources'? 'text-[#007cff]' : 'text-[#081321]'} ml-2`}></i>           
               <span className={`ms-3 ${selection=='Human Resources'? 'text-[#007cff]' : 'text-[#081321]'}`}>Human Resources</span>
            </Link>
         </li>
         }
         <li className={`${isAdmin ? "mt-40" : "mt-56"}`} onClick={logout}>
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


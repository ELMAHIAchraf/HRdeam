import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { axiosInstance } from "@/Axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment, removeDepartment } from "@/State/departmentSlice";

export const DepartementManag = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isDepModalOpen, setIsDepModalOpen] = useState(false);

  const name = useRef("");
  const dispatch = useDispatch();
  
  const departments=useSelector(state=>state.department);

  const createDepartment = async () => {
    const departmentName = {"name" : name.current.value};
    const response = await axiosInstance.post('/departments', departmentName);
    dispatch(addDepartment(response.data.data));
    toast.success(response.data.message);
    setIsOpen(false);
  }
  const deleteDepartment = async (id) => {
    try{
        const response = await axiosInstance.delete(`/departments/${id}`);
        dispatch(removeDepartment(id));
        toast.success(response.data.message);
    }catch(error){
        toast.error(error.response.data.message);
    }
    setIsDepModalOpen(false);
    setIsOpen(false);
  }


  return (
    <>
      
            <DropdownMenu>
            <DropdownMenuTrigger className=" px-3 py-1"><i className="fa-regular fa-ellipsis-vertical"></i></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Departments management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-blue-100" onClick={()=>{setIsOpen(true); name.current.focus()}}>
                  <i className="fa-regular fa-plus pr-2"></i>Add Department
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-red-100" onClick={()=>setIsDepModalOpen(true)}><i className="fa-regular fa-trash pr-2"></i> Remove Department</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu> 


<div  className={`${isDepModalOpen==false? 'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e] `}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Departments
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsDepModalOpen(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <ul className="space-y-4 mb-4">
                {
                    departments.map(department => (
                        <li key={department.id}>
                        <div className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                            <div className="space-x-2">
                                <div className=' w-3 h-3 rounded-full ml-2 inline-block' style={{backgroundColor: department.color }}></div>                                
                                <div className="w-full text-lg font-semibold inline">{department.name}</div>
                            </div>
                            <AlertDialog>
                            <AlertDialogTrigger className="px-2 py-1 rounded-md hover:animate-pulse hover:ring-red-500 hover:ring-1"><i className="fa-solid fa-trash  text-lg text-red-500 "></i></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the department.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className=" bg-[#0064d0] hover:bg-red-500 hover:animate-pulse" onClick={()=>deleteDepartment(department.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </li>
                    ))
                }
                   
                </ul>

            </div>
        </div>
    </div>
</div> 


<div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Departement
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department&apos;s name</label>
                        <input ref={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Finance" required />
                    </div>

                    <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createDepartment}><i className="fa-regular fa-plus pr-2"></i>Add Department</button>
                </form>
            </div>
        </div>
    </div>
</div> 

    </>
  )
}

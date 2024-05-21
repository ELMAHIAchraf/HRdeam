import { axiosInstance } from "@/Axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
import { addEmployee } from "@/State/EmployeeSlice";
import { incrementCount } from "@/State/countSlice";
import { addDepartment } from "@/State/departmentSlice";


export const AddEmployee = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setAvatar] = useState(0);
    const [fileName, setFileName] = useState('');

    const Eavatar = useRef(null);
    const fname = useRef(null);  
    const lname = useRef(null);
    const cin = useRef(null);
    const position = useRef(null);
    const salary = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const department = useRef(null);
    const address = useRef(null);

    const departments = useSelector((state) => state.department);
    const dispatch = useDispatch();
  
    const getDeps = async () => {
        try {
            const response = await axiosInstance.get('/departments');
            response.data.data.forEach((department) => {
                dispatch(addDepartment(department));
            });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
            if(departments.length === 0) getDeps();
    }, []);

    const getData = () => {
        return {
            fname: fname.current.value,
            lname: lname.current.value,
            cin: cin.current.value,
            position: position.current.value,
            salary: salary.current.value,
            email: email.current.value,
            phone: phone.current.value,
            departement_id: department.current.value,
            address: address.current.value,
            avatar: Eavatar.current.files[0],
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    const createEmployee = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/employees', getData(),{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });
            dispatch(addEmployee(response.data.data));
            dispatch(incrementCount());
            setIsLoading(false);
            setIsOpen(false);
            toast.success('Employee added successfully');
        } catch (error) {
            console.log(error.message);
        }
    }



    const getFileName = () => {
        const fileName=Eavatar.current.value
        return fileName.substring(fileName.lastIndexOf('\\')+1)
    }

  return (
    <>
        <button className="text-sm font-bold hover:bg-gray-200 p-2 rounded-md" onClick={()=>{setIsOpen(true)}}>
          <i className="fa-regular fa-plus pr-2"></i>Add Employee
        </button>
        
        <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Employee
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

                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input ref={fname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="John" required />
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input ref={lname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cin</label>
                                    <input ref={cin} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="G-739274" required />
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input ref={address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="123 Main St, City, State, Zip" required />
                                </div>
                               
                            </div>

                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                    <input ref={position} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Manager" required />
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                    <input ref={salary} type="number" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="10000" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input ref={email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="john.doe@gmail.com" required />
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input ref={phone} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="0658852014" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                    <select id="countries" ref={department} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        departments.slice(1).map((department) => (
                                            <option value={department.id} key={department.id}>{department.name}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                                    <div className='border rounded-lg border-[#d1d5db] h-11 cursor-pointe' onClick={()=>Eavatar.current.click()}>  
                                    <div className="flex divide-x-2 divide-[#d1d5db] h-full bg-[#f9fafb]">
                                        <div className="w-8/12 h-full flex items-center"><p className="text-[#787a7b] text-sm ml-3 truncate">{avatar===1? fileName : 'Upload file here'}</p></div>
                                        <div className="h-full flex items-center"><img src="Add Image.png" className="md:ml-2 lg:w-6 w-4" /><span className="text-xs lg:text-sm lg ml-2 text-[#9ca3af]">Upload</span></div>
                                    </div>
                                    <input ref={Eavatar} accept="image/*" className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={()=>{setAvatar(1), setFileName(getFileName())}}/>
                                </div>                               
                                </div>
                            </div>
         
                            <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{createEmployee()}}><i className={`${isLoading? "fa-duotone fa-spinner-third fa-spin": "fa-regular fa-plus"} mr-2`}></i>Add Employee</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

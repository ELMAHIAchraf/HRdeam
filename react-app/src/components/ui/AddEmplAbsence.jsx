import { useEffect, useRef, useState } from "react";
import { DatePicker } from "./DatePicker";
import { axiosInstance } from "@/Axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AddAbsence } from "@/State/absenceSlice";


export const AddEmplAbsence = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(0);
    const [fileName, setFileName] = useState('');
    const [employees, setEmployees] = useState([]);


    const employeeName = useRef(null);
    const type = useRef(null);
    const reason = useRef(null);
    const attachment = useRef(null);
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const getData = () => {
        return {
            type: type.current.value,
            start_date: startDate,
            end_date: endDate,
            reason: reason.current.value,
            user_id: employeeName.current.value,
            attachment: attachment.current.files[0]
        }
    }
    const dispatch = useDispatch();
    const createAbsence = async() => {
        try {
            const response = await axiosInstance.post('/absences', getData(),{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            
            })
            dispatch(AddAbsence(response.data.data))
            toast.success(response.data.message)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }
    }

    const getFileName = () => {
        const fileName=attachment.current.value
        return fileName.substring(fileName.lastIndexOf('\\')+1)
    }

    const getEmployee = async() => {
        try {
            const response = await axiosInstance.get('/data')
            setEmployees(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getEmployee()
    }, []);

  return (
    <>
        <button className="text-sm font-semibold hover:bg-gray-200 p-2 rounded-md" onClick={()=>{setIsOpen(true)}}>
          <i className="fa-regular fa-calendar-check text-lg pr-2"></i>Add to calendar
        </button>
        
        <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Employee Absence
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
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer" ref={employeeName}>
                                    <option>Select Employee</option>
                                    {
                                        employees.map((employee)=>(
                                            <option value={employee.id} key={employee.id}>{employee.fname} {employee.lname}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2"> 
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Absence Type</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer" ref={type}>
                                    <option>Select Absence Type</option>
                                    <option value="sick">Sick</option>
                                    <option value="vacation">Vacation</option>
                                    <option value="personal">Personal</option>
                                </select>
                            </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Start Date</label>
                                    <DatePicker onDateChange={(date) => setStartDate(date)} />                                
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                    <DatePicker onDateChange={(date) => setEndDate(date)} />                                
                                </div>
                            </div>

                            <div className="flex  gap-4">
                                <div className="w-full">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Reason</label>
                                    <textarea rows={6} ref={reason} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Enter the reason for the absence"  required />                               
                                </div>
                            </div>

                            <div className="flex  gap-4">
                                <div className="w-full">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">attachment</label>
                                    <div className='border rounded-lg border-[#d1d5db] h-11 cursor-pointe' onClick={()=>attachment.current.click()}>  
                                    <div className="flex divide-x-2 divide-[#d1d5db] h-full bg-[#f9fafb]">
                                        <div className="w-9/12 h-full flex items-center"><p className="text-[#787a7b] text-sm ml-3 truncate">{file===1? fileName : 'Upload attachment here'}</p></div>
                                        <div className="h-full flex items-center justify-center w-1/2"><img src="Add Image.png" className="md:ml-2 lg:w-6 w-4" /><span className="text-xs lg:text-sm lg ml-2 text-[#9ca3af]">Upload</span></div>
                                    </div>
                                    <input ref={attachment} accept="application/pdf" className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={()=>{setFile(1), setFileName(getFileName())}}/>
                                </div>                               
                                </div>
                            </div>
         
                            <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{createAbsence(); setIsOpen(false)}}><i className={`fa-regular fa-plus mr-2`}></i>Add Absence</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

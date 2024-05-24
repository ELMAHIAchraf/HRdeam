import { ClipBoard } from "@/components/ui/ClipBoard"
import { useEffect, useRef, useState } from "react"
import { DatePicker } from "@/components/ui/DatePicker";
import { axiosInstance } from "@/Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Echo from '@/pusher';
import { notify } from "@/components/ui/notify";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export const EmployeeAcc = () => {

  const [isOpen, setIsOpen] = useState(false);


  const cin = useRef(null)
  const date = useRef(null)
  const dep = useRef(null)
  const pos = useRef(null)
  const salary = useRef(null)
  const phone = useRef(null)
  const email = useRef(null)
  const address = useRef(null)
  
  const employeeId = useRef(null);
  const type = useRef(null);
  const reason = useRef(null);
  const attachment = useRef(null);

  const Opwd = useRef(null);
  const Npwd = useRef(null);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRPOpen, setRPOpen] = useState(false);

  const [employee, setEmployee] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [absences, setAbsences] = useState([]);
  const [absencesState, setAbsencesState] = useState(null);



  const copyToClipboard = (ref) => {
    navigator.clipboard.writeText(ref.current.value);
  };
  const [file, setFile] = useState(0);
  const [fileName, setFileName] = useState('');
  
  const getFileName = () => {
    const fileName=attachment.current.value
    return fileName.substring(fileName.lastIndexOf('\\')+1)
}
const convertDate = (date, full) =>{
  const doj = new Date(date);
  if(full){
      return doj.toLocaleString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric'
        });
  }else{
      return doj.toLocaleDateString('en-GB', {
          month: 'long',
          year: 'numeric' 
      });
  }
}
  const differenceInDays = (start_date, end_date) =>{
    const start = new Date(start_date);
    const end = new Date(end_date);
    const difference=end.getTime()-start.getTime();
    return Math.floor(difference/(1000*3600*24)+1);
}
  const navigate = useNavigate();
  const logout = async() =>{
    try{
        const response = await axiosInstance.post('/logout');
        sessionStorage.removeItem('token');
        navigate('/');
        toast.success(response.data.message);
    }catch(e){
        toast.error(e.response.data.message);  
    }   
  }
  const getAbsences = async(id) => {
    try{
        const response = await axiosInstance.get(`/absences/${id}`);
        setAbsences(response.data.data);
        setAbsencesState(response.data.data);
    }catch(e){
        toast.error(e.response.data.message);  
    }   
  }
  useEffect(() => {
    getAbsences(employee.id);
  }, []);
    const getData = () => {
      return {
          type: type.current.value,
          start_date: startDate,
          end_date: endDate,
          reason: reason.current.value,
          user_id: employeeId.current.value,
          attachment: attachment.current.files[0]
      }
  }
  const createAbsence = async() => {
    try {
        const response = await axiosInstance.post('/vacation', getData(),{
            headers: {
                'Content-Type': 'multipart/form-data'
            }   
        })
        toast.success(response.data.message)
        setAbsences([response.data.data, ...absences])

    } catch (error) {
      console.log(error);
        toast.error(error.response.data.message)
    }
  }
  const getAbsenceDays = (absences) => {
    if (!absences) return 0;
    let days=0;
    absences.filter(absence=>absence.status=='approved').map((absence) => {
        days+=differenceInDays(absence.start_date, absence.end_date);
    })
    return days;
}
  const filterAbsences= (e) => {
    const value = e.target.value;
    setAbsences(absencesState);
    if(value!='all')
        setAbsences(absencesState.filter(absence=>absence.status==value));
  }

  const changePassword = async() => {
    try {
        const response = await axiosInstance.post('/change-password', {
            old_password: Opwd.current.value,
            new_password: Npwd.current.value
        });
        toast.success(response.data.message);
        setRPOpen(false);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    Echo.private(`employee-channel.${JSON.parse(sessionStorage.getItem('user')).id}`)
    .listen('VacationResponseEvent', (e) => {
        notify(e);
        setAbsences(prevAbsences => prevAbsences.map((absence) => absence.id==e.absence.id ? e.absence : absence));  
        setAbsencesState(prevAbsencesState => prevAbsencesState.map((absence) => absence.id==e.absence.id ? e.absence : absence));          
    });
  }, []);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-screen p-6 bg-[#fafafa]">
      <div className={`${isRPOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
          <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Reset Password 
                      </h3>
                      <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setRPOpen(false)}>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-4 md:p-5">
                      <form className="space-y-4" action="#">
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                              <input ref={Opwd} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Old Pwd" required />
                          </div>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                              <input ref={Npwd} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="New Pwd" required />
                          </div>

                          <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={changePassword}><i className="fa-regular fa-pen-to-square pr-2"></i>Change Password</button>
                      </form>
                  </div>
              </div>
          </div>
      </div> 

      <div className="w-full rounded-lg shadow-slate-300 shadow-md  border-[1px] flex flex-col items-center relative bg-white">
        <p className="font-semibold  absolute top-4 left-4 rounded-md p-2 hover:bg-[#e5e7eb] cursor-pointer" onClick={()=>setRPOpen(true)}><i className="fa-solid fa-lock pr-2"></i>Change password</p>
        <p className="font-semibold  absolute top-14 left-4 rounded-md p-2 hover:bg-[#e5e7eb] cursor-pointer" onClick={logout}><i className="fa-solid fa-right-from-bracket pr-2"></i>Log out</p>
        <img src={employee.avatar} className="w-36 h-36 rounded-full mt-8"/>

        <div className="w-[95%]">
          <div className="text-2xl mt-2 text-center">{employee.fname} {employee.lname}</div>

          <div className="mt-4 "> 
            <div className="flex justify-between gap-x-4">
              <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
                <input ref={cin} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={employee.cin} disabled/>
                <div className="absolute top-9 right-4"  onClick={()=>copyToClipboard(cin)}><ClipBoard/></div>
              </div>
              <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of join</label>
                <input ref={date} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={employee.doj} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(date)}><ClipBoard/></div>
              </div>            
            </div>

            <div className="flex justify-between gap-x-4 mt-4">
              <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <input ref={dep} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={employee.department} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(dep)}><ClipBoard/></div>

              </div>
              <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                <input ref={pos} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300  block w-full p-2.5 truncate pr-8" defaultValue={employee.position} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(pos)}><ClipBoard/></div>
              </div>
                         
            </div>

            <div className="flex justify-between gap-x-4 mt-4">
            <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                <input ref={salary} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={`${employee.salary} MAD`} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(salary)}><ClipBoard/></div>
              </div> 
              
              <div className="w-1/2 relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input ref={phone} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={employee.phone} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(phone)}><ClipBoard/></div>
              </div>            
            </div>

            <div className="flex justify-between gap-x-4 mt-4">
              
            <div className="w-full relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input ref={email} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" defaultValue={employee.email} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(email)}><ClipBoard/></div>
            </div>  
            </div>

            <div className="w-full mt-4">
            <div className="w-full relative">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input ref={address} type="text" className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300   block w-full p-2.5" defaultValue={employee.address} disabled/>
                <div className="absolute top-9 right-4" onClick={()=>copyToClipboard(address)}><ClipBoard/></div>
            </div> 
            </div>         
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg shadow-slate-300 shadow-md  border-[1px] bg-white">
        <p className="text-2xl font-bold mt-8 ml-4">Absence Records</p>
        <p className=" mt-2 ml-4">You have utilized {getAbsenceDays(absencesState)} days of absence to date.</p>
        <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-[110px] p-2.5 cursor-pointer float-right mr-4 mb-2 shadow-slate-300 shadow-sm" onChange={filterAbsences}>
          <option value="all">All</option>
          <option value="rejected">Rejected</option>
          <option value="approved">Approved</option>
          <option value="in process">In process</option>        
          <option value="pending">Pending</option>
        </select>
        <div className="flex flex-col items-center w-[93%] h-[520PX] mt-6 ml-4 overflow-auto custom-scrollbar space-y-4">

          {
            absences && absences.sort((a, b) => a.status.localeCompare(b.status))
            .map((absence) => (

              absence.review == null ? 
              <div className="bg-[#f9fafb] hover:bg-[#e2e9eb91] shadow-slate-300 shadow-md  border-[1px] cursor-pointer rounded-lg w-full flex p-4 justify-between items-center h-[100px]" onClick={()=>{setIsOpen(true)}} key={absence.id}>
                <p>{convertDate(absence.start_date, true)}</p>
                <div className="w-[200px] ">
                  <div><p className="font-semibold">{absence.type} <span className={`pl-1 text-xs text-[#409cfe] ${absence.status}`}>({absence.status.charAt(0).toUpperCase()+absence.status.slice(1)})</span></p></div>
                    <p className="text-sm line-clamp-2">{absence.reason}</p>
                </div>
              <p>{differenceInDays(absence.start_date, absence.end_date)} day</p>                                         
              </div>
              :
              <HoverCard key={absence.id}>
              <HoverCardTrigger className="bg-[#f9fafb] hover:bg-[#e2e9eb91] shadow-slate-300 shadow-md  border-[1px] cursor-pointer rounded-lg w-full flex p-4 justify-between items-center h-[100px] " onClick={()=>{setIsOpen(true)}}>
                  <p>{convertDate(absence.start_date, true)}</p>
                  <div className="w-[200px] ">
                    <div><p className="font-semibold">{absence.type} <span className={`pl-1 text-xs text-[#409cfe] ${absence.status}`}>({absence.status.charAt(0).toUpperCase()+absence.status.slice(1)})</span></p></div>
                      <p className="text-sm line-clamp-2">{absence.reason}</p>
                  </div>
                <p>{differenceInDays(absence.start_date, absence.end_date)} day</p>                                         
              </HoverCardTrigger>
              <HoverCardContent className="flex justify-center items-center bg-[#f9f9f9] text-sm -mt-4">{absence.review}</HoverCardContent>
              </HoverCard>
            ))
          }

        </div>

        
      </div>

      <div className="w-full rounded-lg  border-[1px] bg-white shadow-slate-300 shadow-md ">
        <p className="text-2xl font-bold mt-8 ml-4">Request Vacation</p>
        <form className="space-y-4 w-[95%] mt-6 m-auto" action="#">
          <div className="flex justify-between gap-4">
          <div className="w-full"> 
              <input ref={employeeId} type="hidden" defaultValue={employee.id}/>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Absence Type</label>
              <select ref={type} className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer" >
                  <option>Select Absence Type</option>
                  <option value="sick">Sick</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal</option>
              </select>
          </div>
          </div>
          <div className="w-full">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Start Date</label>
            <DatePicker variant="shadowed" onDateChange={(date) => setStartDate(date)} />                                
          </div>
          <div className="w-full">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
            <DatePicker variant="shadowed" onDateChange={(date) => setEndDate(date)} />                                
          </div>

          <div className="flex  gap-4">
              <div className="w-full">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Reason</label>
                  <textarea rows={6} ref={reason} className="bg-gray-50 border shadow-slate-300 shadow-md  text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:shadow-slate-300 shadow-md  block w-full p-2.5" placeholder="Enter the reason for the absence"  required />                               
              </div>
          </div>

          <div className="flex  gap-4 cursor-pointer">
              <div className="w-full">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">attachment</label>
                <div className='border rounded-lg shadow-slate-300 shadow-md  h-11 cursor-pointe' onClick={()=>attachment.current.click()}>  
                  <div className="flex divide-x-2 divide-[#acb2bd] h-full bg-[#f9fafb]">
                      <div className="w-9/12 h-full flex items-center"><p className="text-[#787a7b] text-sm ml-3 truncate">{file===1? fileName : 'Upload attachment here'}</p></div>
                      <div className="h-full flex items-center justify-center w-1/2"><img src="Add Image.png" className="md:ml-2 lg:w-6 w-4" /><span className="text-xs lg:text-sm lg ml-2 text-[#9ca3af]">Upload</span></div>
                  </div>
                  <input ref={attachment} accept="application/pdf" className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={()=>{setFile(1), setFileName(getFileName())}}/>
              </div>                               
              </div>
          </div>

          <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createAbsence}><i className={`fa-regular fa-plus mr-2`}></i>Request Vacation</button>
      </form>
      </div>

      {
            absences && absences.map((absence) => (
              <>

          <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
                <div className="relative p-4 w-full max-w-2xl max-h-2xl">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachment</h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                </div>
                        <div className="p-4 md:p-5">
                            <iframe src={`http://127.0.0.1:8000/storage/Attachments/${absence.id}.pdf#zoom=50`} width="600px" height="610px"  className="rounded-lg"/>
                        </div>
                    </div>
                </div>
            </div> 
            </>
            ))
          }
    </div>
  )
}


import { axiosInstance } from "@/Axios";
import { deleteApplicant, modifyStatus } from "@/State/applicantsSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
export const ApplicantCard = ({applicant}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddAsEmpOpen, setIsAddAsEmpOpen] = useState(false);

    const nextStatus = (status) => {
        switch (status) {
            case 'Applied':
                return 'Interview';
            case 'Interviewed':
                return 'Make offer';
            case 'Made_offer':
            case 'Made offer':
                return 'Hire';
            case 'Hired':
                return 'onboard';
        }
    }
    const dispatch = useDispatch();
    const reject = async (id, list) => {
        try {
            if (list === 'Made offer') list='Made_offer'
            
            const response = await axiosInstance.delete(`applicants/${id}`);
            dispatch(deleteApplicant({applicantId: id, list: list}));
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Failed to reject applicant");
        }
    }



    const cin = useRef(null);
    const address = useRef(null);
    const salary = useRef(null);
    const phone = useRef(null);
    const Eavatar = useRef(null);
    const id = useRef(null);

    const [avatar, setAvatar] = useState(0);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const getFileName = () => {
        const fileName=Eavatar.current.value
        return fileName.substring(fileName.lastIndexOf('\\')+1)
    }


    const changeStatus = async (id, status) => {
        try {
            if (status === 'Hired'){
                setIsAddAsEmpOpen(true);
            }else{
                const response = await axiosInstance.put(`changeStatus?id=${id}`);
                dispatch(modifyStatus({applicantId: id, status: response.data.data.status}));
                toast.success(response.data.message);
            }
            
        } catch (error) {
            toast.error("Failed to change status");
            console.log(error);
        }
    }
    const getData = () => {
        return {
            id: id.current.value,
            cin: cin.current.value,
            salary: salary.current.value,
            phone: phone.current.value,
            address: address.current.value,
            avatar: Eavatar.current.files[0],
        }
    }
    const onboard = async () => {
        try{
            setIsLoading(true);
            const response = await axiosInstance.post('/onboard', getData(), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 8000,
            });
            dispatch(deleteApplicant({ applicantId: response.data.data.id, list: "Hired" }));
            setIsLoading(false);
            setIsAddAsEmpOpen(false);
            toast.success(response.data.message);
        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
         <div className="bg-white rounded-lg shadow-slate-300 shadow-md p-4 mt-2 w-96 h-54">
                  <div className="flex justify-between">
                      <p className="font-bold text-md">{applicant.fname} {applicant.lname}</p>
                      <DropdownMenu>
                      <DropdownMenuTrigger className=" px-3 py-1 hover:bg-[#eeeeee] rounded-md"><i className="fa-regular fa-ellipsis-vertical fa-rotate-90 text-[#cac7c7]"></i></DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem className="focus:bg-green-100" onClick={()=>changeStatus(applicant.id, applicant.status)}><i className="fa-regular fa-user-check pr-2" ></i>{nextStatus(applicant.status)}</DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-red-100" onClick={()=>reject(applicant.id, applicant.status)}><i className="fa-regular fa-user-slash pr-2"></i>Rejected</DropdownMenuItem>

                      </DropdownMenuContent>
                      </DropdownMenu> 
                  </div>
                  <a href="mailto:elmahi.achraf9@gmail.com" className="text-[#737373] underline text-sm ">{applicant.email}</a>
                 <div>
                 <div className="bg-[#ffd0d0] px-4 py-1 rounded-md mt-4 inline-block cursor-pointer" onClick={()=>{setIsOpen(true)}}>
                      <p className="text-[#b34949] text-sm font-bold"><i className="fa-regular fa-file-user pr-2 text-lg"></i>Resume</p>
                  </div><br />
                 <div className="bg-[#f8eebf] px-4 py-2 rounded-md mt-2 inline-block">
                      <p className="text-[#6b5807] text-sm font-bold"><i className="fa-solid fa-code pr-2"></i>{applicant.announcement.position}</p>
                  </div><br />
                  <div className="bg-[#e3e5fd] px-5 py-2 rounded-md mt-2 inline-block">
                      <p className="text-[#353da8] text-sm font-bold">{applicant.announcement.departement.name}</p>
                  </div>
                 </div>
              </div>
              <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#00000007]`} >
                <div className="relative p-4 w-full max-w-2xl max-h-2xl">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applicant Resume</h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                </div>
                        <div className="p-4 md:p-5">
                            <iframe src={`http://127.0.0.1:8000/storage/Resumes/${applicant.id}.pdf#zoom=10`} width="600px" height="610px"  className="rounded-lg"/>
                        </div>
                    </div>
                </div>
            </div> 


            <div className={`${isAddAsEmpOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                           Onboard
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsAddAsEmpOpen(false)}>
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
                                    <input ref={id} type="hidden" value={applicant.id} />
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
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input ref={phone} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="0658852014" required />
                                </div>
                                <div className="w-1/2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                    <input ref={salary} type="number" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="10000" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                
                                <div className="w-full">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                                    <div className='border rounded-lg border-[#d1d5db] h-11 cursor-pointe' onClick={()=>Eavatar.current.click()}>  
                                    <div className="flex divide-x-2 divide-[#d1d5db] h-full bg-[#f9fafb]">
                                        <div className="w-8/12 h-full flex items-center"><p className="text-[#787a7b] text-sm ml-3 truncate">{avatar===1? fileName : 'Upload file here'}</p></div>
                                        <div className="h-full flex items-center"><img src="Add Image.png" className="md:ml-2 lg:w-6 w-4" /><span className="text-xs lg:text-sm lg ml-2 text-[#9ca3af]">Upload</span></div>
                                    </div>
                                    <input ref={Eavatar} accept="image/jpg" className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  type="file" onChange={()=>{setAvatar(1), setFileName(getFileName())}}/>
                                </div>                               
                                </div>
                            </div>
         
                            <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>onboard()}><i className={`${isLoading? "fa-duotone fa-spinner-third fa-spin": "fa-regular fa-plus"} mr-2`}></i>Add as an Employee</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

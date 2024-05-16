import { axiosInstance } from "@/Axios";
import {
    Drawer,
    DrawerContent, 
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { timeSince } from "@/helpers/timeSince";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const JobDrawer = ({announcement}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setAvatar] = useState(0);
    const [fileName, setFileName] = useState('');

    const announcementId = useRef(null);
    const fname = useRef(null);
    const lname = useRef(null);
    const email = useRef(null);
    const resume = useRef(null);

    const getData=()=>{
        return {
            announcement_id:announcementId.current.value,
            fname:fname.current.value,
            lname:lname.current.value,
            email:email.current.value,
            resume:resume.current.files[0]
        }
    }

    const apply=async()=>{
        try {
            const response = await axiosInstance.post('/applicants',getData(), {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(response.data.data);
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getFileName = () => {
        const fileName=resume.current.value
        return fileName.substring(fileName.lastIndexOf('\\')+1)
    }
    const transformtoList=(text)=>{
        return text.split('-').slice(1).map((item, key) => {
            return <li key={key} className="text-lg mt-4">{item}</li>
        })
    }
  return (
        <Drawer>
        <DrawerTrigger className="p-2 border-[#e5e7eb] border text-sm  rounded-md ml-2 mt-2">Details</DrawerTrigger>
        <DrawerContent>
            <div className="flex flex-col items-center">
                <div className="w-2/3 ">
                    <p className="font-bold text-4xl text-center mt-4">{announcement.title}</p>
                    <div className="w-[390px] flex justify-between">
                        <p className="font-bold  text-[#007cff] mt-2"><i className="fa-regular fa-building-user pr-2 text-lg"></i>{announcement.departement.name} department</p>
                        <p className="font-bold  text-yellow-500 mt-2 ml-2"><i className="fa-regular fa-calendar  pr-2 text-lg"></i>Posted {timeSince(new Date(announcement.created_at))}</p>
                    </div>
                    <div className="h-[470px] overflow-auto custom-scrollbar mt-4">
                        <p className="font-bold text-xl">Job Description</p>
                        <p className="text-lg mt-4">{announcement.description}</p>
                        <p className="font-bold text-xl mt-4">Profile Requirements</p>
                        <ul className="list-disc list-inside">
                            {transformtoList(announcement.profile)}
                        </ul>
                        <p className="font-bold text-xl mt-4">Social Advantages & others</p>
                        <p className="text-lg mt-4">{announcement.advantages}</p>
                        <p className="font-semibold text-green-600">Salaire: {announcement.salary} MAD</p>
                    </div>
                </div>
                <button className="py-1 px-12 rounded-md border-[#e5e7eb] border font-semibold mt-1 text-white bg-[#007cff]" onClick={()=>setIsOpen(true)}>Apply for this job</button>

                
                <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
                    <div className="relative p-4 w-full max-w-lg max-h-full  -mt-32">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Apply for this job
                                </h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 ">
                                        <input ref={announcementId} type="hidden" value={announcement.id} />
                                        <div>
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                            <input ref={fname}  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Enter your first name" required />
                                        </div>
                                        <div>
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Last Name</label>
                                            <input ref={lname}  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Enter your last name" required />
                                        </div>    
                                        <div>
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Email</label>
                                            <input ref={email}  type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Enter your email" required />
                                        </div>  
                                        <div>
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Resume</label>
                                            <div className='border rounded-lg border-[#d1d5db] h-11 cursor-pointe' onClick={()=>resume.current.click()}>  
                                            <div className="flex divide-x-2 divide-[#d1d5db] h-full bg-[#f9fafb]">
                                                <div className="w-8/12 h-full flex items-center"><p className="text-[#787a7b] text-sm ml-3 truncate">{avatar===1? fileName : 'Upload file here'}</p></div>
                                                <div className="h-full flex items-center"><img src="Add Image.png" className="md:ml-2 lg:w-6 w-4" /><span className="text-xs lg:text-sm lg ml-2 text-[#9ca3af]">Upload</span></div>
                                            </div>
                                            <input ref={resume} accept=".pdf" className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={()=>{setAvatar(1), setFileName(getFileName())}}/>
                                        </div>                               
                                        </div>                    
                                    <button type="button" className="w-full mt-4 text-white bg-[#007cff] hover:bg-[#085ec5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>{apply(); setIsOpen(false)}}><i className={`fa-solid fa-arrow-up-right-from-square mr-2`}></i>Apply</button>    
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </DrawerContent>
        </Drawer>
  )
}
  
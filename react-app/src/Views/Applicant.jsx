import { axiosInstance } from "@/Axios";
import { setApplicants } from "@/State/applicantsSlice";
import { ApplicantCard } from "@/components/ui/ApplicantCard"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


export const Applicant = () => {
  const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const fetcheData = async () => {
      try {
        const hr_id = JSON.parse(sessionStorage.getItem('user')).id
      
        const response = await axiosInstance.get(`/applicants?user_id=${hr_id}`);
        dispatch(setApplicants(response.data.data));
        
      } catch (error) {
        toast.error("Failed to fetch data");
      } 
    }
    useEffect(() => {
      fetcheData();
    }, []);

    const applicants = useSelector((state) => state.applicants);

    const title = useRef(null);
    const description = useRef(null);
    const profile = useRef(null);
    const advantages = useRef(null);
    const position = useRef(null);
    const department = useRef(null);
    const salary = useRef(null);

    const getData=()=>{
      return {
        title: title.current.value,
        description: description.current.value,
        profile: profile.current.value,
        advantages: advantages.current.value,
        position: position.current.value,
        departement_id: department.current.value,
        salary: salary.current.value,
        user_id: JSON.parse(sessionStorage.getItem('user')).id
      }
    }
    const createAnnouncement = async () => {
      try {
        const response = await axiosInstance.post('/announcements', getData());
        toast.success(response.data.message);
      } catch (error) {
        toast.error("Failed to create announcement");
      }
    }


    return (
    <div className="md:ml-80 mt-16 w-79 h-166 ">
        <p className="font-bold text-2xl ml-6 pt-4">Applicant tracker</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">Her&apos;s your selection process overview.</p>
        
        <div className="flex justify-end -mt-2">
          <button className="text-sm font-bold px-2 py-3 rounded-md bg-[#007cff] hover:bg-[#085ec5] text-white mr-6" onClick={()=>setIsOpen(true)}>
            <i className="fa-regular fa-plus pr-2"></i>Add Announcement
          </button>

          <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
            <div className="relative p-4 w-full max-w-5xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Announcement
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 ">
                            <div className="flex space-x-6">
                              <div className="w-1/2 space-y-2 pl-6">
                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                                    <input ref={title} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Enter the job title" required />
                                </div>
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
                                  <textarea ref={description}  rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe the job responsibilities"></textarea>
                                </div>
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Requirements</label>
                                  <textarea ref={profile} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe the profile requirements"></textarea>
                                </div>
                              </div>
                          
                              <div className=" w-1/2 space-y-2 border-l-2 px-6">
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Advantages and others</label>
                                  <textarea ref={advantages} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe the social advantages"></textarea>
                                </div>
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                  <input ref={position} type="text"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the position"></input>
                                </div>
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                  <select ref={department} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="1">IT</option>
                                  </select>
                                </div>
                                <div>      
                                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                  <input ref={salary} type="number"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the expected salary"></input>
                                </div>
                              </div>
                            </div>  
                            <button type="button" className="w-full mt-4 text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{createAnnouncement(), setIsOpen(false)}}><i className={`fa-regular fa-plus mr-2`}></i>Add Announcement</button>    
                    </div>
                </div>
            </div>
        </div> 
          
        </div>
        
        <div className="border-t-2 mt-1 w-96 ml-6 border-[#e7e7e7] flex h-[550px]">
          <div className="w-1/4">
              <p className="font-bold text-lg ml-2 pt-4 mb-2">Applied</p>
              <div className=" h-[480px] overflow-auto custom-scrollbar">
                {
                  applicants.Applied.map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  ))
                }
              </div>    
          </div>
          <div className="w-1/4">
              <p className="font-bold text-lg ml-2 pt-4">Interviewed</p>
              <div className=" h-[480px] overflow-auto custom-scrollbar">
                {
                  applicants.Interviewed.map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  ))
                }
              </div>  
          </div>
          <div className=" w-1/4">
            <p className="font-bold text-lg ml-2 pt-4">Made offer</p>
            <div className=" h-[480px] overflow-auto custom-scrollbar">
                {
                  applicants.Made_offer.map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  ))
                }
              </div>  
          </div>
          <div className=" w-1/4">
            <p className="font-bold text-lg ml-2 pt-4">Hired</p>
            <div className=" h-[480px] overflow-auto custom-scrollbar">
                {
                  applicants.Hired.map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  ))
                }
              </div>  
          </div>

        </div>
    </div>
  )
}

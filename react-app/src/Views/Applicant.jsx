import { axiosInstance } from "@/Axios";
import { setApplicants } from "@/State/applicantsSlice";
import { ApplicantCard } from "@/components/ui/ApplicantCard"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


export const Applicant = () => {

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



    return (
    <div className="md:ml-80 mt-16 w-79 h-166 ">
        <p className="font-bold text-2xl ml-6 pt-4">Applicant tracker</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">Her&apos;s your selection process overview.</p>
        

        
        <div className="border-t-2 mt-8 w-96 ml-6 border-[#e7e7e7] flex h-[550px]">
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

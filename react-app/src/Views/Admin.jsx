import { axiosInstance } from "@/Axios";
import { AddHr } from "@/components/AddHr";
import { HrTable } from "@/components/ui/HrTable";
import { Loading } from "@/components/ui/Loading";
import { useEffect, useState } from "react";

export const Admin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [HRs, setHRs] = useState([]);
    const getHrs = async()=>{
        try {
            setIsLoading(true)
            const response = await axiosInstance.get('/admin');
            setHRs(response.data.data)
        } catch (error) {
            console.error(error.response);
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if(HRs.length==0) getHrs();
    }, []);
  return (
    isLoading?
    <Loading />:

    <div className="flex">
    <div className="h-screen md:w-[320px] flex-shrink-0"></div>
    <div className="mt-16 md:w-[79%] lg:w-[79%] sm:w-full h-166 ">
        <p className="font-bold text-2xl ml-6 pt-4">Human Resources</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">{HRs.length} Personnel</p>
        <div className="flex justify-end mr-6">
          <AddHr setHRs={setHRs}/>
        </div>
        <div className="max-h-[485px] w-95 ml-4 md:ml-8 border-t-[1px] border-b-[1px] overflow-auto custom-scrollbar ">
          <HrTable HRs={HRs} setHRs={setHRs}/>
        </div>
    </div>
  </div>
  )
}

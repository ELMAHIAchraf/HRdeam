import { axiosInstance } from "@/Axios"
import { AbscenceCard } from "@/components/ui/AbscenceCard"
import { DepartmentComp } from "@/components/ui/DepartmentComp"
import { Loading } from "@/components/ui/Loading";
import { Request } from "@/components/ui/Request";
import Echo from '@/pusher';
import { useEffect, useState } from "react";

export const Home = () => {
    const [absenceData, setAbsenceData] = useState({absenceRate: 0, absenceHours: 0, absenceCost: 0});
    const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        Echo.channel('Notification')
        .listen('NotificationEvent', (e) => {
            console.log(e);
        });
      }, []);

    const getData = async () => {
        try {
          setIsLoading(true)
          const response = await axiosInstance.get('/dashboard')
          setAbsenceData(response.data.data)
        } catch (error) {
          console.error(error)
        }finally {
          setIsLoading(false)
        }
    }
    useEffect(() => {
      getData();
      // notify("Welcome to your dashboard!")
    }, []);
    

    const todayDate = () => {
      const today = new Date();
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return `Today, ${today.toLocaleDateString('en-US', options)}`;
    }
  return (
    isLoading?
    <Loading />:

    <div className="md:ml-80 mt-16 w-79 h-166">
        <p className="font-bold text-2xl ml-6 pt-4">Dashboard</p>
        <div className="flex justify-between ml-6 mt-4 w-55/100">
          <AbscenceCard title="Absence rate" value={Math.round(absenceData.absenceRate)} metric="%" status={`${absenceData.absenceRate > 0 ? "up" : "down"}`}/>
          <AbscenceCard title="Absence hours" value={absenceData.absenceHours} metric="hours" status={`${absenceData.absenceHours > 0 ? "up" : "down"}`}/>
          <AbscenceCard title="Absence cost" value={absenceData.absenceCost} metric="MAD" status={`${absenceData.absenceCost > 0 ? "up" : "down"}`}/>
        </div>
        <DepartmentComp />
        <div className="bg-[#f4f4f4] border-l-2 w-[32.5%] h-[670px] fixed top-16 right-0">
          <div className="flex justify-between items-end h-12">
              <p className="font-bold  ml-4 text-lg">Vacation Requests</p>
              <p className="bg-[#c5e0ff] rounded-md h-8 px-2 flex justify-center items-center font-semibold text-sm mr-4">{todayDate()}</p>
          </div>
          <p className="text-[#737373] text-sm ml-4 mt-2">2 active requests</p>
          <div className="h-[560px] overflow-auto custom-scrollbar">
            <Request pending={true}/>
            <Request pending={false}/> 
            <Request pending={false}/>
            <Request pending={false}/>
            <Request pending={false}/>

          </div>
        </div>
    </div>
  )
}

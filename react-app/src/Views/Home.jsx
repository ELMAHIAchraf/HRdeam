import { axiosInstance } from "@/Axios"
import { AbscenceCard } from "@/components/ui/AbscenceCard"
import { DepartmentComp } from "@/components/ui/DepartmentComp"
import { Loading } from "@/components/ui/Loading";
import { Request } from "@/components/ui/Request";
import { notify } from "@/components/ui/notify";
import Echo from '@/pusher';
import { useEffect, useState } from "react";

export const Home = () => {
    const [absenceData, setAbsenceData] = useState({absenceRate: 0, absenceHours: 0, absenceCost: 0});
    const [isLoading, setIsLoading] = useState(false);

    const [requests, setRequests] = useState([]);

    

    useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('VacationRequestEvent', (e) => {
        notify(e);
        setRequests(requests => [e.request, ...requests]);
      });
    }, []);

    useEffect(() => {
      Echo.private(`HR-channel.${JSON.parse(localStorage.getItem('user')).id}`)
      .listen('ManageVacationRequestEvent', (e) => {
         notify(e);
         if(e.action === 'delete'){
          setRequests(requests => requests.filter(request => request.id !== e.data.id));
         }else{
          setRequests(requests => requests.map(request => request.id === e.data.id ? e.data : request));
         }
      });
      
    }, []); 

    const getVacationRequests = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/getVacationRequests')
        setRequests(response.data.data)
      } catch (error) {
        console.error(error)
      }finally {
        setIsLoading(false)
      }
    }

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
      getVacationRequests();
    }, []);
    

    const todayDate = () => {
      const today = new Date();
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return `Today, ${today.toLocaleDateString('en-US', options)}`;
    }
  return (
    isLoading?
    <Loading />:


    <div className="flex">
    <div className="h-screen md:w-[320px] flex-shrink-0"></div>
    <div className="mt-16 w-full md:w-[79%] lg:w-[79%]  sm:w-full h-166 flex flex-col lg:flex-row">
      <div className="w-full lg:w-[59%]">
          <p className="font-bold text-2xl ml-6 pt-4">Dashboard</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 px-6">
            <AbscenceCard title="Absence rate" value={Math.round(absenceData.absenceRate)} metric="%" status={`${absenceData.absenceRate > 0 ? "up" : "down"}`}/>
            <AbscenceCard title="Absence hours" value={absenceData.absenceHours} metric="hours" status={`${absenceData.absenceHours > 0 ? "up" : "down"}`}/>
            <AbscenceCard title="Absence cost" value={absenceData.absenceCost} metric="MAD" status={`${absenceData.absenceCost > 0 ? "up" : "down"}`}/>
          </div>
          <div className="px-6"><DepartmentComp /></div>
      </div>

        <div className="bg-[#f4f4f4] border-l-2 w-full lg:w-[495px] h-[670px] ">
          <div className="flex justify-between items-end h-12">
              <p className="font-bold  ml-4 text-lg">Vacation Requests</p>
              <p className="bg-[#c5e0ff] rounded-md h-8 px-2 flex justify-center items-center font-semibold text-sm mr-4">{todayDate()}</p>
          </div>
          <p className="text-[#737373] text-sm ml-4 mt-2">{requests.length} active requests</p>
          <div className="h-[560px] overflow-auto custom-scrollbar mt-3">
          {
            [...requests].sort((a, b) => {
              if (a.hr?.id === JSON.parse(localStorage.getItem('user')).id) return -1;
              if (b.hr?.id === JSON.parse(localStorage.getItem('user')).id) return 1;
              return b.status.localeCompare(a.status);
            }).map(request => {
              return <Request key={request.id} pending={request.status==='pending' ? false : true} vacRequest={request} setRequests={setRequests} requests={requests} />
            })
          }
          </div>
        </div>
    </div>
  </div>
  )
}

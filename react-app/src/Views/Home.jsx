import { axiosInstance } from "@/Axios"
import { AbscenceCard } from "@/components/ui/AbscenceCard"
import { DepartmentComp } from "@/components/ui/DepartmentComp"
import { useEffect, useState } from "react";

export const Home = () => {
    const [absenceData, setAbsenceData] = useState({absenceRate: 0, absenceHours: 0, absenceCost: 0});

    const getData = async () => {
        try {
          const response = await axiosInstance.get('/dashboard')
          setAbsenceData(response.data.data)
        } catch (error) {
          console.error(error)
        }
    }
    useEffect(() => {
      getData();
    }, []);

  return (
    <div className="md:ml-80 mt-16 w-79 h-166">
        <p className="font-bold text-2xl ml-6 pt-4">Dashboard</p>
        <div className="flex justify-between ml-6 mt-4 w-55/100">
          <AbscenceCard title="Absence rate" value={Math.round(absenceData.absenceRate)} metric="%" status={`${absenceData.absenceRate > 0 ? "up" : "down"}`}/>
          <AbscenceCard title="Absence hours" value={absenceData.absenceHours} metric="hours" status={`${absenceData.absenceHours > 0 ? "up" : "down"}`}/>
          <AbscenceCard title="Absence cost" value={absenceData.absenceCost} metric="MAD" status={`${absenceData.absenceCost > 0 ? "up" : "down"}`}/>
        </div>
        <DepartmentComp />
    </div>
  )
}

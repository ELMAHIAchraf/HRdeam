import { axiosInstance } from "@/Axios"
import { initializeCount } from "@/State/countSlice"
import { AddEmployee } from "@/components/ui/AddEmployee"
import { EmployeePagination } from "@/components/ui/EmployeePagination"
import { EmployeesTable } from "@/components/ui/EmployeesTable"
import { Loading } from "@/components/ui/Loading"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const Employees = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const getCount = async()=>{
    try {
        setIsLoading(true)
        const response = await axiosInstance.get('/count')
        dispatch(initializeCount(response.data.data))   
    } catch (error) {
        console.error(error);
    }finally{
        setIsLoading(false)
    }
    }
    useEffect(() => {
        getCount()
    }, [])
    const count = useSelector((state) => state.count.count);
    
  return (
    isLoading?
    <Loading />:

    <div className="flex">
    <div className="h-screen md:w-[320px] flex-shrink-0"></div>
    <div className="mt-16 md:w-[79%] lg:w-[79%] w-full h-166">
        <p className="font-bold text-2xl ml-6 pt-4">Employees</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">{count} Personnel</p>
        <div className="flex justify-end mr-6">
          <AddEmployee />
        </div>
        <div className="h-[485px] w-[95%] md:w-[97%] ml-3 md:ml-4 overflow-hidden   border-t-[1px] border-b-[1px]">
          <EmployeesTable />
        </div>
        <div className="flex h-16">
          <EmployeePagination />
        </div>
    </div>
  </div>

  )
}

import { axiosInstance } from "@/Axios"
import { initializeCount } from "@/State/countSlice"
import { AddEmployee } from "@/components/ui/AddEmployee"
import { EmployeePagination } from "@/components/ui/EmployeePagination"
import { EmployeesTable } from "@/components/ui/EmployeesTable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const Employees = () => {
  // const employee = useSelector((state) => state.employee)
  
  const dispatch = useDispatch();
  const getCount = async()=>{
    try {
        const response = await axiosInstance.get('/count')
        dispatch(initializeCount(response.data.data))   
    } catch (error) {
        console.error(error);
    }
    }
    useEffect(() => {
        getCount()
    }, [])
    const count = useSelector((state) => state.count.count);
    
  return (
    <div className="md:ml-80 mt-16 w-79 h-166">
        <p className="font-bold text-2xl ml-6 pt-4">Employees</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">{count} Personnel</p>
        <div className="flex justify-end mr-6">
          <AddEmployee />
        </div>
        <div className="h-[485px] w-95 ml-8 border-t-[1px] border-b-[1px]">
          <EmployeesTable />
        </div>
        <div className="flex h-16">
          <EmployeePagination />
        </div>
    </div>

  )
}

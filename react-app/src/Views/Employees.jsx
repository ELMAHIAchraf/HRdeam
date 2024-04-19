import { axiosInstance } from "@/Axios"
import { initializeCount } from "@/State/countSlice"
import { AddEmployee } from "@/components/ui/AddEmployee"
import { EmployeePagination } from "@/components/ui/EmployeePagination"
import { EmployeesTable } from "@/components/ui/EmployeesTable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const Employees = () => {
  const employee = useSelector((state) => state.employee)

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
    <div className="fixed left-80 top-16 w-full h-full">
        <p className="font-bold text-2xl ml-6 mt-6">Employees</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">{count} Personnel</p>
        <div className="flex w-9/12 justify-end ml-4">
          <AddEmployee />
        </div>
        <div>
          <EmployeesTable />
        </div>
        <div className="flex w-9/12 ml-4 fixed bottom-8">
          <EmployeePagination />
        </div>
    </div>

  )
}

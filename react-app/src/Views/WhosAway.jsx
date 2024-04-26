import { AddEmplAbsence } from "@/components/ui/AddEmplAbsence"
import { CalendarPagination } from "@/components/ui/CalendarPagination"
import { useSelector } from "react-redux"

export const WhosAway = () => {
  const absence = useSelector((state) => state.absence) 
  return (
    <div className="md:ml-80 mt-16 w-79 h-166 ">
        <p className="font-bold text-2xl ml-6 pt-4">Who&apos;s away</p>
        <p className="text-[#737373] text-sm mt-2 ml-6">{absence.absentCount} people away this month</p>

        <div className="flex mr-6 justify-end space-x-4"> 
          <div className="flex items-center spa">
            <div className="w-3 h-3 rounded-full bg-red-200" />
            <p className="text-sm font-semibold ml-1">Away</p>
          </div>
      
          <div>
            <AddEmplAbsence />
          </div>
        </div>
          <CalendarPagination />
        
    </div>
  )
}

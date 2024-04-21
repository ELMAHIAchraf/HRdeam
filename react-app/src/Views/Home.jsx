import { AbscenceCard } from "@/components/ui/AbscenceCard"
import { DepartmentComp } from "@/components/ui/DepartmentComp"

export const Home = () => {
  return (
    <div className="md:ml-80 mt-16 w-79 h-166">
        <p className="font-bold text-2xl ml-6 pt-4">Dashboard</p>
        <div className="flex justify-between ml-6 mt-4 w-55/100">
          <AbscenceCard title="Absence rate" value="9" metric="%" status="up"/>
          <AbscenceCard title="Absence hours" value="12" metric="hours" status="up"/>
          <AbscenceCard title="Absence cost" value="1,432" metric="$" status="down"/>
        </div>
        <DepartmentComp />
    </div>
  )
}

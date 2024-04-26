import { JobDrawer } from "./JobDrawer"

export const JobCard = ({announcement}) => {
  return (
    <div>
        <div className=" w-[300px] h-[300px] shadow-slate-300 shadow-md rounded-lg ">
            <div className="flex items-center justify-between px-4 mt-2">
                <p className="font-bold text-lg truncate">{announcement.title}</p>
                <JobDrawer announcement={announcement}/>
            </div>
            <p className="text-[#6e7582] font-semibold ml-4 text-sm">{announcement.departement.name} department</p>
            <p className=" font-semibold ml-4 text-sm mt-1">{announcement.salary} MAD</p>
            <hr className="w-11/12 ml-3 mt-2"/>
            <div className="w-11/12 ml-4 mt-3">
                <p className="text-sm font-extrabold ">Job description</p>
                <p className="text-sm mt-2">{announcement.description}</p>
            </div>

        </div>
    </div>
  )
}

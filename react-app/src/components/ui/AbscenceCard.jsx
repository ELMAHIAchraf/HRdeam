
export const AbscenceCard = ({title, value, metric, status}) => {
  return (
    <div className="bg-white w-52 p-6 shadow-slate-300 shadow-md rounded-lg">
        <div className="flex justify-between  items-center">
            <p className="font-semibold text sm">{title}</p>
            <i className={`fa-regular text-lg ${status==='up' ? 'fa-chart-line-up text-red-600' : 'fa-chart-line-down text-green-600'} `}></i>
            {/* <i className="fa-solid fa-chart-line-down"></i> */}
        </div>
        <p className="text-[#007cff] text-2xl font-bold">{value} {metric}</p>
        <p className="text-[#737373] font-light">vs. Previous month</p>
    </div>
  )
}

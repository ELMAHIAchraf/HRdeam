import { useSelector } from "react-redux"

export const NavBar = () => {
    const data = useSelector(state => state.user);
    const dojStr = data.doj
    const doj = new Date(dojStr);
    const formattedDoj = doj.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric' 
    });
  return (
    
    <>
    <div className="bg-white w-full h-16 fixed top-0 flex items-center border-2 border-[#ebebeb]">
        
        <div className="flex ml-80 w-full justify-between">

            <div className="bg-[#fafafa] w-1/3 rounded-md border-2 border-[#e0e0e0] px-3 flex justify-between ml-8">
                <input className="bg-[#fafafa] outline-none text-sm w-full" type="text" placeholder="Search"/>
                <button><i className="fa-solid fa-magnifying-glass text-[#737373]"></i></button>
            </div>

            <div className="flex items-center gap-4 mr-4">
                <img className="w-10 h-10 rounded-full" src={data.avatar} alt=""/>
                <div className="font-medium dark:text-white">
                    <p>{data.lname} {data.fname}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in {formattedDoj}</div>
                </div>
            </div>
        </div>
    </div>
    </>

  )
}

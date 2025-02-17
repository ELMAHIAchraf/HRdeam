import { axiosInstance } from "@/Axios"
import { setAnnouncements } from "@/State/announcementsSlice";
import { JobCard } from "@/components/ui/JobCard"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export const Announcements = () => {
    const dispatch = useDispatch();

    const title = useRef(null);
    
    const [search, setSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    const getData=async()=>{
        try {
            setIsLoading(true)
            const response=await axiosInstance.get('/getJobs')
            dispatch(setAnnouncements(response.data.data))
            setSearch(response.data.data)
        } catch (error) {
            console.log(error)
        }finally {
            setIsLoading(false)
          }
    }
    useEffect(()=>{
        getData()
    },[])

    const announcements = useSelector(state => state.announcements)
    
    const handleSearchClick = () => {
        if(title.current.value !== ''){
            setSearch(announcements.filter(announcement => announcement.title.toLowerCase().includes(title.current.value.toLowerCase())));
        }else{
            setSearch(announcements)
        }
    };
    
  return (
    isLoading?
    <div className="flex justify-center items-center h-screen">
        <i className="fa-duotone fa-spinner-third fa-spin text-6xl text-[#007cff]"></i>
    </div>:
    
    <div className="flex">
    <div>
        <div className='bg-[#007cff] w-screen h-[330px] md:h-[300px] flex items-center '>
            <div className="ml-4 md:ml-24 space-y-6">
                <p className="text-5xl text-white font-bold">Discover Your Next Role with Us!</p>
                <p className="text-xl text-white font-bold">
                    Discover Your Next Role with Us! Explore our curated list of job openings  across various fields <br/> and find the perfect fit for your skills and experience within our company.
                </p>
                <div>
                    <input ref={title} type="text" className='w-[300px] h-[40px] rounded-md text-sm px-4'  placeholder='Search job titles...'/>
                    <button className="px-4 py-2 bg-[#0d529b] text-white rounded-md ml-2" onClick={()=>handleSearchClick()}>Search</button>
                </div>
            </div>
        </div>

        {
            search!="" ? 
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-10/12 m-auto mt-8">
                {
                    search.map((search)=>(
                        <JobCard key={search.id} announcement={search}/>
                    ))
                }
                </div>:
                
                <div className=" w-10/12 h-[370px] md:h-[400px] m-auto mt-8 flex justify-center items-center">
                    <div className="flex justify-center items-center w-11/19 py-2 text-[#ef4444] px-4 bg-[#fef2f2] border-[#ef4444] border-2 rounded-md font-bold">
                        <i className="fa-regular fa-triangle-exclamation text-[#ef4444] pr-2 text-xl"></i>Sorry, there are currently no positions available matching that description. Please try again later.
                    </div>
                </div>        
        }
    </div>
    </div>
  )
}

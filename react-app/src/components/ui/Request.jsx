import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  

export const Request = ({pending}) => {
  return (
    <HoverCard>
    <HoverCardTrigger>
        <div className='bg-white mt-3 w-11/12 h-32 rounded-lg border-2 ml-5'>
            <div className='flex justify-between mt-2 ml-2'>
                <div className='flex justify-between items-center'>
                    <div className="relative">
                        <div className={`${pending ? "bg-green-800" : "bg-red-800"} w-2 h-2 rounded-full animate-ping`}></div>
                        <div className={`${pending ? "bg-green-700" : "bg-red-700"} w-[6px] h-[6px] rounded-full absolute top-[1px] left-[1px]`}></div>
                    </div>
                    <img src="Gh0st.jpg" className='w-8 h-8 rounded-full ml-2'/>
                    <p className='ml-2 text-sm font-semibold text-[#373535]'>Achraf Elmahi</p>
                </div>
                <div className="mr-2">
                    <DropdownMenu>
                    <DropdownMenuTrigger className={` px-3 py-1 hover:bg-[#eeeeee] rounded-md ${pending && "cursor-not-allowed"}`} disabled={pending && "disabled"} ><i className="fa-regular fa-ellipsis-vertical text-sm"></i></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="focus:bg-blue-100"><i className="fa-regular fa-magnifying-glass-chart pr-2"></i>Process</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu> 
                </div>
            </div>
            <div>
                <p className='ml-8 text-sm mt-2 font-semibold'>Sick Leave Request</p>
                <p className='ml-8 text-sm  mt-1 pr-5 truncate'>I am writing to request sick leave  due to illness. I have been experiencing brief description of symptoms and my doctor has advised me to take time off work to recover.</p>
                <p className='ml-8 text-xs mt-1 text-[#949494] '>Monday, December 18, 2023</p>
            </div>
        </div>
    </HoverCardTrigger>
    <HoverCardContent className="flex justify-center items-center bg-[#f9f9f9]">
       {
              pending ?
              <><img src="2.jpg" className='w-8 h-8 rounded-full ml-2'/><p className='ml-2 text-sm font-semibold text-[#373535]'>William Butcher is processing</p></>:
              <p className="text-sm font-semibold text-[#373535]">Waiting to be processed</p>
       }
        <p className="text-2xl -mt-3 ml-1">
            <span className="animate-loading">.</span>
            <span className="animate-loading delay-200">.</span>
            <span className="animate-loading delay-400">.</span>
        </p>
    </HoverCardContent>
    </HoverCard>
    
  )
}

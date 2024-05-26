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
import { useEffect, useState } from "react";
import { Button } from "./button";
import { AbsenceResponse } from "./AbsenceResponse";
import toast from "react-hot-toast";
import { axiosInstance } from "@/Axios";
  

export const Request = ({pending, vacRequest, setRequests, requests}) => {
  const [IsProcessModal, setIsProcessModal] = useState(false);
  const [isApprovedOpen, setIsApprovedOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [request, setRequest] = useState(vacRequest);
  const [isPending, setIsPending] = useState(pending);


    useEffect(() => {
      setRequest(vacRequest)
      setIsPending(pending)

      if(request.hr?.id == JSON.parse(localStorage.getItem('user')).id){
        setIsOwned(true);
      }
    }, [requests]);


    const convertDate = (date, full) => {
        const doj = new Date(date);
        if(full){
          return doj.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric'
          });
        }else{
          return doj.toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            year: 'numeric' 
          });
        }
      }
      const [isOpen, setIsOpen] = useState(false);

      const assignRequest = async (id) => {
        try {
            const response = await axiosInstance.post(`/assignVacationRequest/${id}`)
            if(response.data.message!=null){
              setIsOwned(true);
              setIsPending(true)
              toast.success(response.data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
    <HoverCard>
    <HoverCardTrigger>
        <div className='bg-white mb-3 w-11/12 h-32 rounded-lg border-2 ml-5'>
            <div className='flex justify-between mt-2 ml-2'>
                <div className='flex justify-between items-center'>
                    <div className="relative">
                        <div className={`${isOwned? "bg-[#007cff]" : isPending ? "bg-red-800" : "bg-green-800"} w-2 h-2 rounded-full animate-ping`}></div>
                        <div className={`${isOwned? "bg-[#007cff]" : isPending ? "bg-red-800" : "bg-green-800"} w-[6px] h-[6px] rounded-full absolute top-[1px] left-[1px]`}></div>
                    </div>
                    <img src={`http://127.0.0.1:8000/storage/Avatars/${request.user.id}.jpg`} className='w-8 h-8 rounded-full ml-2'/>
                    <p className='ml-2 text-sm font-semibold text-[#373535]'>{request.user.fname} {request.user.lname}</p>
                </div>
                <div className="mr-2">
                    <DropdownMenu>
                    <DropdownMenuTrigger className={` px-3 py-1 hover:bg-[#eeeeee] rounded-md ${(isPending && !isOwned) && "cursor-not-allowed"}`} disabled={(isPending && !isOwned) && "disabled"} ><i className="fa-regular fa-ellipsis-vertical text-sm"></i></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="focus:bg-blue-100" onClick={()=>{setIsProcessModal(true), assignRequest(request.id)}}><i className="fa-regular fa-magnifying-glass-chart pr-2"></i>Process</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu> 

                </div>
            </div>
            <div>
                <p className='ml-8 text-sm mt-2 font-semibold'>{request.type.charAt(0).toUpperCase()+request.type.slice(1)} Leave Request</p>
                <p className='ml-8 text-sm  mt-1 pr-5 truncate'>{request.reason}</p>
                <p className='ml-8 text-xs mt-1 text-[#949494] '>{convertDate(request.created_at, true)}</p>
            </div>
        </div>
    </HoverCardTrigger>
    <HoverCardContent className="flex justify-center items-center bg-[#f9f9f9]">
    {
      !isPending ? <p className="text-sm font-semibold text-[#373535]">Waiting to be processed</p>:
      isOwned ? <p className="text-sm font-semibold text-[#373535]">Waiting for your processing</p>:
      <><img src={`http://127.0.0.1:8000/storage/Avatars/${request.hr?.id}.jpg`} className='w-8 h-8 rounded-full ml-2'/><p className='ml-2 text-sm font-semibold text-[#373535]'>{request.hr?.fname} {request.hr?.lname} is processing</p></>   
    }
        <p className="text-2xl -mt-3 ml-1">
            <span className="animate-loading">.</span>
            <span className="animate-loading delay-200">.</span>
            <span className="animate-loading delay-400">.</span>
        </p>
    </HoverCardContent>
    </HoverCard>
    
    <div  className={`${IsProcessModal==false? 'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e] `}>
    <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-[450px]">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Vacation Request
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsProcessModal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="flex w-[60%] ">
                <p className="font-bold">Employee: </p>
                <p className="ml-8">{request.user.fname} {request.user.lname}</p>
              </div>
              <div className="flex w-[60%]  mt-4">
                <p className="font-bold">Type: </p>
                <p className="ml-[70px]">{request.type.charAt(0).toUpperCase()+request.type.slice(1)} Leave Request</p>
              </div>
              <div className="flex  mt-4">
                <p className="font-bold">Reason: </p>
                <p className="ml-12">{request.reason}</p>
              </div>
              <div className="flex w-[50%]  mt-4">
                <p className="font-bold">Start Date: </p>
                <p className="ml-[28px]">{request.start_date}</p>
              </div>
              <div className="flex w-[50%]  mt-4">
                <p className="font-bold">End Date: </p>
                <p className="ml-10">{request.end_date}</p>
              </div>
              <div className="flex w-[70%]  mt-4 items-center" onClick={()=>setIsOpen(true)}>
                <p className="font-bold">Attachment: </p>
                <div className="py-1 px-2 border-[1px] border-black rounded-md ml-4 cursor-pointer hover:bg-gray-200 flex items-center"><i className="fa-regular fa-envelope text-lg"></i> <p className="text-sm ml-2 font-semibold">Leave Request Letter</p></div>
              </div>

              <div className="flex  mt-8 justify-end">
                <Button variant="outline" className="px-4 py-2 rounded-md hover:bg-red-500 hover:text-white mr-2" onClick={()=>setIsDenyOpen(true)}>Deny</Button>
                <Button className="bg-[#007cff] text-white px-4 py-2 rounded-md hover:bg-[#085ec5] mr-4" onClick={()=>setIsApprovedOpen(true)}>Approve</Button>
              </div>

            </div>
        </div>
    </div>
    <div className={`${isOpen==false? "hidden" : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 -mt-8 justify-center items-center w-full md:inset-0 h-screen`} key={`popups`} >
      <div className="relative p-4 w-full max-w-2xl max-h-2xl mt-16">
          <div className="relative bg-white  rounded-lg">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachment</h3>
                  <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={(event)=>{event.stopPropagation(); setIsOpen(false);}}> 
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                      </button>
              </div>
          <div className="p-4 md:p-5 flex justify-center items-center">
              <iframe src={`http://127.0.0.1:8000/storage/Attachments/${request.id}.pdf#zoom=45`} width="500px" height="550px"  className="rounded-lg"/>
          </div>
          </div>
      </div>
  </div> 
  <AbsenceResponse isApproved={isApprovedOpen} control={setIsApprovedOpen} popupControl={setIsProcessModal} title="Approve Request" label="Approval message" color="green" requestId={request.id} setRequests={setRequests} request={request} requests={requests} />

  <AbsenceResponse isApproved={isDenyOpen} control={setIsDenyOpen} popupControl={setIsProcessModal} title="Deny Request" label="Denial message" color="red"  requestId={request.id} setRequests={setRequests} request={request} requests={requests}/>
</div> 
</>
    
  )
}

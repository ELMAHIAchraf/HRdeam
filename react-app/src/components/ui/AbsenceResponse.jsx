import { axiosInstance } from "@/Axios";
import { useRef } from "react";
import toast from "react-hot-toast";

export const AbsenceResponse = ({isApproved, control, title, label, color, popupControl, requestId, request, setRequests, requests}) => {

    const message = useRef(null);

    const respond = async (id) => {
        try {
            const response = await axiosInstance.post(`/vacationRequestReview/${id}`, {
                status: color==="green" ? "approved" : "rejected",
                review: message.current.value
            })
            control(false);
            popupControl(false);
            setRequests(requests.filter(request => request.id !== requestId).sort((a, b) => a.status.localeCompare(b.status)).reverse());
            toast.success(response.data.message)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className={`${isApproved==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>control(false)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                            <textarea ref={message} rows={6} className="border border-black text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder={`Enter the ${label.charAt(0).toLowerCase()+label.slice(1)}`}  required />                               
                        </div>
                        <button type="button" className={`w-full text-white ${color==="red" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={()=>respond(requestId)} ><i className="fa-solid fa-arrow-up-right-from-square pr-2"></i>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

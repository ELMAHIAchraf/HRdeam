import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { axiosInstance } from "@/Axios";
import { useDispatch } from "react-redux";
import { deleteAnnouncement } from "@/State/HrAnnouncement";
import toast from "react-hot-toast";
export const AnnoucementCard = ({announcement}) => {

    const dispatch = useDispatch();
    const deleteAnn=async(id)=>{
        try {
            const response=await axiosInstance.delete(`/announcements/${id}`);
            dispatch(deleteAnnouncement(id));
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Failed to delete announcement");
        }
    }

  return (
    <div>
        <div className=" w-[280px] h-[300px] shadow-slate-300 shadow-md rounded-lg ">
            <div className="flex items-center justify-between px-4 mt-2">
                <p className="font-bold text-lg truncate">{announcement.title}</p>
                <DropdownMenu>
                <DropdownMenuTrigger className=" px-3 py-1 hover:bg-[#eeeeee] rounded-md"><i className="fa-regular fa-ellipsis-vertical"></i></DropdownMenuTrigger>
                <DropdownMenuContent >
                <DropdownMenuItem className="focus:bg-red-100">
                            <AlertDialog>
                                <AlertDialogTrigger onClick={(e) => {e.stopPropagation();}}>                  
                                    <i className="fa-regular fa-trash pr-2"></i>Remove Announcement</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the employee.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className=" bg-[#0064d0] hover:bg-red-500 hover:animate-pulse" onClick={()=>deleteAnn(announcement.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                            </AlertDialog>
                            </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>             
            </div>
            <p className="text-[#6e7582] font-semibold ml-4 text-sm">{announcement.departement.name} department</p>
            <p className=" font-semibold ml-4 text-sm mt-1">{announcement.salary} MAD</p>
            <hr className="w-11/12 ml-3 mt-2"/>
            <div className="w-11/12 ml-4 mt-3">
                <p className="text-sm font-extrabold ">Job description</p>
                <p className="text-sm mt-2">{announcement.description}</p>
            </div>
        </div>
    </div>  )
}

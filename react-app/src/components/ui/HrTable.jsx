import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { Button } from "./button"
import { axiosInstance } from "@/Axios"
import { useRef, useState } from "react"
import toast from 'react-hot-toast'




export const HrTable = ({HRs, setHRs}) => {
    const [isOpen, setIsOpen] = useState(false);

 
    const convertDate = (date, full) =>{
        const doj = new Date(date);
        if(full){
            return doj.toLocaleString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
              });
        }else{
            return doj.toLocaleDateString('en-GB', {
                month: 'long',
                year: 'numeric' 
            });
        }
    }
    const calculateDaysPassed = (date) => {
        const doj = new Date(date);
        const today = new Date();
        const differenceInTime = today.getTime() - doj.getTime();
    
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays < 30) {
            return `${differenceInDays} days`;
        }
        const differenceInMonths = Math.floor(differenceInDays / 30);
        if (differenceInMonths < 12) {
            return `${differenceInMonths} month(s)`;
        }
        const differenceInYears = Math.floor(differenceInMonths / 12);
        return `${differenceInYears} year(s)`;
    }

    const deleteHr = async (id) =>{
        try {
            const response = await axiosInstance.delete(`admin/${id}`)
            setHRs(HRs.filter(hr => hr.id !== id));
            toast.success(response.data.message);
        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.message);
        }
    }

    const fname = useRef(null);
    const lname = useRef(null);
    const cin = useRef(null);
    const doj = useRef(null);
    const position = useRef(null);
    const salary = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const address = useRef(null);

    const getModifiedData = () =>{
        return {
            fname: fname.current.value,
            lname: lname.current.value,
            cin: cin.current.value,
            doj: doj.current.value,
            position: position.current.value,
            salary: salary.current.value,
            email: email.current.value,
            phone: phone.current.value,
            departement: 1,
            address: address.current.value
        }
    }

    const cancel = useRef(null);

    
    const updateHr = async (id) =>{
        try {
            const response = await axiosInstance.put(`admin/${id}`, getModifiedData())
            setHRs(HRs.map(hr => hr.id === id ? response.data.data : hr));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
       <>
        <Table>
        <TableBody>
            {
              HRs.map((hr) => (
                <TableRow key={hr.id}>
                    <TableCell className="w-44">
                        <div className="flex items-center">
                            <img className="w-12 h-12 rounded-full" src={`http://127.0.0.1:8000/storage/Avatars/${hr.id}.jpg`} alt=""/>
                            <div className="ml-3">
                                <p className="font-bold">{hr.fname} {hr.lname}</p>
                                <p className="font-light text-xs">{hr.position}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell >
                        <p className="font-medium">Joined in {convertDate(hr.doj, false)}</p>
                        <p className="text-xs font-light">{calculateDaysPassed(hr.doj)}</p>
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-end">
                        <div className={`py-2 px-3 inline-block rounded-md`} style={{backgroundColor : '#007cff'}}>
                            <p className="text-[#fafafa]">HR</p>
                        </div>

                        <DropdownMenu>
                        <DropdownMenuTrigger className=" px-3 py-1 ml-4 hover:bg-[#e5e7eb] rounded-md"><i className="fa-regular fa-ellipsis-vertical fa-rotate-90"></i></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>HR management</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="focus:bg-blue-100" >
                                <AlertDialog>
                                <AlertDialogTrigger onClick={(e) => {e.stopPropagation();}}>                  
                                    <i className="fa-regular fa-user-gear pr-2"></i>View HR
                                </AlertDialogTrigger>
                                <AlertDialogContent className="max-w-xl h-[645px] flex items-center flex-col"   onClick={(e) => e.stopPropagation()}>
                                    <AlertDialogCancel className="absolute right-3 top-3 border-none  hover:bg-gray-100 p-3 h-8">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>    
                                    </AlertDialogCancel> 
                                    <img className="w-32 h-32 rounded-2xl  ml-1" src={`http://127.0.0.1:8000/storage/Avatars/${hr.id}.jpg`} alt=""/>

                                    <div className="w-[83%] mt-4">
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                                <input ref={fname} defaultValue={hr.fname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                                <input ref={lname} defaultValue={hr.lname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
                                                <input ref={cin} defaultValue={hr.cin} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of join</label>
                                                <input ref={doj} defaultValue={hr.doj} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                                <input ref={position} defaultValue={hr.position} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                                <input ref={salary} defaultValue={hr.salary} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input ref={email} defaultValue={hr.email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                                <input ref={phone} defaultValue={hr.phone} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="w-full mt-2">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                            <input ref={address} defaultValue={hr.address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5 h-full"/>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button className="bg-[#007cff] hover:bg-[#085ec5]" onClick={()=>{updateHr(hr.id) ; cancel.current.click()}}><i className="fa-regular fa-arrows-rotate pr-2"></i> Update
                                                <AlertDialogCancel ref={cancel} className="hidden" onClick={(e)=>e.stopPropagation()}></AlertDialogCancel>
                                            </Button>
                                        </div>

                                    </div>

                                </AlertDialogContent>
                            </AlertDialog>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem className="focus:bg-red-100">
                            <AlertDialog>
                                <AlertDialogTrigger onClick={(e) => {e.stopPropagation();}}>                  
                                    <i className="fa-regular fa-user-xmark pr-2"></i>Remove HR</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the HR employee.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className=" bg-[#0064d0] hover:bg-red-500 hover:animate-pulse" onClick={()=>deleteHr(hr.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                            </AlertDialog>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-yellow-100" >
                                <a href={`mailto:${hr.email}`}><i className="fa-sharp fa-regular fa-envelope pr-2"></i>Email HR</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu> 
                        </div>
                    </TableCell>
                </TableRow>
            ))  
            }

          
        </TableBody>
      </Table>

       </> 
    )
  }
  
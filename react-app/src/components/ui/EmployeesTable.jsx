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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./button"
import { axiosInstance } from "@/Axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addEmployee, removeEmployee, modifyEmployee } from "@/State/EmployeeSlice"
import toast from 'react-hot-toast'
import { decrementCount } from "@/State/countSlice"



export const EmployeesTable = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const getData = async()=>{
            try {
                const response = await axiosInstance.get('employees?page=1')
                response.data.data.employees.data.forEach((employee) => {
                    dispatch(addEmployee(employee));
              });
            } catch (error) {
                console.error(error);
            }
    }
    useEffect(() => {
        if(employees.length==0) getData();
    }, []);

    const employees = useSelector((state) => state.employee)

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

    const deleteEmployee = async (id) =>{
        console.log(id);
        try {
            const response = await axiosInstance.delete(`employees/${id}`)
            dispatch(removeEmployee(id));
            dispatch(decrementCount());
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
    const departement = useRef(null);
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
            departement: departement.current.value,
            address: address.current.value
        }
    }

    const cancel = useRef(null);

    
    const updateEmployee = async (id) =>{
        try {
            const response = await axiosInstance.put(`employees/${id}`, getModifiedData())
            dispatch(modifyEmployee(response.data.data));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const differenceInDays = (start_date, end_date) =>{
        const start = new Date(start_date);
        const end = new Date(end_date);
        const difference=end.getTime()-start.getTime();
        return Math.floor(difference/(1000*3600*24)+2);
    }

    return (
       <>
        <Table>
        <TableBody>
            {
              employees.slice(0, 6).map((employee) => (
                <TableRow key={employee.id}>
                    <TableCell className="w-[42%]">
                        <div className="flex items-center">
                            <img className="w-12 h-12 rounded-full" src={employee.avatar} alt=""/>
                            <div className="ml-3 truncate">
                                <p className="font-bold truncate">{employee.fname} {employee.lname}</p>
                                <p className="font-light text-xs truncate">{employee.position}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell >
                        <p className="font-medium truncate">Joined in {convertDate(employee.doj, false)}</p>
                        <p className="text-xs font-light truncate">{calculateDaysPassed(employee.doj)}</p>
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-end">
                        <div className={`py-2 px-3 inline-block rounded-md`} style={{backgroundColor : employee.departement.color}}>
                            <p className="text-[#fafafa]">{employee.departement.name}</p>
                        </div>

                        <DropdownMenu>
                        <DropdownMenuTrigger className=" px-3 py-1 ml-4 hover:bg-[#e5e7eb] rounded-md"><i className="fa-regular fa-ellipsis-vertical fa-rotate-90"></i></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Employee management</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="focus:bg-blue-100" >
                                <AlertDialog>
                                <AlertDialogTrigger onClick={(e) => {e.stopPropagation();}}>                  
                                    <i className="fa-regular fa-user-gear pr-2"></i>View Employee
                                </AlertDialogTrigger>
                                <AlertDialogContent className="max-w-xl h-170 flex items-center flex-col"   onClick={(e) => e.stopPropagation()}>
                                    <AlertDialogCancel className="absolute right-3 top-3 border-none  hover:bg-gray-100 p-3 h-8">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>    
                                    </AlertDialogCancel> 
                                    <img className="w-32 h-32 rounded-2xl  ml-1" src={employee.avatar} alt=""/>
                                    <Tabs defaultValue="account" className=" flex flex-col items-center w-10/12">
                                    <TabsList className="bg-[#f1f2f5]">
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                        <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="account" className="w-full">
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                                <input ref={fname} defaultValue={employee.fname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                                <input ref={lname} defaultValue={employee.lname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
                                                <input ref={cin} defaultValue={employee.cin} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of join</label>
                                                <input ref={doj} defaultValue={employee.doj} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                                <input ref={position} defaultValue={employee.position} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                                <input ref={salary} defaultValue={employee.salary} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input ref={email} defaultValue={employee.email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                                <input ref={phone} defaultValue={employee.phone} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                                <input ref={departement} defaultValue={employee.departement.name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                            <div className="w-52">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                <input ref={address} defaultValue={employee.address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button className="bg-[#007cff] hover:bg-[#085ec5]" onClick={()=>{updateEmployee(employee.id) ; cancel.current.click()}}><i className="fa-regular fa-arrows-rotate pr-2"></i> Update
                                                <AlertDialogCancel ref={cancel} className="hidden" onClick={(e)=>e.stopPropagation()}></AlertDialogCancel>
                                            </Button>
                                        </div>

                                    </TabsContent>
                                    <TabsContent value="vacancies" className="h-[420px] mt-8 overflow-auto space-y-2 custom-scrollbar">
                                        {
                                            employee.absences.length==0?
                                            <div className="bg-red-200 border-red-400 border-[1px] cursor-pointer rounded-lg w-[500px] flex p-4 justify-center items-center">No Absences Recorded</div>
                                            :
                                            employee.absences.map((absence) => (
                                                <div key={`absence${absence.id}`} className="bg-[#f9fafb] hover:bg-[#e5e7eb] border-[#d1d5db] border-[1px] cursor-pointer rounded-lg w-[500px] flex p-4 justify-between items-center h-[100px]" onClick={()=>{setIsOpen(true)}}>
                                                    <p>{convertDate(absence.start_date, true)}</p>
                                                    <div className="w-[250px]">
                                                        <p>{absence.type}</p>
                                                        <p className="font-light text-sm line-clamp-3">{absence.reason}</p>
                                                    </div>
                                                    <p>{differenceInDays(absence.start_date, absence.end_date)} day</p>
                                                    
                                                    <div className={`${isOpen==false? "hidden" : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 -mt-8 justify-center items-center w-full md:inset-0 h-screen`} key={`popups${employee.id}`} >
                                                        <div className="relative p-4 w-full max-w-2xl max-h-2xl">
                                                            <div className="relative bg-white rounded-lg">
                                                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachment</h3>
                                                                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={(event)=>{event.stopPropagation(); setIsOpen(false);}}> 
                                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                            <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                        </button>
                                                                </div>
                                                            <div className="p-4 md:p-5">
                                                                <iframe src={`http://127.0.0.1:8000/storage/Attachments/${absence.id}.pdf#zoom=45`} width="500px" height="550px"  className="rounded-lg"/>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            ))
                                        }
                                    </TabsContent>
                                    </Tabs>

                                </AlertDialogContent>
                            </AlertDialog>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem className="focus:bg-red-100">
                            <AlertDialog>
                                <AlertDialogTrigger onClick={(e) => {e.stopPropagation();}}>                  
                                    <i className="fa-regular fa-user-xmark pr-2"></i>Remove Employee</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the employee.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className=" bg-[#0064d0] hover:bg-red-500 hover:animate-pulse" onClick={()=>deleteEmployee(employee.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                            </AlertDialog>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-yellow-100" >
                                <a href={`mailto:${employee.email}`}><i className="fa-sharp fa-regular fa-envelope pr-2"></i>Email Employee</a>
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
  
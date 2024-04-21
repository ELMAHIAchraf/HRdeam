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
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addEmployee, removeEmployee, modifyEmployee } from "@/State/EmployeeSlice"
import toast from 'react-hot-toast'
import { decrementCount } from "@/State/countSlice"



export const EmployeesTable = () => {
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

    const convertDate = (date) =>{
        const doj = new Date(date);
        return doj.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric' 
    });
    }
    const calculateDaysPassed = (date) =>{
        const doj = new Date(date);
        const today = new Date();
        const difference=today.getTime()-doj.getTime();
        return Math.floor(difference/(1000*3600*24));
    }

    const deleteEmployee = async (id) =>{
        try {
            const response = await axiosInstance.delete(`employees/${id}`)
            dispatch(removeEmployee(id));
            dispatch(decrementCount());
            toast.success(response.data.message);
        } catch (error) {
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

    return (
       <>
        <Table>
        <TableBody>
            {
              employees.slice(0, 6).map((employee) => (
                <TableRow key={employee.id}>
                    <TableCell className="w-44">
                        <div className="flex items-center">
                            <img className="w-12 h-12 rounded-full" src={employee.avatar} alt=""/>
                            <div className="ml-3">
                                <p className="font-bold">{employee.fname} {employee.lname}</p>
                                <p className="font-light text-xs">{employee.position}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell >
                        <p className="font-medium">Joined in {convertDate(employee.doj)}</p>
                        <p className="text-xs font-light">{calculateDaysPassed(employee.doj)} days</p>
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
                                    <TabsList className="bg-[#007bff0a]">
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                        <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="account" className="w-full ">
                                        <div className="flex justify-between mt-4">
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={fname} type="text" name="fname"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.fname} />
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                            </div>
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={lname} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.lname}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={cin} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.cin}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CIN</label>
                                            </div>
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={doj} type="date"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.doj}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of join</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={position} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.position}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Position</label>
                                            </div>
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={salary} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.salary}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={email} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.email}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                            </div>
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={phone} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.phone}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={departement} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.departement.name}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                                            </div>
                                            <div className="relative z-0 w-48 mb-5 group">
                                                <input ref={address} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#007cff] appearance-none focus:outline-none focus:ring-0 focus:border-[#007cff] peer" defaultValue={employee.address}/>
                                                <label  className="peer-focus:font-medium absolute text-sm text-[#007cff] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <Button className="bg-[#007cff] hover:bg-[#085ec5]" onClick={()=>{updateEmployee(employee.id) ; cancel.current.click()}}><i className="fa-regular fa-arrows-rotate pr-2"></i> Update
                                                <AlertDialogCancel ref={cancel} className="hidden" onClick={(e)=>e.stopPropagation()}></AlertDialogCancel>
                                            </Button>
                                        </div>

                                    </TabsContent>
                                    <TabsContent value="vacancies">Vacancies</TabsContent>
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
  
import { axiosInstance } from "@/Axios";
import { useEffect, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Button } from "./button"
  import toast from "react-hot-toast";
  import Echo from '@/pusher';
import { notify } from "./notify";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"



export const NavBar = () => {

    const data = JSON.parse(sessionStorage.getItem('user'));
    const dojStr = data.doj
    const doj = new Date(dojStr);
    const formattedDoj = doj.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric' 
    });
    
    const [employees, setEmployees] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        Echo.private(`HR-channel.${JSON.parse(sessionStorage.getItem('user')).id}`)
        .listen('ManageEmployeeEvent', (e) => {
           notify(e);
           if(e.action == 'create'){
                setEmployees([...employees, e.data])
           }else if(e.action == 'update'){
            setEmployees(employees.map((employee) => employee.id == e.data.id ? e.data : employee));
           }else{
            setEmployees(employees.filter((employee) => employee.id !== e.data.id));
           }
        });
      }, []);

    const searchINP = useRef(null);
    
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
    const fname = useRef(null);
    const lname = useRef(null);
    const cin = useRef(null);
    const dojInp = useRef(null);
    const position = useRef(null);
    const salary = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const departement = useRef(null);
    const address = useRef(null);
    const cancel = useRef(null);

    const getModifiedData = () =>{
        return {
            fname: fname.current.value,
            lname: lname.current.value,
            cin: cin.current.value,
            doj: dojInp.current.value,
            position: position.current.value,
            salary: salary.current.value,
            email: email.current.value,
            phone: phone.current.value,
            departement: departement.current.value,
            address: address.current.value
        }
    }
    const differenceInDays = (start_date, end_date) =>{
        const start = new Date(start_date);
        const end = new Date(end_date);
        const difference=end.getTime()-start.getTime();
        return Math.floor(difference/(1000*3600*24));
    }
    const updateEmployee = async (id) =>{
        try {
            const response = await axiosInstance.put(`employees/${id}`, getModifiedData())
            toast.success(response.data.message);
            setEmployees(null);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const search= async (searchInp) => {
        if(searchInp.length > 0){
            const response = await axiosInstance(`search?name=${searchInp}`);
            setEmployees(response.data.data);
        }else{
            setEmployees(null);
        }
    }

    const [isRPOpen, setRPOpen] = useState(false);
    const Opwd = useRef(null);
    const Npwd = useRef(null);

    const changePassword = async() => {
        try {
            const response = await axiosInstance.post('/change-password', {
                old_password: Opwd.current.value,
                new_password: Npwd.current.value
            });
            toast.success(response.data.message);
            setRPOpen(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
      }


  return (
    <>
    <div className="bg-white w-full h-16 fixed top-0 flex items-center border-2 border-[#ebebeb]">
        <div className="flex ml-10 w-full justify-between lg:ml-84">
            <div className="bg-[#fafafa] w-1/2 md:w-1/2  lg:w-1/3 rounded-md border-2 border-[#e0e0e0] px-3 flex justify-between ">
                <input ref={searchINP} className="bg-[#fafafa] outline-none text-sm w-full" type="text" placeholder="Search" onInput={(searchInp)=>search(searchInp.target.value)}/>
                {
                    employees==null?
                    <button><i className="fa-solid fa-magnifying-glass text-[#737373]"></i></button>
                    :
                    <button onClick={()=>{setEmployees(null); searchINP.current.value = '';}}><i className="fa-regular fa-xmark text-[#737373]"></i></button>
                }
            </div>

            <div className={`w-[26%] max-h-[152px] custom-scrollbar overflow-auto ${employees!==null? "absolute" : "hidden"} top-[50px] rounded-lg`}>
                {
                    employees && employees.map((employee) => {
                        return (
                            <AlertDialog key={employee.id}>
                                <AlertDialogTrigger className="h-[50px] w-full hover:bg-gray-50 bg-white border-[1px]  flex items-center cursor-pointer" onClick={(e) => {e.stopPropagation();}}>                  
                                        <img className="w-10 h-10 rounded-full ml-4" src={`http://127.0.0.1:8000/storage/Avatars/${employee.id}.jpg`}/>
                                        <p className="ml-2">{employee.fname} {employee.lname}</p>
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

                                    <TabsContent value="account" className="w-full ">
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
                                                <input ref={dojInp} defaultValue={employee.doj} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5"/>
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
                                                    <div className="w-[250px] ">
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
                                    
                        )
                    })
                }            
            </div>

            <div className="flex items-center gap-4 mr-4">
                <DropdownMenu>
                <DropdownMenuTrigger><img className="w-10 h-10 rounded-full" src={data.avatar} alt=""/></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{data.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="focus:bg-blue-100 flex justify-center" onClick={()=>setRPOpen(true)}><i className="fa-regular fa-lock pr-2"></i>Change Password</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu> 
                <div className="font-medium dark:text-white">
                    <p>{data.lname} {data.fname}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in {formattedDoj}</div>
                </div>
            </div>
            
        </div>
    </div>
            <div className={`${isRPOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Reset Password 
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setRPOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                    <input ref={Opwd} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="Old Pwd" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input ref={Npwd} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007cff] focus:border-[#007cff] block w-full p-2.5" placeholder="New Pwd" required />
                                </div>

                                <button type="button" className="w-full text-white bg-[#007cff] hover:bg-[] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={changePassword}><i className="fa-regular fa-pen-to-square pr-2"></i>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
    </>

  )
}

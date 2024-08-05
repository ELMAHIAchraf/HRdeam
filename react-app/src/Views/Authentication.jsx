
import { useRef, useState } from "react";
import { axiosInstance } from "../Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from '../State/userSlice';


export const Authentication = () => {
    const email = useRef('');
    const password = useRef('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valideInputs, setValideInputs] = useState({email:null, password:null});

    const getData = () => {
        return {
          email : email.current.value,
          password : password.current.value
        }
      }
      const validateData = () => {
        setValideInputs({email:0, password:0})
        const data={
            email: email.current.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? 1 : 0,
            password: password.current.value.length>=8 ? 1 : 0,
        }
        const values = Object.values(data)
        values.every(value=>value===1) && login()
        setValideInputs(data)
    }

    const login = async() => {
        try{
            const response = await axiosInstance.post('/login', getData());
            localStorage.setItem("token" , response.data.data.token);
            dispatch(addUser(response.data.data.user))
            localStorage.setItem("user", JSON.stringify(response.data.data.user))
            toast.success(response.data.message)
            window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${response.data.data.token}`;
            window.Echo.connect();
            if(response.data.data.user.role === 'hr'){
                navigate('/home')
            }else{
                navigate('/employee')
            }
        }catch(e){
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

  return (
    <div className="h-screen flex justify-center items-center flex-col ">
    <div className="bg-white shadow-slate-300 shadow-md rounded-lg w-4/6 md:w-1/2 lg:w-1/3 p-8">
        <div className="flex flex-col items-center">
            <img src="Logo.svg" alt="logo" className="w-20" />
            <p className="text-3xl font-bold">Welcome back!</p>
        </div>
        <div>
            <div className="p-6 rounded-lg mb-2">   
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input ref={email} type="email" id="email" className={`border-[#303541] bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#232222] dark:border-${valideInputs.email===0 ? '[#323745]' : 'red-500'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="exemple@gmail.com" required />
                    {valideInputs.email===0 ? <p className="mt-2 ml-1 text-sm text-red-600 animate-pulse">Email is Required</p> : ''}

                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input ref={password} type="password" id="password" className={`border-[#303541] bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#232222] dark:border-${valideInputs.password===0 ? '[#323745]' : 'red-500'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="********" required />
                    {valideInputs.password===0 ? <p className="mt-2 ml-1 text-sm text-red-600 animate-pulse">Password is Required</p> : ''}
                </div>

                <button type="submit" className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md  w-full h-12 px-5 py-2.5 text-center bg-[#007cff]" onClick={validateData}>Sign in</button>    

            </div>
           
        </div>
      </div>
    </div>
  )
}

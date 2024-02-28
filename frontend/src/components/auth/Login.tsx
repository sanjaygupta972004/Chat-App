import { useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LocalStorage } from '../../utils/Localstorage'
import {AxiosErrorInterface,AxiosResponseInterface} from '../interface'
import { useAuthContext,ContextProps,LoggedUserInterface } from '../context/authContext'


const signSchema = z.object({
  email: z.string().email(),
  password: z.string().min((8), "Password must be at least 8 characters"),
})

type FormFilld = z.infer<typeof signSchema>

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setLoggedUser } = useAuthContext() as ContextProps;
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFilld>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signSchema)
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const formElements = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement>(
        "input:not([type='hidden']), select, textarea, button"
      );
      const currentIndex = Array.from(formElements).findIndex(
        (ele) => ele === document.activeElement
      );

      let nextIndex: number = 0;
      if (event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % formElements.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + formElements.length) % formElements.length;
      }

      formElements[nextIndex].focus();
    }
  };

  const onSubmit: SubmitHandler<FormFilld> = async (data) => {
 
    try {
      const response =  await axios.post<AxiosResponseInterface>('/api/v1/users/login', data, {
       withCredentials: true
      }
      );
      
      const {accessToken,isLoggedUser} = response.data.data as LoggedUserInterface;
      setToken(accessToken);
      setLoggedUser(isLoggedUser as any); 
      LocalStorage.set('accessToken', accessToken);
      LocalStorage.set('isLoggedUser', isLoggedUser);
      if(response.data.statusCode === 200){
        toast.success("Login Successfully");
      }
      data.email = '';
      data.password = '';
      navigate('/chats');

    } catch (error) {
      if (axios.isAxiosError<AxiosErrorInterface>(error)) {
        console.log(error.response?.data.statusCode);
        setError('root', {
          type: 'manual',
          message: (error.response?.data as {message ?: string })?.message|| "Error occurred while login" 
        })
      }else{
        setError('root', {
          type: 'manual',
          message: "Error occurred while login" 
        })
      }
    };
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-xl font-mono rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-mono text-center mb-4 shadow-lg text-gray-700 p-2">Login<span className='text-blue-400 underline font-sans'>ChatApp</span></h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
        
            <Input {...register("email")} id="email" type= "text" placeholder="Email" onKeyDown={handleKeyDown} />
           
            {errors.email && <p className="text-red-500 text-[17px] font-mono pt-[2px]">{errors.email.message}</p>}
            
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
            <div className='flex justify-between  gap-2'>
            <Input {...register("password")} id="password" type= {showPassword?"hide":"password"} placeholder="*************" onKeyDown={handleKeyDown} />
            <Button variant={"outline"}
             onClick={handleShowPassword} type='submit' className='text-xl font-thin  text-gray-500 hover:text-gray-700'>
             {showPassword ? "Hide" : "Show" }
            </Button>
            </div>
            {errors.password && <p className="text-red-500 text-[17px]  font-serif pt-[2px]">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <Button className='hover:bg-blue-700 hover:text-white text-gray-700 border-blue-700 font-thin text-xl'
             variant="outline"
             type="submit" 
             disabled={isSubmitting}>
             {isSubmitting ? 'Submitting...' : 'Login'}
            </Button>
          </div>
          <div className='mt-4'>
            {errors.root && <div className='flex  gap-2'>
              <p className="text-red-500 text-[20px] font-mono underline ">{errors.root.message}</p> 
               {errors.root.message == "Please verify your email" && <Button variant={"default"} >
                <Link to = "/emailVarification" className='font-mono text-xl text-pink-600 hover:text-orange-400 hover: '>EmailVer..</Link>
               </Button>}
              </div>}
            <p className="text-[20px] font-serif leading-4 from-neutral-600">Don't have an account Plz ? 
             <Button 
              variant={"link"}>
               <Link to = "/signup" className='font-mono text-xl text-pink-600 hover:text-orange-400 underline'>Signup</Link>
             </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

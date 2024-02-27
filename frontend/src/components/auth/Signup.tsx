
import { useForm,SubmitHandler,} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'        
import {z} from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext,ContextProps } from '../context/authContext'
import {AxiosResponseInterface, UserResponseInterface } from '../interface/index'
import { LocalStorage } from '../../utils/Localstorage'
import { useNavigate} from 'react-router-dom'



const signSchema = z.object({
   fullName: z.string().min(5 , "Full Name must be at least 5 characters"),
   username: z.string().min(5).trim(),
   email: z.string().email().includes('@'),
   password: z.string().min(8, "Password must be at least 8 characters"),
})

 type FormFilld = z.infer<typeof signSchema>

const Signup = () => {
   const {setUser} = useAuthContext() as ContextProps;
   const navigate = useNavigate();
   const [profileImage, setProfileImage] = useState<File| null>(null);
   const [profileImgError, setProfileImgError] = useState<string |null>(null);
   const[showPassword, setShowPassword] = useState<boolean>(false);

   const { register, handleSubmit,setError, formState: { errors,isSubmitting } } = useForm<FormFilld>({
      defaultValues: {
         fullName: '',
         username: '',
         email: '',
         password: '',
      },
      resolver:zodResolver(signSchema)
   });


   const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfileImage(file);
    }else {
      setProfileImgError('Please select an image');   
      }
    };

   const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.preventDefault();
         setShowPassword((prev) => !prev);
    };



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

   const onSubmit: SubmitHandler<FormFilld> = async(data) => {
   const Data = new FormData();
   Data.append('fullName', data.fullName);
   Data.append('username', data.username);
   Data.append('email', data.email);
   Data.append('password', data.password);
   if (profileImage) {
      Data.append('profileImage', profileImage, profileImage.name);
   } else {
      Data.append('profileImage', '');
   }
 
   try {
      const response = await axios.post<AxiosResponseInterface |any>('/api/v1/users/signup', Data);
      const { data} = response;
      const user = data.data.user as UserResponseInterface;
      setUser(user);
      LocalStorage.set('user', user);
      toast.success('Account created successfully');
      setProfileImage(null);
      navigate("/emailVerification");
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data.statusCode);
         setError('root', {
            type: 'manual',
            message: error.response?.data.message as string
         })
         } else if(error instanceof Error){
            setError('root', {
               type: 'manual',
               message: error.message as string // Cast error.message to string
            })
         }
         else if (error && typeof error === 'object' && 'message' in error) {
            setError('root', {
               type: 'manual',
               message: error.message as string 
            })
         }
         else {
            setError('root', {
               type: 'manual',
               message: "An error occurred while creating account"
            })
         }
   };
}
   return (
   
      <div className="container mx-auto">
         <div className="flex justify-center items-center h-screen">
         
            <div className="w-full max-w-md">
         
              <form className="  bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" 
                onSubmit={handleSubmit(onSubmit)}>
                   <div className=" rounded-lg shadow-2xl">
                    <h1 className="text-xl font-mono  text-center mb-1 p-1 text-gray-500">SignUp<span className='text-blue-500 underline'>ChatApp</span></h1>
                    </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullNmame">
                        Full Name
                     </label>
                     <Input {...register("fullName")} 
                       id="fullName"
                       type="text"
                       placeholder="Full Name" 
                       onKeyDown={handleKeyDown}/>
                     {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName.message}</p>}
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                     </label>
                     <Input {...register("username")} 
                       id="username"
                       type="text" 
                       placeholder="Username" 
                       onKeyDown={handleKeyDown}
                       />
                     {errors.username && <p className="text-red-500 text-xs font-mono"> {errors.username.message} </p>}
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                     </label>
                     <Input {...register("email")} 
                      id="email" 
                      type="text" 
                      placeholder="Email"
                      onKeyDown={handleKeyDown} />
                     {errors.email && <p className="text-red-500 text-xs font-mono"> {errors.email.message} </p>}
                  </div>
                  <div className="mb-6">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                     </label>
                     <div className='flex justify-between  gap-2'>
                     <Input {...register("password")}
                      id="password" 
                      type= {showPassword?"text":"Password"}
                      placeholder="*************" 
                      onKeyDown={handleKeyDown}/>
                      <Button variant={"outline"} onClick={handleShowPassword} type='submit'  className='text-xl font-mono text-gray-500 hover:text-gray-700'>
                           {showPassword ? "Hide" : "Show" }
                      </Button>
                     </div>
                     {errors.password && <p className="text-red-700 text-xs font-mono"> {errors.password.message} </p>}
                   </div>
                      
                   <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-serif" htmlFor="profileImage">
                        Profile-Image...
                        </label>
                       <Input 
                        id="profileImage"
                        type="file" 
                        onChange={handleProfileImageChange}
                        onKeyDown={handleKeyDown} />
                        {profileImgError && <p className="text-red-500 text-xs italic">{profileImgError}</p>} 
                  </div>
             
                  
                   <div className="flex items-center justify-between">
                      <Button
                        className='hover:bg-blue-700 hover:text-gray-600 text-gray-900 border-blue-700'
                        variant= "outline"
                        type="submit"
                        onKeyDown ={(event: React.KeyboardEvent) => handleKeyDown(event)}
                        disabled = {isSubmitting}>
                           {isSubmitting ? 'Submitting...' : 'SignUp'}
                      </Button>
                  </div>
                  <div>
                     {errors.root && <p className="text-red-600 text-[18px] pt-1 font-mono">{errors.root.message}</p>}
                  </div>
                
               </form>

            </div>
        </div>

       </div>  
   )
}


export default Signup

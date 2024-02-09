
import { useForm,SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'        
import {z} from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'

const signSchema = z.object({
   fullName: z.string().min(5),
   username: z.string().min(5).trim(),
   email: z.string().email().includes('@'),
   password: z.string().min(8),
   profileImage: z.string().nullable(),
   coverImage: z.string().nullable()
})

 type FormFilld = z.infer<typeof signSchema>

const Signup = () => {

   const [profileImage, setProfileImage] = useState<string | null>(null);
   const [coverImage,setCoverImage] = useState<string | null>(null);


   const { register, handleSubmit,setError, formState: { errors,isSubmitting } } = useForm<FormFilld>({
      defaultValues: {
         fullName: '',
         username: '',
         email: '',
         password: '',
         profileImage: '',
         coverImage: ''
        
      },
      resolver:zodResolver(signSchema)
   });


   const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfileImage(file.name);
      
    };
   }


   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setCoverImage(file.name);
      
    };
   }
  
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
      data.profileImage = profileImage;
      data.coverImage = coverImage;
      console.log(data);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      
    } catch (error) {
      setError('root', {
         type: 'manual',
         message: "Something went wrong!"
      })

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
                     {errors.username && <p className="text-red-500 text-xs italic"> {errors.username.message} </p>}
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
                     {errors.email && <p className="text-red-500 text-xs italic"> {errors.email.message} </p>}
                  </div>
                  <div className="mb-6">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                     </label>
                     <Input {...register("password")}
                      id="password" 
                      type="password"
                      placeholder="*************" 
                      onKeyDown={handleKeyDown}/>
                     {errors.password && <p className="text-red-700 text-xs italic"> {errors.password.message} </p>}
                   </div>
                      
                   <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
                        Profile-Image...
                        </label>
                       <Input 
                        id="profileImage"
                        type="file" 
                        onChange={handleProfileImageChange}
                        onKeyDown={handleKeyDown} />
                        {/* {errors.avatar?.file && <p className="text-red-500 text-xs italic">{errors.avatar.file.message}</p>} */}
                  </div>
                  <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                        Cover-Image...
                        </label>
                       <Input 
                         id="coverImage"
                         type="file" 
                         onChange={handleCoverImageChange}
                         onKeyDown={handleKeyDown} 
                        
                        />
                        {/* {errors.avatar?.file && <p className="text-red-500 text-xs italic">{errors.avatar.file.message}</p>} */}
                   </div>
                  
                   <div className="flex items-center justify-between">
                      <Button
                        className='hover:bg-blue-700 hover:text-white text-gray-700 border-blue-700'
                        variant= "outline"
                        type="submit"
                        onKeyDown ={(event: React.KeyboardEvent) => handleKeyDown(event)}
                        disabled = {isSubmitting}>
                           {isSubmitting ? 'Submitting...' : 'SignUp'}
                      </Button>
                  </div>
                  <div>
                     {errors.root && <p className="text-red-500 text-xs italic">{errors.root.message}</p>}
                  </div>
                
               </form>

            </div>
        </div>

       </div>  
   )
}
   



export default Signup

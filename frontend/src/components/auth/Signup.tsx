
import { useForm,SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'        
import {z} from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const signSchema = z.object({
   fullNmame: z.string().min(5),
   username: z.string().min(5),
   email: z.string().email(),
   password: z.string().min(8),

}
)

 type FormFilld = z.infer<typeof signSchema>

const Signup = () => {
   const { register, handleSubmit,setError, formState: { errors,isSubmitting } } = useForm<FormFilld>({
      defaultValues: {
         fullNmame: '',
         username: '',
         email: '',
         password: ''
      },
      resolver:zodResolver(signSchema)
   });
    
   const onSubmit: SubmitHandler<FormFilld> = async(data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(data)
      
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
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
                onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullNmame">
                        Full Name
                     </label>
                     <Input {...register("fullNmame")} className=""
                     id="fullNmame" type="text" placeholder="Full Name" />
                     {errors.fullNmame && <p className="text-red-500 text-xs italic">{errors.fullNmame.message}</p>}
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                     </label>
                     <Input {...register("username")} className="" 
                      id="username" type="text" placeholder="Username" />
                     {errors.username && <p className="text-red-500 text-xs italic"> {errors.username.message} </p>}
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                     </label>
                     <Input {...register("email")} className="" 
                      id="email" type="text" placeholder="Email" />
                     {errors.email && <p className="text-red-500 text-xs italic"> {errors.email.message} </p>}
                  </div>
                  <div className="mb-6">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                     </label>
                     <Input {...register("password")
                     } className="" id="password" 
                      type="password"
                      placeholder="*************" />
                     {errors.password && <p className="text-red-700 text-xs italic"> {errors.password.message} </p>}
                   </div>
                   <div className="flex items-center justify-between">
                     <Button
                      className='hover:bg-blue-700 hover:text-white text-gray-700 border-blue-700'
                      variant= "outline"
                      type="submit"
                      disabled = {isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
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
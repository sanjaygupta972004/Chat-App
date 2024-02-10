import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'

const signSchema = z.object({
  email: z.string().email(),
  password: z.string().min((8), "Password must be at least 8 characters"),
})

type FormFilld = z.infer<typeof signSchema>

const Login = () => {
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
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-xl font-mono rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-mono text-center mb-4 shadow-lg text-gray-700 p-2">Login<span className='text-blue-400 underline font-sans'>ChatApp</span></h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
            <Input {...register("email")} id="email" type="text" placeholder="Email" onKeyDown={handleKeyDown} />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
            <Input {...register("password")} id="password" type="password" placeholder="*************" onKeyDown={handleKeyDown} />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <Button className='hover:bg-blue-700 hover:text-white text-gray-700 border-blue-700' variant="outline" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Login'}
            </Button>
          </div>
          <div className='mt-4'>
            {errors.root && <p className="text-red-500 text-xs italic">{errors.root.message}</p>}
            <p className="text-gray-600 text-[20px] font-mono">Don't have an account ? 
             <Button 
              variant={"link"}>
               <Link to = "/signup" className='font-mono text-xl hover:text-orange-400 underline'>Signup</Link>
             </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

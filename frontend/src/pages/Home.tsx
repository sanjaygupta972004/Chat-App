
import bgImage from '../assets/images';
import { Link,Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
   return (
    <>
       <div className = "">
         <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="bg-image" />
         <div className="absolute inset-0  container"></div>
         <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="max-w-md text-center">
               <h1 className="text-white text-4xl font-bold mb-4">Lorem ipsum dolor sit amet consectetur.</h1>
               <div className="flex justify-around mt-6 ">
                  <Button variant={"link"} className=' text-xl text-white  ' >
                      <Link to="/login">Login</Link>
                  </Button>
                  <Button variant={"link"} className='text-xl text-white font-mono'>
                      <Link to="/register">Register</Link>
                  </Button>
               </div>
            </div>
            <Outlet/>
              </div>
       </div>
       </>
   )
}

export default Home;

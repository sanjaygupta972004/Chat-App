
import bgImage from '../assets/images';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
   return (
      <>
        <div className="">
          <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="bg-image" />
          <div className="absolute inset-0 container flex justify-center lg:items-center flex-col lg:flex-row gap-6">
            <div className="max-w-md text-center">
              <h1 className="text-pink-500 text-xl lg:text-4xl font-bold  font-serif underline">Converse with Social Pulse</h1>
              <div className="flex justify-around mt-6">
                <Button variant={"link"} className='text-2xl text-white font-mono hover:text-yellow-400'>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant={"link"} className='text-2xl text-white font-mono hover:text-pink-700'>
                  <Link to="/signup">Register</Link>
                </Button>
              </div>
            </div>
            <div className=""> {/* Added margin top for spacing */}
              <Outlet />
            </div>
          </div>
        </div>
      </>
   );
};

export default Home;

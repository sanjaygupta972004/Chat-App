
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LocalStorage } from "@/utils/Localstorage";
import { images } from "../assets/images";


const EmailVerification = () => {
  const user = LocalStorage.get("user");

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
    <div className="w-full h-full absolute top-0 left-0 z-[-5] opacity-1">
      <img src={images.url1} alt="background" className="w-full h-full object-cover" />
    </div>
    <div className="w-[615px] text-center flex-col items-center justify-center mx-auto my-20 gap-[100px]">
      <div className="mb-8 md:mb-[56px]">
        <div className="max-w-[300px] w-full h-[150px] relative flex justify-center items-center mx-auto">
         <img src= {images.emailVerification} alt="Email" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl md:text-[46px] leading-[50px] text-[#070806] font-serif">
          Please Verify Your Email
        </h3>
      </div>
      <div className="flex flex-col gap-6 mt-3">
        <div className="text-center">
          <p className=" text-gray-700 text-[18px] md:text-[22px] font-serif ">
            We have sent an email to <span className= "font-mono px-1 text-xl text-pink-800 underline">{user?.email}</span> with a link to verify your account. Please check your email and click on the link to verify your account.
          </p>
        </div>
        <div className=" flex justify-center gap-5 flex-col items-center ">
          <p className=" font-normal text-gray-800 font-serif text-[20px] md:text-[24px]">
            If you haven't received the email, please check your spam folder or 
            click the button below to resend the email.
          </p>
          <Link to = "/resend-emailVerification">
          <Button
           variant={"default"}
           className="w-auto h-[50px] text-lg font-serif hover:bg-[#f0f0f0] hover:text-[#070806] transition-all duration-300 ease-in-out"
           >
            Resend Verification Email
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>

  );
};

export default EmailVerification;



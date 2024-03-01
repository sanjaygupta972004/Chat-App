import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
   <form className=" flex items-center gap-2" >
      <Input
       type="text"
        placeholder="Search..." 
        name="search"
        className="rounded-lg w-full text-[20px] leading-4 font-serif"
        />
      <Button type="submit" color="primary" size="sm" className="ml-2">
         <IoSearchSharp size={25} />
      </Button>

   </form>

    
  )
}

export default SearchInput
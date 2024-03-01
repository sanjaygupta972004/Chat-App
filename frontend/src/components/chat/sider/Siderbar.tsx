import SearchInput from "./SearchInput"
import LogoutButton from "./LogoutButton"
import Conversations from "./Conversations"

const Siderbar = () => {
  return (
    <div className=' border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className= " divide-x px-3">
         <Conversations />
         <LogoutButton />
      </div>
      </div>
  )
}

export default Siderbar
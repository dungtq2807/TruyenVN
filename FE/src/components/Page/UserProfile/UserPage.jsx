import UserSideBar from "./UserSideBar"

// import ChangePassword from "./ChangePassword";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <div>
      <UserSideBar/>
      <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
       

<Outlet/>    
      
      </div>
      </div>
    </div>
  )
}

export default UserPage

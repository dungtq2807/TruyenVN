import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Logout from "../../Auth/LogOut";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";

const UserProfile = () => {
  const { isLoggedIn } = useAuth(); // Get login status from AuthContext
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  
  const { data} = useQuery({
    queryKey: ["USER_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/user/${id}`);
      console.log(data)
  
      return data;
    },
  });
 

  if (!isLoggedIn) return null; // Do not display UserProfile if not logged in
  
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt=""
            src={data?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
          />
        </div>
      </div>
      
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li> Hello {data?.username}</li>
        {isLoggedIn && role === "ADMIN" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        <li>
          <Link to={`/profile/edit/${id}`} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><Logout /></li> {/* Use Logout component here */}
      </ul>
    </div>
  );
};

export default UserProfile;

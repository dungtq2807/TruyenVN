import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Logout from "../../Auth/LogOut";

const UserProfile = () => {
  const { isLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập từ AuthContext
  const role = localStorage.getItem('role');
  if (!isLoggedIn) return null; // Không hiển thị UserProfile nếu chưa đăng nhập

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li>
      {isLoggedIn && role === "ADMIN" ? <Link to="/admin">Admin</Link> : null}
      </li>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><Logout /></li> {/* Sử dụng component Logout ở đây */}
      </ul>
    </div>
  );
};

export default UserProfile;

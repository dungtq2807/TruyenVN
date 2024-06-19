import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import Category from "../Page/Category/Category";
import UserProfile from "../Page/UserProfile/UserProfile";

const HeaderHomePage = () => {
  const { isLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập từ context

  // Lấy vai trò từ localStorage
  // const role = localStorage.getItem('role');

  return (
    <div className="m-auto container">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            COMIC
          </Link>
          <Category />
        </div>

        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
         
          {isLoggedIn ? <UserProfile /> : <Link to="/signin" className="btn btn-primary">Đăng nhập</Link>}
        </div>
      </div>
    </div>
  );
};

export default HeaderHomePage;

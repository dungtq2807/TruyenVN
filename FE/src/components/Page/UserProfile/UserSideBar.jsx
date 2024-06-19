import { Link } from "react-router-dom";

const UserSideBar = () => {
    const id = localStorage.getItem('id');
  return (
    <div>
      
      <aside
        id="default-sidebar"
        className="fixed  z-40 w-64  transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
          <li>
          <Link
            to={`/profile/edit/${id}`}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
           
            <span className="flex-1 ms-3 whitespace-nowrap">Thông tin cá nhân</span>
          </Link>
        </li>
        
        <li>
        <Link
          to={`/profile/changepassword`}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
         
          <span className="ms-3">Thay đổi mật khẩu</span>
        </Link>
      </li>

            <li>
              <Link
                to={`/history/${id}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               
                <span className="ms-3">Lịch Sử</span>
              </Link>
            </li>
          

        
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default UserSideBar;

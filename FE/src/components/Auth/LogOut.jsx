import { useNavigate } from 'react-router-dom';
import { clearTokenAndRole } from '../conf/axiosInstance';
// import { clearToken } from '../conf/axiosInstance';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokenAndRole(); // Xóa token từ localStorage
    // Đợi một khoảng thời gian ngắn trước khi chuyển hướng để đảm bảo rằng các thay đổi đã được lưu
    setTimeout(() => {
      window.location.reload(); // Tải lại trang sau khi đăng xuất
    }, 100); // Thời gian chờ 100ms để đảm bảo rằng `clearToken` đã hoàn thành

    // Hoặc sử dụng navigate để chuyển hướng đến trang khác sau đó reload
    navigate('/', { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button onClick={handleLogout} className="w-full text-left">
      Logout
    </button>
  );
};

export default Logout;

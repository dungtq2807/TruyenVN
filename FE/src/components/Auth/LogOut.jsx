
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../conf/axiosInstance';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken(); // Clear token from localStorage
    // Other logout logic (e.g., redirect user to login page)
    navigate('/signin'); // Redirect to signin page after logout
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

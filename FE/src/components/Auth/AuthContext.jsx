import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [role, setRole] = useState(null); // Vai trò người dùng

  const login = () => {
    setIsLoggedIn(true); // Đánh dấu đã đăng nhập
  };

  const logout = () => {
    setIsLoggedIn(false); // Đánh dấu đã đăng xuất
    setRole(null); // Đặt lại vai trò khi đăng xuất
    localStorage.removeItem('role'); // Xóa vai trò khỏi localStorage
  };

  const updateRole = (newRole) => {
    setRole(newRole); // Cập nhật vai trò mới
    localStorage.setItem('role', newRole); // Lưu vai trò vào localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

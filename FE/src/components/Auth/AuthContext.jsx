import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [id, setId] = useState(null); // User id
  const [role, setRole] = useState(null); // User role

  const login = () => {
    setIsLoggedIn(true); // Mark as logged in
  };

  const logout = () => {
    setIsLoggedIn(false); // Mark as logged out
    setId(null); // Reset id
    setRole(null); // Reset role
    localStorage.removeItem('id'); // Clear id from localStorage
    localStorage.removeItem('role'); // Clear role from localStorage
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  const updateRole = (newRole) => {
    setRole(newRole); // Update role state
    localStorage.setItem('role', newRole); // Store role in localStorage
  };

  const storeTokenAndRole = (id, token, role) => {
    setId(id); // Set user id
    localStorage.setItem('id', id); // Store id in localStorage
    localStorage.setItem('token', token); // Store token in localStorage
    localStorage.setItem('role', role); // Store role in localStorage
  };

  const clearTokenAndRole = () => {
    setId(null); // Reset id
    setRole(null); // Reset role
    localStorage.removeItem('id'); // Clear id from localStorage
    localStorage.removeItem('role'); // Clear role from localStorage
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, updateRole, storeTokenAndRole, clearTokenAndRole, id }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

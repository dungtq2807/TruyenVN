import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Thiết lập interceptor cho các request axios để tự động thêm token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm lưu token và role vào localStorage
export const storeTokenAndRole = (id, token, role) => {
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

// Hàm xóa token và role khỏi localStorage
export const clearTokenAndRole = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('id');
};

// Hàm lấy role từ localStorage
export const getRole = () => {
  return localStorage.getItem('role');
};

export default axiosInstance;

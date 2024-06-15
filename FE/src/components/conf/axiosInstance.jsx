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

// Hàm lưu token vào localStorage
export const storeToken = (token) => {
  localStorage.setItem('token', token);
  setTokenTimeout(); // Thiết lập hết hạn của token khi lưu
};

// Hàm xóa token khỏi localStorage
export const clearToken = () => {
  localStorage.removeItem('token');
};

// Hàm thiết lập thời gian hết hạn của token (30 phút)
const setTokenTimeout = () => {
  setTimeout(() => {
    clearToken();
  }, 30 * 60 * 1000); // 30 phút tính bằng mili giây
};

// Xử lý xóa token khi sự kiện beforeunload được kích hoạt
// window.addEventListener('beforeunload', () => {
//   clearToken();
// });

export default axiosInstance;

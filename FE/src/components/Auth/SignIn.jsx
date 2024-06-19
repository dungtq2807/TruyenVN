import Joi from "joi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance, {  storeTokenAndRole } from "../conf/axiosInstance";
import { toast } from "sonner";


const signinSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(4),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signinSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (signinData) => {
      const { data } = await axiosInstance.post('/login', signinData);
      storeTokenAndRole(data.token, data.data.role);
      return data;
    },
    onSuccess: () => {
      toast.success('Đăng nhập thành công!');
      login(); // Cập nhật trạng thái đăng nhập
      navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
    },
    onError: () => {
      toast.error('Đăng nhập thất bại!');
      navigate('/signin'); // Chuyển hướng về trang đăng nhập khi lỗi
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                <input
                  {...register('username', {
                    required: true,
                    minLength: 3,
                  })}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tên người dùng"
                  required=""
                />
                {errors?.username && <span>{errors?.username?.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  {...register('password', { required: true })}
                />
                {errors?.password && <span>{errors?.password?.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản?{' '}
                <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký tại đây</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi  from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axiosInstance, { storeToken } from "../conf/axiosInstance";

const signinChema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(4),

});
const SignIn = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signinChema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (signin) => {
      const { data } = await axiosInstance.post(
        `/login`,
        signin
      );
      storeToken(data.token);// Store token in localStorage
        return data;
      
    },
    onSuccess: () => {
      toast.success("Tài khoản đăng nhập thành công!");
    
      navigate("/");
    },
    onError: () => {
      toast.error("Tài khoản không được đăng nhập!");
      navigate("/signin");
    },
  });
  const onSubmit = (data) => {
   
    mutate(data);
  };
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Name
              </label>
              <input
                {...register("username", {
                  required: true,
                  minLength: 3,
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user name"
                required=""
              />
              {errors?.username && (
                <span>{errors?.username?.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                {...register("password", { required: true })}
              />
              {errors?.password && (
                <span>{errors?.password?.message}</span>
              )}
            </div>
           
        
          
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {isPending ? "Create.....":"Create an account"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
    

      
    </>
  );
};

export default SignIn;

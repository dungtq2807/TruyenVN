import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi  from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
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
    reset,
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
      const { data } = await axios.post(
        `http://localhost:8080/login`,
        signin
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Tài khoản đăng nhập thành công!");
      navigate("/");
    },
    onError: () => {
reset();
      toast.error("Tài khoản không được đăng nhập!");
      navigate("/signin");
    },
  });
  const onSubmit = (data) => {
   
    mutate(data);
  };
  return (
    <>
      <div>đăng ký</div>
    

      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  User Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("username", { required: true, minLength: 3 })}
                  type="text"
                />

                {errors?.username && <span>{errors?.username?.message}</span>}
              </div>

          
           
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("password",{required:true})}
                  type="password"
                />
                    {errors?.password && <span>{errors?.password?.message}</span>}
              </div>

          

              <button>{isPending ? "Đang Thêm..." : "Thêm"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

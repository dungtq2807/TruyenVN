import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi  from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const signupChema = Joi.object({
  username: Joi.string().required().min(3),
  // email: Joi.string().email( {tlds: { allow:false } }).required(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  role:Joi.string()
});
const SignUp = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signupChema),
    defaultValues: {
      username: "",
      // email: "",
      password: "",
      confirmPassword: "",
      role:"USER"
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (signup) => {
      const { data } = await axios.post(
        `http://localhost:8080/register`,
        signup
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Tài khoản đã được thêm thành công!");
      navigate("/signin");
    },
    onError: () => {
     
      toast.error("Tài khoản không được thêm");
      navigate("/signup");
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

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  confirmPassword
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("confirmPassword", { required: true })}
                  type="password"
                />
                    {errors?.confirmPassword && <span>{errors?.confirmPassword?.message}</span>}
              </div>

              <div>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("role")} type="hidden"
                />
              </div>

              <button>{isPending ? "Đang Thêm..." : "Thêm"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

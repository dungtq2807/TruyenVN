import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(
    
  );

  const { data} = useQuery({
    queryKey: ["USER_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/user/${id}`);
      console.log(data)
      reset(data); // Populate form fields with fetched data
      return data;
    },
  });


  const { mutate, isPending } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axiosInstance.put(
        `/api/v1/user/update-info`,
        user
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      navigate(`/profile/edit/${id}`);
    },
    onError: () => {
      toast.error("Cập nhật không thành công!");

    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-md">
        {/* User Info Header */}
        <div className="bg-gray-200 text-center py-4 rounded-t-md">
          <img
            src={data?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
            alt="User Avatar"
            className="rounded-full w-24 h-24 border-4 border-white mx-auto -mt-12"
          />
          <h2 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</h2>
          <p className="text-sm text-gray-600">{data?.username}</p>
        </div>
        {/* Form Content */}
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Họ
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                defaultValue={data?.firstName}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
              />
              {errors.firstName && <span>Error: {errors.message}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                defaultValue={data?.lastName}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
              />
            </div>

            <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avartar
            </label>
            <input
              type="text"
              id="avatar"
              {...register("avatar")}
              defaultValue={data?.avatar}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
            {errors.firstName && <span>Error: {errors.message}</span>}
          </div>
            <div className="flex justify-end">
              {/* Save Changes Button */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
              {isPending ? "..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;

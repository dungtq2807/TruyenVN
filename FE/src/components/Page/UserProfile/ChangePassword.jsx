import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../conf/axiosInstance";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("oldPassword", data.oldPassword);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmPassword", data.confirmPassword);

    try {
      await axiosInstance.put(`/api/v1/user/change-password`, formData);
      toast.success("Password changed successfully!");
      navigate(`/profile/changepassword`);
    } catch (error) {
      toast.error("Failed to change password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="text"
              id="oldPassword"
              {...register("oldPassword", { required: "Old Password is required" })}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
            {errors.oldPassword && <span className="text-red-500">{errors.oldPassword.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", { required: "New Password is required" })}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
            {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: "Please confirm your new password" })}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Change Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

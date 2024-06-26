import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

const AddUploadImage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL path

  // Sử dụng React Hook Form để quản lý form và validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sử dụng useMutation để thực hiện mutation khi submit form
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await axiosInstance.post(
          "/api/v1/image/add-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Thêm ảnh không thành công!");
      }
    },
    onSuccess: () => {
      toast.success("Thêm ảnh thành công!");
      navigate("/admin/chapter"); // Chuyển hướng sau khi thành công
    },
    onError: (error) => {
      toast.error(error.message || "Thêm ảnh không thành công!");
    },
  });

  // Xử lý khi submit form
  const onSubmit = async (formData) => {
    const formDataObj = new FormData();
    formDataObj.append("chapter", id); // Sử dụng id từ URL path

    // Append each selected file to formDataObj under "image" key
    for (const file of formData.image) {
      formDataObj.append("image", file);
    }

    mutate(formDataObj); // Gọi hàm mutate để gửi dữ liệu lên server
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thêm Ảnh Mới</h2>
      <div className="flex justify-end mb-4">
        <a href="/admin/chapter">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hidden input to store chapter ID */}
          <input type="hidden" {...register("chapter", { value: id })} />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chọn Ảnh:
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              multiple // Cho phép chọn nhiều file
            />
            {errors.image && (
              <span className="text-red-500">Bạn cần chọn ít nhất một ảnh.</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            disabled={isMutating}
          >
            {isMutating ? "Đang Thêm..." : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUploadImage;

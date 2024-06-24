import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

const AddUploadImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL path

  // Sử dụng React Hook Form để quản lý form và validation
  const {
    register,
    handleSubmit,
    reset, // Thêm reset từ react-hook-form
    formState: { errors },
  } = useForm();

  // State để lưu danh sách các đối tượng File đã chọn và hiển thị preview
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

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
        throw new Error(
          error.response?.data?.message || "Thêm ảnh không thành công!"
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["IMAGE"],
      });
      toast.success("Thêm ảnh thành công!");
      reset(); // Đặt lại giá trị của form sau khi thành công
      setSelectedFiles([]); // Đặt lại danh sách các file đã chọn về rỗng
      setFilePreviews([]); // Đặt lại danh sách preview về rỗng
    },
    onError: (error) => {
      toast.error(error.message || "Thêm ảnh không thành công!");
    },
  });

  // Xử lý khi submit form
  const onSubmit = async () => {
    // Kiểm tra xem có file ảnh nào được chọn không
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Bạn cần chọn ít nhất một ảnh.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("chapter", id); // Sử dụng id từ URL path

    // Append each selected file to formDataObj under "image" key
    for (let i = 0; i < selectedFiles.length; i++) {
      formDataObj.append("image", selectedFiles[i]);
    }

    mutate(formDataObj);
  };

  // Xử lý thay đổi khi người dùng chọn file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);

    // Generate previews for selected files
    const previews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews([...filePreviews, ...previews]);
  };

  // Xử lý xóa file đã chọn và preview tương ứng
  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...filePreviews];
    updatedPreviews.splice(index, 1);
    setFilePreviews(updatedPreviews);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thêm Ảnh Mới</h2>

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
              accept="image/*"
              multiple
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleFileChange} // Bắt sự kiện thay đổi khi người dùng chọn file
            />
            {filePreviews.length > 0 && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Đã chọn:</span>
                <ul className="list-disc list-inside">
                  {filePreviews.map((preview, index) => (
                    <li key={index} className="text-gray-600 text-sm flex items-center justify-between">
                      <span>{index + 1}. <img src={preview} alt={`preview-${index}`} className="h-8 w-auto rounded-lg inline-block" /></span>
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveFile(index)}
                      >
                        Xóa
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

const EditUploadImage = ({ id }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data } = useQuery({
    queryKey: ["IMAGE_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/image/get-one-image/${id}`);
      reset(data);
      return data;
    },
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await axiosInstance.put(
          `/api/v1/image/update-image`,
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
          error.response?.data?.message || "Cập nhật ảnh không thành công!"
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["IMAGE_DETAIL", id]);
      toast.success("Cập nhật ảnh thành công!");
      reset();
      setSelectedFiles([]);
    },
    onError: (error) => {
      toast.error(error.message || "Cập nhật ảnh không thành công!");
    },
  });

  const onSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Bạn cần chọn ít nhất một ảnh.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("id", id);

    for (let i = 0; i < selectedFiles.length; i++) {
      formDataObj.append("image", selectedFiles[i]);
    }

    mutate(formDataObj);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sửa Ảnh</h2>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id", { value: id })} />

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
              onChange={handleFileChange}
            />
            {data && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Ảnh hiện tại:</span>
                <div className="mt-1">
                  <img src={data.image} alt={data.name} className="rounded-lg w-36" />
                </div>
              </div>
            )}
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Ảnh mới đã chọn:</span>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`new-upload-${index}`}
                        className="rounded-lg w-36"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 text-red-500"
                        onClick={() => handleRemoveFile(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
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
            {isMutating ? "Đang Cập Nhật..." : "Cập Nhật"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUploadImage;

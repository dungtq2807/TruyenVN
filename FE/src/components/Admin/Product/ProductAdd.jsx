import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../conf/axiosInstance";

const ProductAdd = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (product) => {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("file", product.image[0]);
      formData.append("description", product.description);

      const { data } = await axiosInstance.post("/api/v1/comic_detail/post-comic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được thêm thành công!");
      navigate("/admin/product");
    },
    onError: () => {
      toast.error("Sản phẩm không được thêm");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    } else {
      setImagePreview("");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Thêm Sản Phẩm</h1>
        <a href="/admin/product">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên Sản Phẩm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", {
                required: "Tên sản phẩm không được bỏ trống",
                minLength: { value: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
              })}
              type="text"
            />
            {errors?.name && <span className="text-red-500">{errors?.name?.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ảnh Sản Phẩm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("image", { required: "Ảnh sản phẩm không được bỏ trống" })}
              type="file"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs max-h-48" />
            )}
            {errors?.image && <span className="text-red-500">{errors?.image.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mô tả Sản Phẩm
            </label>
            <textarea
              cols="30"
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description")}
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? "Đang Thêm..." : "Thêm"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductAdd;

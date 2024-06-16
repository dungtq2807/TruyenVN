import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../conf/axiosInstance";
import { useState } from "react";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: id,
      name: "",
      image: "",
      description: "",
      status:0||1,
    },
  });

  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL

  useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/${id}`);
      reset(data.comic);
      return data;
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (product) => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", product.name);
      formData.append("file", product.image[0]);
      formData.append("description", product.description);

      const { data } = await axiosInstance.post(
        `/api/v1/comic_detail/post-comic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được thêm thành công!");
      navigate("/admin/product");
    },
    onError: () => {
      toast.error("Sản phẩm không được thêm");
      navigate(`/admin/product/edit/${id}`);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  // Function to handle file input change and show image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <div>ProductEdit</div>
      <div className="flex justify-end">
        <a href="/admin/product">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên Sản Phẩm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", { required: "Tên sản phẩm không được bỏ trống", minLength: { value: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" } })}
              type="text"
            />
            {errors?.name && <span className="text-red-500">{errors?.name.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ảnh Sản Phẩm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("image", { required: "Ảnh sản phẩm không được bỏ trống" })}
              type="file"
              onChange={handleImageChange} // Handle file input change
            />
            {/* Display image preview if available */}
            {imagePreview && (
              
             <div>
             <h1>Ảnh Mới</h1>
             <img
             src={imagePreview}
             alt="Preview"
             className="mt-2 max-w-xs max-h-48"
           /></div>
            )}

            <div>
            <h1>Ảnh Cũ</h1>
            <img src={`http://localhost:8080/img/${id}`} alt="" />
            </div>
            {errors?.image && <span className="text-red-500">{errors?.image.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mô tả Sản Phẩm
            </label>
            <textarea
              cols="30"
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description")}
            ></textarea>
          </div>
          <div>
          <select
            {...register("status")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            
            <option value={1}>Hiện</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? "Đang Thêm..." : "Thêm"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;

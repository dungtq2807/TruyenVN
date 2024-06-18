import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductWithCategory = () => {
  const navigate = useNavigate();

  // Sử dụng React Hook Form để quản lý form và validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sử dụng useQuery để lấy danh sách các danh mục
  const { data: CategoryList, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["CATEGORY"], // Wrap the string "CATEGORY" in an array
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/category/getAll`);
      return data;
    },
  });

  // Sử dụng useQuery để lấy danh sách các truyện
  const { data: ProductList, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["PRODUCT"], // Wrap the string "PRODUCT" in an array
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      return data;
    },
  });

  // Sử dụng useMutation để thực hiện mutation khi submit form
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.put(
        `/api/v1/comic_detail/update-comic-detail`,
        formData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Danh mục đã được thêm thành công!");
      navigate("/admin/product");
    },
    onError: () => {
      toast.error("Thêm danh mục không thành công!");
    },
  });

  // Xử lý khi submit form
  const onSubmit = (formData) => {
    // Gán ID của comic và category được chọn vào formData
    formData = [
        {   
                category: { id: formData.category },
                comic: { id: formData.comic }
        }
      ];
    console.log(formData)
    mutate(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thêm danh mục vào truyện</h2>
      <div className="flex justify-end mb-4">
        <a href="/admin/chapter">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chọn Truyện:
            </label>
            <select
              {...register("comic", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Lựa chọn</option>
              {isLoadingProduct ? (
                <option value="">Loading...</option>
              ) : (
                ProductList.map((product) => (
                  <option key={product.comic.id} value={product.comic.id}>
                    {product.comic.name}
                  </option>
                ))
              )}
            </select>
            {errors.comic && (
              <span className="text-red-500">Bạn cần chọn truyện.</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chọn danh mục:
            </label>
            <select
              {...register("category", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Lựa chọn</option>
              {isLoadingCategory ? (
                <option value="">Loading...</option>
              ) : (
                CategoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))
              )}
            </select>
            {errors.category && (
              <span className="text-red-500">Bạn cần chọn danh mục.</span>
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

export default ProductWithCategory;

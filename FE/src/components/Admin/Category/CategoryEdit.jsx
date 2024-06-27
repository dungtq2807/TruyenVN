import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../conf/axiosInstance";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 useQuery({
    queryKey: ["CATEGORY_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/category/get-one-category/${id}`);
      reset(data); // Populate form with fetched data
      return data;
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (category) => {
      const { data } = await axiosInstance.put(`/api/v1/category/update-category`, category);
      return data;
    },
    onSuccess: () => {
      toast.success("Danh mục đã được cập nhật thành công!");
      navigate("/admin/category");
    },
    onError: () => {
      toast.error("Không thể cập nhật danh mục");
      navigate("/admin/category");
    },
  });

  const onSubmit = (data) => {
    mutate(data); // Trigger mutation on form submit
  };

  return (
    <>
      <div className="text-xl font-bold mb-4">Sửa Danh Mục</div>
      <div className="flex justify-end mb-4">
        <a href="/admin/category">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </a>
      </div>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} defaultValue={id} />

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="category">
              Tên Danh Mục:
            </label>
            <input
              id="category"
              className="form-input w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("category", { required: true, minLength: 3 })}
              type="text"
            />
            {errors.category && (
              <span className="text-red-500">Tên danh mục không được bỏ trống và ít nhất 3 ký tự.</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="status">
              Trạng Thái:
            </label>
            <select
              id="status"
              {...register("status")}
              className="form-select w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>Hiện</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Đang sửa..." : "Sửa"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryEdit;

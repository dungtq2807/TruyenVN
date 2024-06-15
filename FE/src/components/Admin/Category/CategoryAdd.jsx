import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axiosInstance from "../../conf/axiosInstance";

const categorySchema = Joi.object({
  category: Joi.string().required().min(3),
});

const CategoryAdd = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(categorySchema),
    defaultValues: {
      category: "",
      // status:0||1 
     },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (category) => {
      const { data } = await axiosInstance.post(
        `/api/v1/category/add-category`,
        category
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Danh mục đã được thêm thành công!");
      navigate("/admin/category");
    },
    onError: () => {
      toast.error("Danh mục không được thêm");
      navigate("/admin/category");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thêm Danh Mục</h2>
      <div className="flex justify-end mb-4">
        <a href="/admin/category">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên Danh Mục:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("category", { required: true })}
              type="text"
            />
            {errors?.category && (
              <span className="text-red-500">{errors?.category?.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {isPending ? "Đang Thêm..." : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdd;

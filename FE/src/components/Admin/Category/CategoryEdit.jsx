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
  } = useForm({
    defaultValues: {
      category: "",
      id: id,
      status: 0 || 1,
    },
  });
  useQuery({
    queryKey: ["CATEGORY_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/v1/category/get-one-category/${id}`
      );
      reset(data);
      console.log(data);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (category) => {
      const { data } = await axiosInstance.put(
        `/api/v1/category/update-category`,
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
    <>
      <div>Sửa Danh Mục</div>
      <div className="flex justify-end">
        <a href="admin/category">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </a>
      </div>

      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("id")} />
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên Danh Mục:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("category", { required: true, minLength: 3 })}
                  type="text"
                />

                {errors?.category && <span>Không được bỏ trống</span>}
              </div>

              <div>
                <select
                  {...register("status")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={0}>Ẩn</option>
                  <option value={1}>Hiện</option>
                </select>
              </div>

              <button>{isPending ? "Đang Sửa..." : "Sửa"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;

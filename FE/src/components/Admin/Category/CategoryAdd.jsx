import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const categoryChema = Joi.object({
  name: Joi.string().required().min(3),
});
const CategoryAdd = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(categoryChema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (category) => {
      const { data } = await axios.post(
        `http://localhost:3000/categories`,
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
      <div>Thêm Danh Mục</div>
      <div className="flex justify-end">
        <a href="/admin/category">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay Lại
          </button>
        </a>
      </div>

      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên Danh Mục:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name", { required: true })}
                  type="text"
                />
                {errors?.name && <span>{errors?.name?.message}</span>}
              </div>

              <button>{isPending ? "Đang Thêm..." : "Thêm"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryAdd;

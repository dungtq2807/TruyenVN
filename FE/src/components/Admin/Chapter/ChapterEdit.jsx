import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";
import { useEffect } from "react";

const ChapterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sử dụng React Hook Form để quản lý form và validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      id: id,
      comic: "",
    },
  });

  // Sử dụng useQuery để lấy chi tiết chapter
  const { data: chapterDetail} = useQuery({
    queryKey: ["CHAPTER_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/chapter/get-one-chapter/${id}`);
      return data;
    },
  });

  // Đặt lại giá trị form sau khi dữ liệu chapterDetail được tải lên
  useEffect(() => {
    if (chapterDetail) {
      const formattedData = {
        name: chapterDetail.name,
        id: chapterDetail.id,
        comic: chapterDetail.comic.id,
      };
      reset(formattedData);
    }
  }, [chapterDetail, reset]);

  // Sử dụng useQuery để lấy danh sách comic từ API
  const { data: productList, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["PRODUCT"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      return data;
    },
  });

  // Sử dụng useMutation để thực hiện mutation khi submit form
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.put(
        `/api/v1/chapter/update-chapter`,
        formData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Chapter đã được thêm thành công!");
      navigate("/admin/chapter");
    },
    onError: () => {
      toast.error("Thêm chapter không thành công!");
    },
  });

  // Xử lý khi submit form
  const onSubmit = (formData) => {
    const updateData = {
      id: formData.id,
      name: formData.name,
      comic: { id: formData.comic },
    };
    console.log(updateData);
    mutate(updateData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chỉnh Sửa Chapter</h2>
      <div className="flex justify-end mb-4">
        <a href="/admin/chapter">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </a>
      </div>
        
      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên Chapter:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", { required: true })}
              type="text"
            />
            {errors.name && (
              <span className="text-red-500">Bạn cần nhập tên chapter.</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chọn Truyện:
            </label>
            <select disabled
              {...register("comic", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Chọn truyện</option>
              {isLoadingProducts ? (
                <option value="">Loading...</option>
              ) : (
                productList.map((product) => (
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

export default ChapterEdit;

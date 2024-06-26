import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

const History = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: ["HISTORY"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
      queryFn: async () => {
        //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
        const { data } = await axiosInstance.get(`/api/v1/history/getAll`);
        console.log(data)
        return data;
      },
    });
  
    // Sử dụng useMutation để thực hiện mutation
    const { mutate } = useMutation({
      // mutationFn là hàm bất đồng bộ thực hiện việc xóa sản phẩm
      mutationFn: async (id) => {
        // Hiển thị hộp thoại xác nhận từ người dùng bằng cửa sổ confirm
        const isConfirmed = window.confirm(
          "Bạn có chắc chắn muốn xóa sản phẩm này không?"
        );
        if (isConfirmed) {
          // Nếu người dùng xác nhận, gửi yêu cầu DELETE đến URL cụ thể bằng Axios
          await axiosInstance.delete(`/api/v1/history/delete-history/${id}`);
          // Hiển thị toast thông báo thành công
          toast.success("Sản phẩm đã được xóa thành công");
        } else {
          // Nếu người dùng hủy, hiển thị toast thông báo hủy bỏ và ném một lỗi để ngăn việc gọi onSuccess
          toast.info("Hủy bỏ việc xóa sản phẩm");
          throw new Error("Deletion cancelled");
        }
      },
      // Hành động được thực hiện khi mutation thành công
      onSuccess: () => {
        // Vô hiệu hóa truy vấn cụ thể trong cache để cập nhật lại dữ liệu
        queryClient.invalidateQueries({
          queryKey: ["HISTORY"],
        });
      },
      // Hành động được thực hiện khi có lỗi trong quá trình mutation
      onError: (error) => {
        // Kiểm tra nếu lỗi không phải do việc hủy bỏ, hiển thị toast thông báo lỗi
        if (error.message !== "Deletion cancelled") {
          // Vô hiệu hóa truy vấn cụ thể trong cache và hiển thị toast thông báo lỗi
          queryClient.invalidateQueries({
            queryKey: ["HISTORY"],
          });
          toast.error("Không thể xóa sản phẩm");
        }
      },
    });

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">History</h1>
    <ul>
      {data?.content?.map((item) => (
        <li key={item.id} className="flex items-center justify-between border-b border-gray-300 py-2">
         <div>{item?.comic?.name}</div> 
        <div>{item.chapterReaded}</div>
         
          <button
            onClick={() => mutate(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default History
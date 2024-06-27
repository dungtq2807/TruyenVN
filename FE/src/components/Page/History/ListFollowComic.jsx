
import { toast } from "sonner";
import axiosInstance from "../../conf/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import { Link } from "react-router-dom";

const FollowComic = () => {
  const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: ["FollowComic"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
      queryFn: async () => {
        //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
        const { data } = await axiosInstance.get(`/api/v1/follow/getAll`);
        console.log(data)
        return data;
      },
    });
  
    const { mutate } = useMutation({
      // mutationFn là hàm bất đồng bộ thực hiện việc xóa sản phẩm
      mutationFn: async (id) => {
        // Hiển thị hộp thoại xác nhận từ người dùng bằng cửa sổ confirm
        const isConfirmed = window.confirm(
          "Bạn có chắc chắn muốn xóa sản phẩm này không?"
        );
        if (isConfirmed) {
          // Nếu người dùng xác nhận, gửi yêu cầu DELETE đến URL cụ thể bằng Axios
          await axiosInstance.delete(`/api/v1/follow/unfollow/${id}`);
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
          queryKey: ["CATEGORY"],
        });
      },
      // Hành động được thực hiện khi có lỗi trong quá trình mutation
      onError: (error) => {
        // Kiểm tra nếu lỗi không phải do việc hủy bỏ, hiển thị toast thông báo lỗi
        if (error.message !== "Deletion cancelled") {
          // Vô hiệu hóa truy vấn cụ thể trong cache và hiển thị toast thông báo lỗi
          queryClient.invalidateQueries({
            queryKey: ["FollowComic"],
          });
          toast.error("Không thể xóa sản phẩm");
        }
      },
    });
   
 
  return (
    <div>
    <div>
    <div>follow comic</div>



    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td scope="col" className="px-6 py-3"></td>
            <td scope="col" className="px-6 py-3">
              Tên truyện
            </td>
            <td scope="col" className="px-6 py-3">
             Chapter
            </td>
            <td scope="col" className="px-6 py-3">
             Tên người dùng
            </td>
            <td></td>
          
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((item, index) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th className="px-6 py-4">{index + 1}</th>

              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.comic?.name|| "không có"}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                {item.chapterReaded}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
              {item.user.username||item.user.fullname}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
   <button onClick={()=>mutate(item.id)}>Xóa</button>
          </th>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </div>
  )
}

export default FollowComic
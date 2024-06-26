
import axiosInstance from "../../conf/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// import { Link } from "react-router-dom";

const ListFollowComic = () => {


    const { data } = useQuery({
      queryKey: ["FollowComic"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
      queryFn: async () => {
        //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
        const { data } = await axiosInstance.get(`/api/v1/follow/getAll`);
        console.log(data)
        return data;
      },
    });
  
   
 
  return (
    <div>
    <div>
    <div>Danh sách follow comic</div>



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

export default ListFollowComic
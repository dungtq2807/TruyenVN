import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../conf/axiosInstance';

const Category = () => {
    const { data } = useQuery({
        queryKey: ["CATEGORY"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
        queryFn: async () => {
          //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
          const { data } = await axiosInstance.get(`/api/v1/category/getAll`);
            console.log(data)
          return data;
        },
      });
    
    return (
    
        <div>
        {data?.map((item) => (item.status === 1 ? (
            <div key={item.id} className="p-4 border-b">
              <div className="text-lg font-bold">{item.category}</div>
            </div>
          ) : null
        ))}
      </div>
  )
}

export default Category
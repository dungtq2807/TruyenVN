import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import ProductImage from "./ProductImage";

const AllComic = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
    queryFn: async () => {
      //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      console.log(data)
      return data;
    },
  });
  return (
    <div>
    <div className="container m-auto">
 
    <ProductImage products={data} />
  </div>
    </div>
  )
}

export default AllComic

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import ProductListWithPagination from "./ProductListWithPagination";

const ProductList = () => {
    const { data } = useQuery({
        queryKey: ["PRODUCT"],
        queryFn: async () => {
          const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
          console.log(data);
          return data;
        },
      });
    
      const lengthProduct = data?.slice();
  return (
    <div className=''>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Danh sách truyện</h1>
      <ProductListWithPagination products={lengthProduct}/>
    </div>
  )
}

export default ProductList

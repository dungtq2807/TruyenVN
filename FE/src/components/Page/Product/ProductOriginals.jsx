import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import Product from "./Product";

const ProductOriginals = () => {
    const { data } = useQuery({
        queryKey: ["PRODUCT"],
        queryFn: async () => {
          const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
          console.log(data);
          return data;
        },
      });
    
      const lengthProduct = data?.slice(6, 11);
    return (
    <div>
    <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Phổ Biến</h1>
    <Product products={lengthProduct} />
  </div>
    </div>
  )
}

export default ProductOriginals

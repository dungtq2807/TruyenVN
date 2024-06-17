import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";

import ProductImage from "./ProductImage";

const ProductNew = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      console.log(data);
      return data;
    },
  });

  const lengthProduct = data?.slice(0, 6);
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Truyện Mới</h1>
      <ProductImage products={lengthProduct} />
    </div>
  );
};

export default ProductNew;

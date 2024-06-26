import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../conf/axiosInstance";
import ProductBanner from "./ProductBanner";

const Banner = () => {
    const { data } = useQuery({
        queryKey: ["PRODUCT"],
        queryFn: async () => {
          const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
          console.log(data);
          return data;
        },
      });
    
      const lengthProduct = data?.slice(0,6);
  return (
    <div className=''>
      <ProductBanner products={lengthProduct}/>
    </div>
  )
}

export default Banner

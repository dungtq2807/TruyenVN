
import Test1 from './test1'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './components/conf/axiosInstance';

const Test = () => {
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
      <Test1 products={lengthProduct}/>
    </div>
  )
}

export default Test

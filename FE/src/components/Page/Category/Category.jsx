import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../conf/axiosInstance';
import { Link } from 'react-router-dom';

const Category = () => {
  // Sử dụng useQuery để lấy danh sách các danh mục từ API
  const { data } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/category/getAll`);
      return data;
    },
  });

  return (
    <div className="relative">
      <details className="dropdown">
        <summary className="m-1 btn btn-ghost ">Danh Mục</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          {data?.map((item) => (
            item.status === 1 && (
              <li key={item.id}>
                <Link to>{item.category}</Link>
              </li>
            )
          ))}
        </ul>
      </details>
    </div>
  );
};

export default Category;

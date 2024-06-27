import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link } from "react-router-dom";

const Comments = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT"], // Query key to identify the type of data needed
    queryFn: async () => {
      // queryFn performs a GET request to fetch data from a specific URL
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      console.log(data);
      return data;
    },
  });

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Ảnh Sản Phẩm
            </th>
            <th scope="col" className="px-6 py-3">
              Tên Sản Phẩm
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, index) => (
            <tr
              key={product?.comic?.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">
                <img
                  src={product.imageUrl}
                  width={50}
                  className="rounded-lg"
                  alt=""
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.comic.name}
              </td>
              <td className="px-6 py-4">
                <Link to={`/admin/comments/${product?.comic?.id}`}>
                  <button className="text-blue-600 hover:underline">View Comments</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;

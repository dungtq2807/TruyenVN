import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link } from "react-router-dom";

const ProductChapter = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT"], 
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      return data;
    },
  });

  const getStatusLabel = (status) => {
    return status === 1 ? "Hiện" : status === 0 ? "Ẩn" : "Không xác định";
  };

  return (
    <>
     
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Ảnh Sản Phẩm</th>
              <th scope="col" className="px-6 py-3">Tên Sản Phẩm</th>
              <th scope="col" className="px-6 py-3">Danh mục</th>
              <th scope="col" className="px-6 py-3">Trạng thái</th>
              <th scope="col" className="px-6 py-3">Hành động</th>
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
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product?.listCategory.map((category) => category?.category?.category).join(", ")}
                </td>
                <td className="px-6 py-4">
                  {getStatusLabel(product?.comic?.status)}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/admin/chapter/${product?.comic?.id}`} className="text-blue-600 hover:underline">
                    Danh sách chương
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductChapter;

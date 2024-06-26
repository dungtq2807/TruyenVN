import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link } from "react-router-dom";

const ProductList = () => {
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
      <div className="mb-4">
        <Link
          to="/admin/product/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
        >
          Thêm sản phẩm
        </Link>
        <Link
          to="/admin/product/addCate"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Chọn danh mục
        </Link>
      </div>

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
                    width={100}
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
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                      >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link to={`/admin/product/updateCate/${product?.listCategory?.map((category) => category?.id)}`}>
                          Chỉnh sửa danh mục
                        </Link>
                      </li>
                      <li>
                        <Link to={`/admin/chapter/${product?.comic?.id}`}>
                          Chương
                        </Link>
                      </li>
                      <li>
                        <Link to={`/admin/product/edit/${product?.comic?.id}`}>
                          Chỉnh sửa truyện
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;

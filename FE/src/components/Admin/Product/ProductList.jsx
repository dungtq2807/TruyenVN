import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../conf/axiosInstance";
import { Link } from "react-router-dom";
const ProductList = () => {


  const { data } = useQuery({
    queryKey: ["PRODUCT"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
    queryFn: async () => {
      //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/getAll`);
      console.log(data)
      return data;
    },
  });

  

  // Sử dụng useMutation để thực hiện mutation
 
  const getStatusLabel = (status) => {
    return status === 1 ? "Hiện" : status === 0 ? "Ẩn" : "Không xác định";
  };
  return (
    <>
      <div>ProductList</div>
      <Link to="/admin/product/add">thêm sản phẩm</Link>
      <Link to="/admin/product/addCate">chọn danh mục</Link>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3">
                Ảnh Sản Phẩm
              </td>
              <td scope="col" className="px-6 py-3">
                Tên Sản Phẩm
              </td>
              <td scope="col" className="px-6 py-3">
                Danh mục
              </td>
              <td scope="col" className="px-6 py-3">
                Status
              </td>
              <td scope="col" className="px-6 py-3">
              Action
            </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((product, index) => (
              <tr
                key={product?.comic?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4">{index + 1}</th>
                <th className="px-6 py-4">
                  <img
                    src={product.imageUrl}
                    width={100}
                    className=" rounded-lg"
                    alt=""
                  />
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.comic.name}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product?.listCategory.map((category) => category?.category?.category).join(", ")}
              </th>
                <th className="px-6 py-4">{getStatusLabel(product?.comic?.status)}
              </th>
               
                <th className="px-6 py-4">
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
                      <Link to={`/admin/product/updateCate/${product?.listCategory?.map((category)=>category?.id)}`}>edit danh mục</Link>
                      </li>
                      <li>
                        {" "}
                        <Link to={`/admin/product/edit/${product.comic.id}`}>edit truyện</Link>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;

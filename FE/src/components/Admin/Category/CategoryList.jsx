import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { data } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/category/getAll`);
      return data;
    },
  });

  const getStatusLabel = (status) => {
    return status === 1 ? "Hiện" : status === 0 ? "Ẩn" : "Không xác định";
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Danh sách danh mục</h2>

        <Link
          to="/admin/category/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4 inline-block"
        >
          Thêm danh mục
        </Link>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Tên Danh Mục</th>
                <th className="px-4 py-2">Trạng Thái</th>
                <th className="px-4 py-2">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category, index) => (
                <tr
                  key={category.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{category.category}</td>
                  <td className="px-4 py-3">{getStatusLabel(category.status)}</td>
                  <td className="px-4 py-3 ">
                   
                      <Link
                        to={`/admin/category/edit/${category.id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Sửa
                      </Link>
                    </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryList;

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link, useParams } from "react-router-dom";

const ChapterList = () => {
  const { id } = useParams();
  const { data: chapterList } = useQuery({
    queryKey: ["CHAPTER"], // từ khóa truy vấn để xác định loại dự liệu cần lấy
    queryFn: async () => {
      // Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
      const { data } = await axiosInstance.get(`/api/v1/chapter/getAll/${id}`);
      console.log(data);
      return data;
    },
  });

  const getStatusLabel = (status) => {
    return status === 1 ? "Hiện" : status === 0 ? "Ẩn" : "Không xác định";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách chapter</h2>

      <div className="mb-4">
        <Link
          to="/admin/chapter/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block"
        >
          Thêm Chapter
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Tên Truyện
              </th>
              <th scope="col" className="px-6 py-3">
                Chapter
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {chapterList?.map((chapter, index) => (
              <tr
                key={chapter?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link to={`/admin/image/${chapter.id}`}>
                    <img
                      src={`http://localhost:8080/img/${chapter?.comic?.id}`}
                      width={50}
                      className="rounded-lg"
                      alt=""
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {chapter?.comic?.name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {chapter?.name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {getStatusLabel(chapter?.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="dropdown dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 text-gray-500 dark:text-gray-400"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                      >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </div>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li>
                        <Link to={`/admin/image/${chapter?.id}`}>Xem nội dung</Link>
                      </li>
                      <li>
                        <Link to={`/admin/chapter/edit/${chapter?.id}`}>Sửa</Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChapterList;

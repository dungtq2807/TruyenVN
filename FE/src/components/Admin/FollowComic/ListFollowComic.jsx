import axiosInstance from "../../conf/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const ListFollowComic = () => {
  const { data } = useQuery({
    queryKey: ["FollowComic"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/follow/getAll`);
        return response.data;
      } catch (error) {
        console.error("Error fetching follow comic data:", error);
        return null;
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-xl font-bold">Danh sách theo dõi truyện tranh</div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Tên truyện</th>
              <th className="px-6 py-3">Chapter</th>
              <th className="px-6 py-3">Tên người dùng</th>
            </tr>
          </thead>
          <tbody>
            {data?.content?.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item?.comic?.name || "Không có"}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.chapterReaded}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.user.username || item.user.fullname || "Không có"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFollowComic;

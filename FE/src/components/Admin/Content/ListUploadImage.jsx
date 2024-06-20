import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link, useParams } from "react-router-dom";
import AddUploadImage from "./AddUploadImage";

const ListUploadImage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["IMAGE", id], // Sử dụng hằng số hoặc biến cho queryKey để dễ bảo trì
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/image/getAll?id=${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    },
  });


  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl font-bold mb-4">Danh sách ảnh của Chapter</h2>
      <div className="flex justify-end mb-4">
        <Link to="/admin/chapter">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </Link>
      </div>
      
      <AddUploadImage/>
  
      <div className="grid grid-cols-4 gap-4"> {/* Sử dụng grid layout với Tailwind CSS */}
        {data && data.map((image) => (
          <img key={image.id} src={image.image} alt={image.name} className="rounded-lg " /> 
        ))}
      </div>
    </div>
  );
};

export default ListUploadImage;

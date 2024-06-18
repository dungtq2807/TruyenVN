import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./components/conf/axiosInstance";
import { useParams } from "react-router-dom";

const Test = () => {
  const { id } = useParams(); // Get comicId from URL parameters

  const { data, isLoading, error } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/${id}`);
      console.log(data)
      return data; // Assuming data.comic contains the comic details
    },
  });

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Show loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Optional: Show error message if request fails
  }

  if (!data || !data.comic) {
    return <div>Truyện tranh không tồn tại</div>; // Show message if comic data is empty or invalid
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img src={data.imageUrl} alt={data.comic.name} className="w-full h-96 object-cover object-center rounded-t-lg" />
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800">{data.comic.name}</h2>
          <p className="text-gray-600 text-sm mb-4">Tác giả: {data.comic.author}</p>
          <div className="flex flex-wrap mt-4">
          {data.listCategory?.map(category => (
            <span key={category.category.id} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 rounded-full m-1">
              {category.category.category} {/* Assuming `name` is the property that holds the category name */}
            </span>
          ))}
        </div>
          <p className="text-gray-700">{data.comic.description}</p>
          
         
        </div>
      </div>
    </div>
  );
};

export default Test;

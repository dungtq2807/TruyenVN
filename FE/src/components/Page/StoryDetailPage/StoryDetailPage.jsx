import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import ProductList from "../Product/ProductList";
import Comments from "./ListComments";

const StoryDetailPage = () => {
  const { id } = useParams();
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["CHAPTER", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/chapter/getAll/${id}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left section: Chapters and navigation */}
      <div className="lg:w-3/4 bg-gray-100 p-4 lg:p-8 overflow-y-auto">
        {/* Display comic detail if data is loaded */}
        {data && (
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8 mb-8">
            <h1 className="text-2xl font-semibold mb-4">Danh Sách Chương</h1>
            {data.map((chapter) => (
              <div key={chapter.id} className="mb-4">
                <Link to={`/chapter/${chapter.id}`} className="block text-lg font-semibold mb-2 hover:text-blue-600">
                  {chapter.name}
                </Link>
                <div className="text-sm text-gray-600">
                  Ngày tạo: {new Date(chapter.comic?.dateCreatedAt).toLocaleString()}
                </div>
                <hr className="my-2 border-gray-300" />
              </div>
            ))}
          </div>
        )}
        {/* Display comments and related products */}
        <Comments />
        <ProductList />
      </div>

      {/* Right section: Comic image and detailed description */}
      <div className="lg:w-1/4 bg-white p-4 lg:p-8">
        {/* Display comic image, title, and description */}
        {data && data[0]?.comic && (
          <div className="mb-4">
            {/* Comic image and title */}
            <div className="mb-4 text-center">
              <img
                src={`http://localhost:8080/img/${data[0].comic.id}`} 
                alt={data[0].comic.name} 
                className="rounded-lg mb-4 max-w-full h-auto mx-auto"
                style={{ maxWidth: "200px" }}
              />
              <h2 className="text-xl font-semibold">{data[0].comic.name}</h2>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">
                {showDescription
                  ? data[0].comic.description
                  : `${data[0].comic.description.slice(0, 100)}...`}
              </p>
              <button
                onClick={toggleDescription}
                className="text-blue-600 hover:underline mt-2 cursor-pointer"
              >
                {showDescription ? "Hide" : "Read More"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetailPage;

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import ProductList from "../Product/ProductList";

const StoryDetailPage = () => {
  const { id } = useParams();
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comic_detail/${id}`);
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left section: Chapters and navigation */}
      <div className="lg:w-3/4 bg-gray-100 p-4 lg:p-8 overflow-y-auto">
        {/* Display comic detail if data is loaded */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {data && (
          <div className="bg-white rounded-lg shadow-lg  lg:p-8 mb-8">
            <Link to={``} className="text-lg font-semibold mb-2">chapter 1</Link>

            <hr/>
            <Link className="text-lg font-semibold  mb-2">chapter 2</Link>
            <hr/>            

            
          </div>
        )}
        <ProductList/>
      </div>

      {/* Right section: Description */}
      <div className="lg:w-1/4 bg-white p-4 lg:p-8">
        {/* Display comic image, title, and description */}
        <div className="mb-4">
          {/* Comic image and title */}
          <div className="mb-4 text-center">
            <img
              src={data?.imageUrl} // Assuming the image URL is in 'comic.image'
              alt={data?.comic?.name} // Assuming the name is in 'comic.name'
              className="rounded-lg mb-4 max-w-full h-auto mx-auto"
              style={{ maxWidth: "200px" }}
            />
            <h2 className="text-lg font-semibold">{data?.comic?.name}</h2>
               
          </div>

          {/* Description */}
          <div>
          <h1>{data?.listCategory?.category}</h1>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            {data && (
              <>
                {showDescription ? (
                  <p className="text-gray-700">{data?.comic?.description}</p>
                ) : (
                  <p className="text-gray-700">{data?.comic?.description.slice(0, 100)}...</p>
                )}
                <button
                  onClick={toggleDescription}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {showDescription ? "Ẩn đi" : "Xem thêm"}
                </button>
              </>
            )}
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default StoryDetailPage;

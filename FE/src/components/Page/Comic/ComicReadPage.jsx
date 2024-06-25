import { useQuery } from "@tanstack/react-query";
import HeaderComicRead from "../../Header/HeaderComicRead";
import axiosInstance from "../../conf/axiosInstance";
import { useParams } from "react-router-dom";

const ComicReadPage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["IMAGE", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/image/getAll?id=${id}`
        );
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    },
  });

  const { data: chapter } = useQuery({
    queryKey: ["CHAPTER", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/chapter/getAll/${id}`);
      console.log(data);
      return data;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeaderComicRead />
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-center">
          {data &&
            data.map((image) => (
              <div key={image.id} className="relative m-4">
                <img src={image.image} alt={image.name} className="rounded-lg shadow-lg" />
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ComicReadPage;

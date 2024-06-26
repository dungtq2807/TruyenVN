import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddFollowComic from "../../Admin/FollowComic/AddFollowComic";

const ComicReadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentComicId, setCurrentComicId] = useState(null);

  const {
    data: images,
    isLoading: imagesLoading,
    isError: imagesError,
  } = useQuery({
    queryKey: ["IMAGE", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/image/getAll?id=${id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    },
  });

  const {
    data: chapter,
    isLoading: chapterLoading,
    isError: chapterError,
  } = useQuery({
    queryKey: ["CHAPTER", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/v1/chapter/get-one-chapter/${id}`
      );
      console.log(data);
      return data;
    },
  });

  const {
    data: allChapters,
    isLoading: allChaptersLoading,
    isError: allChaptersError,
  } = useQuery({
    queryKey: ["ALL_CHAPTERS"],
    queryFn: async () => {
      if (currentComicId) {
        const { data } = await axiosInstance.get(
          `/api/v1/chapter/getAll/${currentComicId}`
        );
        console.log(data);
        return data;
      }
      return [];
    },
    enabled: !!currentComicId,
  });

  useEffect(() => {
    if (chapter) {
      setCurrentComicId(chapter?.comic?.id);
    }
  }, [chapter]);

  if (imagesLoading || chapterLoading || allChaptersLoading)
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (imagesError || chapterError || allChaptersError)
    return <p className="text-center mt-8 text-red-600">Error loading data</p>;

  const currentIndex = allChapters.findIndex((chapter) => chapter.id === id);
  const prevChapterId =
    currentIndex > 0 ? allChapters[currentIndex - 1].id : null;
  const nextChapterId =
    currentIndex < allChapters.length - 1
      ? allChapters[currentIndex + 1].id
      : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{chapter?.comic?.name}</h1>
        <h2 className="text-xl font-semibold">{chapter?.name}</h2>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {images &&
            images.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.image}
                  alt={image.name}
                  className=""
                />
              </div>
            ))}
        </div>
      </div>

      <div className="sticky bottom-4 bg left-4 right-4 m-3 p-8 flex justify-center items-center">
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={() => prevChapterId && navigate(`/chapter/${prevChapterId}`)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <select
          value={id}
          onChange={(e) => navigate(`/chapter/${e.target.value}`)}
          className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none mx-4"
        >
          {allChapters?.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.name}
            </option>
          ))}
        </select>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded ${
            currentIndex === allChapters.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          onClick={() => nextChapterId && navigate(`/chapter/${nextChapterId}`)}
          disabled={currentIndex === allChapters.length - 1}
        >
          Next
        </button>
     
        
      </div>
         <AddFollowComic allChapters={allChapters} currentChapterId={id} />
    </div>
  );
};

export default ComicReadPage;

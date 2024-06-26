import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./components/conf/axiosInstance";
import { useState, useEffect } from "react";

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const { data: chapters, isLoading, isError } = useQuery({
    queryKey: ["CHAPTER", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/chapter/getAll/${id}`);
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    if (chapters) {
      const index = chapters.findIndex((chapter) => chapter.id === parseInt(id));
      setCurrentChapterIndex(index);
    }
  }, [chapters, id]);

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      navigate(`/chapter/${nextChapterId}`);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapterId = chapters[currentChapterIndex - 1].id;
      navigate(`/chapter/${prevChapterId}`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="flex">
      <div className="lg:w-1/4 bg-white p-4 lg:p-8">
        {chapters && chapters.length > 0 && (
          <div className="mb-4">
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePreviousChapter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={currentChapterIndex === 0}
              >
                Previous Chapter
              </button>
              <select
                value={id}
                onChange={(e) => navigate(`/chapter/${e.target.value}`)}
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
              >
                <option>Choose chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextChapter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={currentChapterIndex === chapters.length - 1}
              >
                Next Chapter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetailPage;

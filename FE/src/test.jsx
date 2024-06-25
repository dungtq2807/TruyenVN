import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./components/conf/axiosInstance";

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["CHAPTER", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/chapter/getAll/${id}`);
      console.log(response.data);
      return response.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const handleNextChapter = () => {
    const currentChapterIndex = data.findIndex((chapter) => chapter.id === id);
    if (currentChapterIndex !== -1 && currentChapterIndex < data.length - 1) {
      const nextChapter = data[currentChapterIndex + 1];
      navigate(`/chapter/${nextChapter.id}`);
    } else {
      console.log("No next chapter available");
    }
  };

  const handlePreviousChapter = () => {
    const currentChapterIndex = data.findIndex((chapter) => chapter.id === id);
    if (currentChapterIndex !== -1 && currentChapterIndex > 0) {
      const previousChapter = data[currentChapterIndex - 1];
      navigate(`/chapter/${previousChapter.id}`);
    } else {
      console.log("No previous chapter available");
    }
  };

  return (
    <div className="flex">
      <div className="lg:w-1/4 bg-white p-4 lg:p-8">
        {data && data.length > 0 && (
          <div className="mb-4">
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePreviousChapter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={data.findIndex((chapter) => chapter.id === id) === 0}
              >
                Previous Chapter
              </button>
              <select
                value={id}
                onChange={(e) => navigate(`/chapter/${e.target.value}`)}
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
              >
                <option>Choose chapter</option>
                {data.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextChapter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={data.findIndex((chapter) => chapter.id === id) === data.length - 1}
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

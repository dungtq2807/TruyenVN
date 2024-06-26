import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
const AddFollowComic = ({ allChapters, currentChapterId }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post(
        `/api/v1/follow/follow-comic`,
        formData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Chapter đã được follow!");
    },
    onError: () => {
      toast.error("Danh mục không được thêm");
    },
  });

  


  

  const onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    const chapterToFollow = allChapters.find((chapter) => chapter.id === currentChapterId);
    const formData = {
      comic: {
        id: chapterToFollow?.comic?.id || "", // Assuming comic id is nested under comic object
      },
      chapterReaded: chapterToFollow?.name || "", // Assuming chapter name is what you want to send
    };
    mutate(formData);
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isPending}
        >
          {isPending ? "Đang xử lý..." : "Follow Chapter"}
        </button>
      </form>
    </div>
  );
};

export default AddFollowComic;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
const EComments = ({ commentId, onClose }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["COMMENT_DETAIL", commentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comments/get-one-comment/${commentId}`);
      reset(data?.data);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (comment) => {
      const { data } = await axiosInstance.put(`/api/v1/comments/update-comment`, comment);
      return data;
    },
    onSuccess: () => {
      toast.success("Comment has been updated successfully!");
      // navigate("/admin/comments");
      queryClient.invalidateQueries({ queryKey: ["COMMENTS"] });
      onClose();
    },
    onError: () => {
      toast.error("Failed to update the comment");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="container mx-auto p-4">
     
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input type="hidden" {...register("id")} value={commentId} />
          <textarea
            {...register("comments", { required: "Comment content is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.comments && (
            <p className="text-red-600 text-sm mt-1">{errors.comments.message}</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {isPending ? "Updating..." : "Update Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EComments;

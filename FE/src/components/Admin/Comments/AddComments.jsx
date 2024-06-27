import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../conf/axiosInstance';
import { toast } from 'sonner';

const AddComments = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comments: "",
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (comment) => {
      const { data } = await axiosInstance.post(
        `/api/v1/comments/add-comment`,
        comment
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Comment has been added successfully!");
      reset(),
      queryClient.invalidateQueries({
        queryKey: ["COMMENTS", id],
      });
    },
    onError: () => {
      toast.error("Failed to add the comment");
    },
  });

  const onSubmit = (formData) => {
    const data = {
      comments: formData.comments,
      comic: {
        id: id,
      },
    };
    mutate(data);
  };

  return (
    <div className="container mx-auto p-4">
   
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            {...register("comments", { required: "Comment content is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.comments && (
            <p className="text-red-600 text-sm mt-1">{errors.comments.message}</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isPending ? "Adding..." : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComments;

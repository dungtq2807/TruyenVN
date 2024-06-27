import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";
import EditComments from "./EditComments";
import AddComments from "./AddComments";

const ListComments = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [editCommentId, setEditCommentId] = useState(null);

  const { data } = useQuery({
    queryKey: ["COMMENTS", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/comments/getAll/${id}`);
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (commentId) => {
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
      if (isConfirmed) {
        await axiosInstance.delete(`/api/v1/comments/delete-comment/${commentId}`);
        toast.success("Bình luận đã được xóa thành công");
      } else {
        toast.info("Hủy bỏ việc xóa bình luận");
        throw new Error("Deletion cancelled");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["COMMENTS", id] });
    },
    onError: (error) => {
      if (error.message !== "Deletion cancelled") {
        toast.error("Không thể xóa bình luận");
      }
    },
  });

  const getStatusLabel = (status) => {
    return status === 1 ? "Hiện" : status === 0 ? "Ẩn" : "Không xác định";
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-4">bình luận</div>
      <div className="space-y-4">
        {data?.data?.content?.map((item) => (
          <div key={item?.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col dark:bg-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item?.dateCreatedAt}</p>
                <p className="font-medium text-gray-900 dark:text-white">{item?.userResponse?.username}</p>
              </div>
              <div>
                <span className={`text-xs ${item?.status === 1 ? "text-green-500" : "text-red-500"}`}>
                  {getStatusLabel(item?.status)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{item?.comments}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="text-red-600 hover:underline" onClick={() => mutate(item?.id)}>
                Xóa
              </button>
              <button className="text-blue-600 hover:underline" onClick={() => setEditCommentId(item?.id)}>
                Chỉnh sửa
              </button>
            </div>
            {editCommentId === item?.id && (
              <div className="mt-4">
                <EditComments commentId={item?.id} onClose={() => setEditCommentId(null)} />
              </div>
            )}
          </div>
        ))}
      </div>
      <AddComments />
    </div>
  );
};

export default ListComments;

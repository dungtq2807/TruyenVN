import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { Link, useParams } from "react-router-dom";
import AddUploadImage from "./AddUploadImage";
import EditUploadImage from "./EditUploadImage";
import { toast } from "sonner";

const ListUploadImage = () => {
  const { id } = useParams();
  const [editImageId, setEditImageId] = useState(null); // State to track image being edited
  const queryClient = useQueryClient();

  // Fetch images data for the current chapter ID
  const { data } = useQuery({
    queryKey: ["IMAGE", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/image/getAll?id=${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    },
  });

  // Mutation hook for deleting an image
  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (imageId) => {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa ảnh này không?"
      );
      if (isConfirmed) {
        await axiosInstance.delete(`/api/v1/image/delete-image/${imageId}`);
        toast.success("Ảnh đã được xóa thành công");
      } else {
        toast.info("Hủy bỏ việc xóa ảnh");
        throw new Error("Deletion cancelled");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["IMAGE", id],
      });
    },
    onError: (error) => {
      if (error.message !== "Deletion cancelled") {
        queryClient.invalidateQueries({
          queryKey: ["IMAGE", id],
        });
        toast.error("Không thể xóa ảnh");
      }
    },
  });

  // Handle click on Edit button to set editImageId
  const handleEditClick = (imageId) => {
    setEditImageId(imageId);
  };

  // Handle cancel edit to reset editImageId
  const handleCancelEdit = () => {
    setEditImageId(null);
  };

  // Handle delete image
  const handleDeleteImage = (imageId) => {
    mutateDelete(imageId);
  };

  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl font-bold mb-4">Danh sách ảnh của Chapter</h2>
      <div className="flex justify-end mb-4">
        <Link to="/admin/chapter">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Quay Lại
          </button>
        </Link>
      </div>

      {/* Conditional rendering of Edit or Add form */}
      {editImageId ? (
        <>
          <EditUploadImage key={editImageId} id={editImageId} />
          <button
            onClick={handleCancelEdit}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Hủy
          </button>
        </>
      ) : (
        <AddUploadImage />
      )}

      {/* Render images in a grid */}
      <div className="grid grid-cols-4 gap-4">
        {data &&
          data.map((image, index) => (
            <div key={image.id} className="relative">
              <span className="absolute top-1 left-1 bg-white text-gray-800 font-semibold px-2 py-1 rounded-md z-10">
                {index + 1} {/* Displaying 1-based index */}
              </span>
              <img
                src={image.image}
                alt={image.name}
                className="rounded-lg cursor-pointer"
                onClick={() => handleEditClick(image.id)}
              />
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded"
              >
                Xóa
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListUploadImage;

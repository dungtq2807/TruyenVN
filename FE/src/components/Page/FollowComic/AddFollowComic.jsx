import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosInstance";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

const AddFollowComic = () => {
    // const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async (category) => {
          const { data } = await axiosInstance.post(
            `/api/v1/follow/follow-comic`,
            category
          );
          return data;
        },
        onSuccess: () => {
          toast.success("Chapter đã được follow!");
        //   navigate("/admin/category");
        },
        onError: () => {
          toast.error("Danh mục không được thêm");
        //   navigate("/admin/category");
        },
      });
    
      const onSubmit = (data) => {
        mutate(data);
      };
  return (
    <div>
      
    </div>
  )
}

export default AddFollowComic

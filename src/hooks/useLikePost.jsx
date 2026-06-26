import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const likePost = async (postid) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.put(
    `${URL}/post/likes/${postid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["myposts"] });
    },
  });
};
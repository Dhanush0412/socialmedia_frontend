import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const unlikePost = async (postid) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.put(
    `${URL}/post/unlike/${postid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      queryClient.invalidateQueries({ 
        queryKey: ["myposts"] 
      });
    },
  });
};
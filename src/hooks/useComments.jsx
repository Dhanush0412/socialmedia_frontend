import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const token = () => localStorage.getItem("token");

{ /*GET COMMENTS */}
const getComments = async (postid) => {
  const { data } = await axios.get(
    `${URL}/post/getcomments/${postid}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
  return data;
};

export const useComments = (postid) => {
  return useQuery({
    queryKey: ["comments", postid],
    queryFn: () => getComments(postid),
    enabled: !!postid,
  });
};

{ /* ADD COMMENT */ }
const addComment = async ({ postid, text }) => {
  const { data } = await axios.post(
    `${URL}/post/comment/${postid}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
  return data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postid],
      });

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["myposts"] });
    },
  });
};

{ /*  DELETE COMMENT  */ }
const deleteComment = async ({ commentid }) => {
  const { data } = await axios.delete(
    `${URL}/post/deletecomment/${commentid}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
  return data;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postid],
      });

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["myposts"] });
    },
  });
};
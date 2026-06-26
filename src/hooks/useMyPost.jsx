import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getMyPosts = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`${URL}/post/getmypost`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useMyPosts = () => {
  return useQuery({
    queryKey: ["myposts"],
    queryFn: getMyPosts,
  });
};
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getFeed = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${URL}/post/feed`, 
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });
};
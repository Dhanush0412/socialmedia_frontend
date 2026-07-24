import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getFeed = async ({ pageParam = 1 }) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${URL}/post/feed?page=${pageParam}&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useFeed = () => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: getFeed,

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};
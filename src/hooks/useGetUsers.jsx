import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = async () => {
  const response =
    await axios.get(
      "https://6985ac756964f10bf2540df1.mockapi.io/user"
    );

  return response.data;
};

export const useGetUsers =
  () => {
    return useQuery({
      queryKey: [
        "users",
      ],

      queryFn:
        getUsers,
    });
  };
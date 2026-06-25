import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const {data} = await axios.get(
    `${URL}/profile/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });
};
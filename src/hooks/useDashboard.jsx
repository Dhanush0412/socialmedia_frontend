import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getDashboard = async (profileid) => {
  const response = await axios.get(
    `${URL}/profile/dashboard/${profileid}`
  );

  return response.data;
};

export const useDashboard = (profileid) => {
  return useQuery({
    queryKey: ["dashboard", profileid],
    queryFn: () => getDashboard(profileid),
    enabled: !!profileid,
  });
};
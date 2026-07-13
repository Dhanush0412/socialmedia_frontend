import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getRequests = async () => {

  const response = await axios.get(
    `${URL}/connection/pending`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  console.log("Pending API Response:", response.data);

  return response.data;

};

export const usePendingRequests = () => {

  return useQuery({
    queryKey: ["pending-request"],
    queryFn: getRequests
  });

};
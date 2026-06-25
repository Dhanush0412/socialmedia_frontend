import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getGroupDetails=async(groupid)=>{
  const response=await axios.get(
    `${URL}/group/details/${groupid}`
  );
  return response.data;
};

export const useGroupDetails=(groupid)=>{
  return useQuery({
    queryKey:["group-details",groupid],
    queryFn:()=>getGroupDetails(groupid),
    enabled:!!groupid
  });
};
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getMyGroups=async(profileid)=>{
  const response=await axios.get(
    `${URL}/group/mygroups/${profileid}`
  );
  return response.data;
};

export const useMyGroups=(profileid)=>{
  return useQuery({
    queryKey:["my-groups",profileid],
    queryFn:()=>getMyGroups(profileid),
    enabled:!!profileid
  });
};
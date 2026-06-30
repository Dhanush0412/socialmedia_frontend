import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../config";

const createGroup = async(groupData)=>{
  const response=await axios.post(
    `${URL}/group/new`,
    groupData,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
  )
  return response.data;
};

export const useCreateGroup=()=>{
  return useMutation({
    mutationFn:createGroup,
    onSuccess:(data)=>{
      toast.success(
        data.message || "Group created successfully"
      );
    },
    onError:(error)=>{
      toast.error(
        error.response?.data || "Group creation failed"
      );
    }
  });
};
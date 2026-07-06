import {useMutation,useQueryClient}
from "@tanstack/react-query";

import axios from "axios";

import {URL}
from "../../../config";

import {toast}
from "react-toastify";
const acceptRequest=async(id)=>{

const response=await axios.put(
`${URL}/connection/accept/${id}`,
{},
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);
return response.data;
};
export const useAcceptRequest=()=>{
  const queryClient=useQueryClient();
return useMutation({
mutationFn:acceptRequest,
onSuccess:(data)=>{
    queryClient.invalidateQueries({
        queryKey:["requests"]
      });

      queryClient.invalidateQueries({
        queryKey:["connections"]
      });

toast.success(
data.message || "Connected"
);
}
});
};
import {useMutation, useQueryClient}
from "@tanstack/react-query";

import axios from "axios";

import {URL}
from "../../../config";
import {toast} from "react-toastify"

const rejectRequest=async(id)=>{
    

const response=await axios.put(

`${URL}/connection/reject/${id}`,

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
export const useRejectRequest=()=>{
const queryClient=useQueryClient();

return useMutation({

mutationFn:rejectRequest,


onSuccess:(data)=>{
    queryClient.invalidateQueries({
        queryKey:["requests"]
    }),
toast.info(
data.message || "Rejected"
);

}

});

}
import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

export const useCreateGroup=()=>{

const queryClient=useQueryClient();

return useMutation({

mutationFn:async(data)=>{

const response=await axios.post(
`${URL}/group/new`,
data,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

},

onSuccess:()=>{
queryClient.invalidateQueries([
"mygroups"
]);
}

});

};
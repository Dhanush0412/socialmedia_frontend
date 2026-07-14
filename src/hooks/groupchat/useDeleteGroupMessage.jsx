import {useMutation,useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

export const useDeleteGroupMessage=()=>{

const queryClient=useQueryClient();

return useMutation({

mutationFn:async({

groupid,
messageid

})=>{

const response=await axios.delete(
`${URL}/message/delete/${groupid}/${messageid}`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

},

onSuccess:(data,variables)=>{

queryClient.invalidateQueries({
queryKey:[
"group-messages",
variables.groupid
]
});

}

});

};
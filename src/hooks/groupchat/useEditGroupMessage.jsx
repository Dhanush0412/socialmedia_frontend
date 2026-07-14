import {useMutation,useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

export const useEditGroupMessage=()=>{

const queryClient=useQueryClient();

return useMutation({

mutationFn:async({

groupid,
messageid,
text

})=>{

const response=await axios.put(
`${URL}/message/edit/${groupid}/${messageid}`,
{text},
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
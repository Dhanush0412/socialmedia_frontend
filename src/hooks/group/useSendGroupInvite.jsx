import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {URL} from "../../config";


const sendGroupInvite=async(data)=>{

const response=await axios.post(
`${URL}/group/invite`,
data,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

};



export const useSendGroupInvite=()=>{

return useMutation({

mutationFn:sendGroupInvite,

onSuccess:(data)=>{

toast.success(
data.message || "Invite sent"
);

},

onError:(error)=>{

toast.error(
error.response?.data || "Invite failed"
);

}

});

};
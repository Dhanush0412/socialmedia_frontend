import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {URL} from "../../../config";

const sendConnection=async(receiverid)=>{

console.log("Receiver ID:",receiverid);

const response=await axios.post(
`${URL}/connection/send/${receiverid}`,
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
export const useSendConnection=()=>{

return useMutation({
mutationFn:sendConnection,
onSuccess:(data)=>{
toast.success(
data.message || "Request Sent"
);

},

onError:(error)=>{
toast.error(
error.response?.data ||
"Request failed"
);
}
});
};
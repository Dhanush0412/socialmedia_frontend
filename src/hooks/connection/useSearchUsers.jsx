import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";
const searchUsers=async(username)=>{
const response=await axios.get(
`${URL}/user/search?username=${username}`,
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);
return response.data;
};
export const useSearchUsers=(username)=>{
return useQuery({
queryKey:[
"search-users",
username
],
queryFn:()=>searchUsers(username),
enabled:!!username
});

};
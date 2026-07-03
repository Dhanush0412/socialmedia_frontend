import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

export const useGroupInvites=()=>{

return useQuery({

queryKey:["group-invites"],

queryFn:async()=>{

const {data}=await axios.get(
`${URL}/group/invites`,
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);

return data;

}

});

};
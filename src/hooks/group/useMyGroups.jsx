import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getMyGroups = async () => {

const response = await axios.get(
`${URL}/group/mygroups`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

};

export const useMyGroups = () => {

return useQuery({

queryKey:["my-groups"],

queryFn:getMyGroups

});

};
import {
    useQuery
} from "@tanstack/react-query";


import axios from "axios";

import {
    URL
} from "../../config";


const getProfile = async(userid)=>{


const response =
await axios.get(

`${URL}/profile/${userid}`

);


return response.data;


};



export const useProfile=(userid)=>{


return useQuery({

queryKey:[
"profile",
userid
],


queryFn:
()=>getProfile(userid),


enabled:
!!userid


});


};
import {
useQuery
} from "@tanstack/react-query";


import axios from "axios";

import {
URL
} from "../../config";



const getFriends=async(userid)=>{


const response=
await axios.get(

`${URL}/friend/${userid}`

);


return response.data;


};



export const useFriends=(userid)=>{


return useQuery({

queryKey:[
"friends",
userid
],


queryFn:
()=>getFriends(userid),


enabled:
!!userid


});


};
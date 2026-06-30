import {useQuery}
from "@tanstack/react-query";

import axios from "axios";

import {URL}
from "../../../config";


const getConnections=async()=>{


const response=await axios.get(

`${URL}/connection/list`,

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`

}

}

);


return response.data;


};



export const useConnections=()=>{


return useQuery({

queryKey:[
"connections"
],

queryFn:getConnections

});


};
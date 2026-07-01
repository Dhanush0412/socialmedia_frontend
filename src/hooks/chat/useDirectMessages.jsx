import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

export function useDirectMessages(receiverid){

  return useQuery({
    queryKey:["directMessages",receiverid],

    queryFn:async()=>{

      const response = await axios.get(
        `${URL}/dmessage/getting/${receiverid}`,
        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      return response.data;
    },

    enabled:!!receiverid
  });

}
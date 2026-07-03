import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

export function useSendMessage(){

  return useMutation({
    mutationFn:async({receiverid,text})=>{

      const response = await axios.post(
        `${URL}/dmessage/sending/${receiverid}`,
        {
          text
        },
        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      return response.data;
    }
  });

}
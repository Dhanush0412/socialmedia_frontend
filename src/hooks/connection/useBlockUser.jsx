import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";
import { toast } from "react-toastify";


const blockUser = async (blockprofileid)=>{

  const response = await axios.post(
    `${URL}/connection/blockuser/${blockprofileid}`,
    {},
    {
      headers:{
        Authorization:
        `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );


  return response.data;

};



export const useBlockUser =()=>{

  const queryClient = useQueryClient();


  return useMutation({

    mutationFn:blockUser,


    onSuccess:(data)=>{

      toast.success(data);


      queryClient.invalidateQueries({
        queryKey:["connections"],
      });


      queryClient.invalidateQueries({
        queryKey:["blockedUsers"],
      });


    },


    onError:(error)=>{

      toast.error(
        error.response?.data ||
        "Unable to block user"
      );

    }

  });


};
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import axios from "axios";

import { URL } from "../../config";


const createProfile = async(data)=>{


    const response =
    await axios.post(

        `${URL}/profile/create`,

        data

    );


    return response.data;

};



export const useCreateProfile = ()=>{


    const queryClient =
    useQueryClient();


    return useMutation({

        mutationFn:createProfile,


        onSuccess:()=>{

            queryClient.invalidateQueries([
                "profile"
            ]);

        }

    });


};
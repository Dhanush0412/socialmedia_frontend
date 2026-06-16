import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";


const loginUser = async (data)=>{

    const response = await axios.post(
        `${URL}/user/login`,
        data
    );


};


export const useLogin = ()=>{

    return useMutation({

        mutationFn: loginUser

    });

};
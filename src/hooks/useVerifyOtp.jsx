import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../config";


const verifyOtp = async(data)=>{

const response = await axios.post(
`${URL}/user/verifyotp`,
data
);
return response.data;
}

export const useVerifyOtp=()=>{
return useMutation({
mutationFn:verifyOtp
});


}
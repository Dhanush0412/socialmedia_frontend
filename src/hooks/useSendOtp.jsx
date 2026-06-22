import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../config";


const sendOtp = async(data)=>{

const response = await axios.post(
`${URL}/user/sentotp`,
data
);

return response.data;
}
export const useSendOtp=()=>{
return useMutation({
mutationFn:sendOtp

});

}
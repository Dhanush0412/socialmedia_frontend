import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const updatePassword =
async ({ id, password }) => {

const response =
await axios.put(

`https://6985ac756964f10bf2540df1.mockapi.io/user/${id}`,

{
password
}

);

return response.data;

};

export const useForgotPassword =
() => {

return useMutation({

mutationFn:
updatePassword,

});

};
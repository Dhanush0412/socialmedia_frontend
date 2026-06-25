
// // import { useMutation } from "@tanstack/react-query";
// // import axios from "axios";
// // import { URL } from "../../config";

// // const createProfile = async (formData) => {
// //   const { data } = await axios.post(
// //   `${URL}/profile/create`,
// //   formData,
// //   {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //     },
// //   }
// // );

// //   return data;
// // };

// // export const useCreateProfile = () => {
// //   return useMutation({
// //     mutationFn: createProfile,
// //   });
// // };


// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { URL } from "../../config";

// const createProfile = async (formData) => {
//   const userid = formData.get("userid");

//   const { data } = await axios.post(
//     `${URL}/profile/create/${userid}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return data;
// };

// export const useCreateProfile = () => {
//   return useMutation({
//     mutationFn: createProfile,
//   });
// };


import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
 

import { useMutation } from "@tanstack/react-query";

import axios from "axios";
 
import { URL } from "../../config";

 
const createProfile = async(data)=>{
 
 
    const response =
    await axios.post(
 
        `${URL}/profile/create`,
 
        data
 
    );
 
 
    return response.data;
 

const createProfile = async (formData) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    `${URL}/profile/create`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;

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
 
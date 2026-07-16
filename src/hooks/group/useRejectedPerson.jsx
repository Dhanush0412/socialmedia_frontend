// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { URL } from "../../../config";

// const getRejectedMembers = async (groupid) => {

//   console.log("groupid =", groupid);

//   const response = await axios.get(
//     `${URL}/group/rejectedlist/${groupid}`,
//     {
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem("token")}`
//       }
//     }
//   );

//   console.log(response.data);

//   return response.data;
// };

// export function useRejectedMembers(groupid) {
//   return useQuery({
//     queryKey: ["rejected-members", groupid],
//     queryFn: () => getRejectedMembers(groupid),
//     enabled: Boolean(groupid),
//     retry: false,
//   });
// }
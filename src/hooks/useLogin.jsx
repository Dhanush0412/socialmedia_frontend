import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const loginUser = async (userData) => {
  const response = await axios.post(
    "https://6985ac756964f10bf2540df1.mockapi.io/user"
    // "http://localhost:5000/user/login",
    // userData
  );

  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
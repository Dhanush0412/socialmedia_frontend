import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post(
    // "http://localhost:5000/user/signup",
    "https://6985ac756964f10bf2540df1.mockapi.io/user",
    userData
  );

  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
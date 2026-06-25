import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const createPost = async (formData) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
        `${URL}/post/create`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
}

    export const useCreatePost = () => {
        return useMutation({
            mutationFn: createPost,
        });
    };
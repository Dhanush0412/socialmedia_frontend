import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const createPost = async (formData) => {
    const profileid = formData.get("profileid");

    const { data } = await axios.post(
        `${URL}/post/create/${profileid}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};

export const useCreatePost = () => {
    return useMutation({
        mutationFn: createPost,
    });
};
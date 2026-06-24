import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getMyPosts = async (profileid) => {
    const { data } = await axios.get(
        `${URL}/post/getmypost/${profileid}`
    );

    return data;
};

export const useMyPosts = (profileid) => {
    return useQuery({
        queryKey: ["myposts", profileid],
        queryFn: () => getMyPosts(profileid),

    });
};
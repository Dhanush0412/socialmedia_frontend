import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";


const getChatList=async()=>{

 const token=localStorage.getItem("token");


 const {data}=await axios.get(

 `${URL}/dmessage/chatlist`,

 {
 headers:{
 Authorization:
 `Bearer ${token}`
 }
 }

 );


 return data;

};



export const useChatList=()=>{

 return useQuery({

 queryKey:[
 "chatlist"
 ],

 queryFn:getChatList

 });

};
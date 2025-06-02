'use server'
import GetUserInfo from "../getUserInfo";
import axios from "axios";
import { User } from "lucide-react";
import { cookies } from "next/headers";

type verifyOPTprops = {
    email: string;
    otp: string;
}

export default async function verifyOTP({email, otp}: verifyOPTprops){
    console.log("email:", email);
    console.log("otp:", otp);
    try{

        const respones = await axios.post(`${process.env.API_KEY_URL}/verify_otp`,{
            email, otp
        })
        console.log("response:", respones.data);
        const Usertoken = respones.data.token;
        if(respones.data.status == 200 && respones.data.token){
            const getUser = await GetUserInfo(Usertoken);
            return {
                token: true,
                success: true,
                message: respones.data.data,
                userInfo: getUser
            };
        }else{
            return {
                token: Usertoken,
                success: false,
                message: respones.data.message
            };
        }
        
    }catch(error){
        console.log("error", error);
    }

}
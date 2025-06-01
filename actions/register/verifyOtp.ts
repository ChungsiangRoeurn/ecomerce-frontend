'use server'
import GetUserInfo from "../getUserInfo";
import axios from "axios";
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
        if(respones.data.status == 200 && respones.data.token){
            const token = respones.data.token;
            (await cookies()).set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })

            const getUser = GetUserInfo(token)
            return {
                token: true,
                success: true,
                message: respones.data.data,
                userInfo: getUser
            };
        }else{
            return {
                token: false,
                success: false,
                message: respones.data.message
            };
        }
        
    }catch(error){
        console.log("error", error);
    }

}
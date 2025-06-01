'use server'
import axios from "axios";


export default async function(email: string){
    console.log("email:", email);
    try{
        const res = await axios.post(`${process.env.API_KEY_URL}/resendOTP.php`,{
            email
        });
        const Apireturn = await res.data;
        console.log("apiReturn:", Apireturn);
        if(res.data.status == 200){
            return Apireturn;
        }else{
            return Apireturn
        }
    }catch(error){
        console.log("error:", error);
    }
}
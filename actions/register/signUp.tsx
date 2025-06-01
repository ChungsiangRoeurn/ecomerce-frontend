'use server'
import axios, { AxiosResponse } from "axios";

type apiRequest = {
    email: string;
    name: string;
    password: string;
    phone: string;
}
type apiReturnSuccess = {
    status: number;
    status_code?: string;
    message: string;
    data: {
        message: string;
        user: string;
    }
}
type apiReturnError = {
    status: string;
    message: string;
    data: []
}
type apiReturn = apiReturnSuccess | apiReturnError;

export default async function SignUpHandler(apiRequest: apiRequest) {
    try{
        console.log("apiRequest:", apiRequest)
        const response: AxiosResponse<apiReturn> = await axios.post(`${process.env.API_KEY_URL}/register`, apiRequest);
        console.log("response:", response.data);
        return {
                success: true,
                data: response.data
        };
    }catch(error){
        console.error('error:', error);
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            return {
                success: false,
                error: error.response.data as apiReturnError, 
            };
        }else{
            throw error;
        }
    }  
}
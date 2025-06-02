'use server';

import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

interface LoginRequest {
    email: string;
    password: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
    token: string;
}

interface LoginResponse {
    status: number;
    message: string;
    user?: User;
}

interface ReturnType {
    success: boolean;
    data?: LoginResponse;
}

const LoginHandler = async (formData: LoginRequest): Promise<ReturnType> => {
    console.log("formData:", formData);
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(`${process.env.API_KEY_URL}/v2/login.php`, 
        formData,
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        const token = response.data.user?.token;
        if (token) {
            // (await cookies()).set({
            //     name: 'auth_token',
            //     value: token,
            //     httpOnly: true,
            //     sameSite: 'strict',
            //     secure: process.env.NODE_ENV === 'production',
            //     path: '/',
            //     maxAge: 60 * 60 * 24 * 7
            // })
        return {
                success: true,
                data: {
                    status: response.data.status,
                    message: response.data.message,
                    user: response.data.user,
                },
            };
        } else {
        return {
            success: false,
            data: {
                status: 400,
                message: 'Login failed, no token received',
            },
        };
        }
    } catch (error: any) {
        if (error.response) {
        // Backend responded with error status like 401, 404
        return {
            success: false,
            data: {
            status: error.response.status,
            message: error.response.data.message || 'Login failed',
            },
        };
        } else {
        // Network or unexpected error
        return {
            success: false,
            data: {
            status: 500,
            message: 'Something went wrong. Please try again.',
            },
        };
        }
    }
};

export default LoginHandler;

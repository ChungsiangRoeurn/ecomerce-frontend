'use server';

import axios, { AxiosResponse } from 'axios';

interface ForgotPasswordFormData {
    email: string;
    newPassword: string;
}

interface ForgotPasswordResponse {
    message: string;
}

interface ReturnType {
    success: boolean;
    data?: ForgotPasswordResponse;
}

const ForgetPasswordHandler = async (formData: ForgotPasswordFormData): Promise<ReturnType> => {
    try {
        const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(`${process.env.API_KEY_URL}/v2/reset_password.php`,
        formData,
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        console.log("response:", response.data);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            data: {
            message: 'Unexpected error. Please try again.',
            }
        }
    }
};

export default ForgetPasswordHandler;

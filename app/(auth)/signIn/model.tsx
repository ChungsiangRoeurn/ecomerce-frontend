'use client';
import React, { useState, useEffect } from "react";
import ErrorDialog from "@/app/(auth)/signUp/errorDialog"; // create this component
import SignInHandler from "@/actions/signIn/login"; // create this action
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegFaceGrinBeam } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Forgetpassword from "./forgetpassword";

interface LoginForm {
    email: string;
    password: string;
}

const SignIn = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [nextBtnClicked, setNextBtnClicked] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState("");
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginForm>({ mode: "onChange" });

    const email = watch("email")?.trim();
    const password = watch("password")?.trim();

    useEffect(() => {
        const isValid = !!email && !!password;
        setIsFormValid(isValid);
    }, [email, password]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const submitLogin = async (data: LoginForm) => {
        setNextBtnClicked(true);
        try {
            const response = await SignInHandler(data); // backend API call
            if (response.success && response.data?.status === 200) {
                // Do whatever you want with the user data
                router.push("/"); // Redirect to home page
                setNextBtnClicked(false);
                setIsErrorDialogOpen(false);
                alert("Login successful! Welcome back!");
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            } else {
                setNextBtnClicked(false);
                setIsErrorDialogOpen(true);
                setMessageResponse(response.data?.message || "Login failed.");
            }
        } catch (error) {
            setNextBtnClicked(false);
            setIsErrorDialogOpen(true);
            setMessageResponse("Server error. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen w-[400px] flex justify-center items-center p-4 max-sm:flex-col max-sm:justify-start max-sm:w-full">
            <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl p-8 rounded-lg">
                <form 
                    onSubmit={handleSubmit(submitLogin)}
                    className={`space-y-4 text-black transition-all duration-300 ${
                        isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                    }`}
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="p-1 placeholder:text-xs text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type={isPasswordOpen ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                                className="p-1 placeholder:text-xs text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            {isPasswordOpen ? (
                                <FaEye size={12} onClick={() => setIsPasswordOpen(false)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                            ) : (
                                <FaEyeSlash size={12} onClick={() => setIsPasswordOpen(true)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                            )}
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        <Forgetpassword/>
                    </div>
                    

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-2 mt-4 ${
                                isFormValid ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 cursor-not-allowed"
                            } text-white font-semibold rounded-md`}
                        >
                            {nextBtnClicked ? "Logging in..." : "Sign In"}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signUp" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>    
                

                {/* Error Dialog */}
                {isErrorDialogOpen && (
                    <ErrorDialog onClose={() => setIsErrorDialogOpen(false)}>
                        <div className="text-center py-4 w-80 flex flex-col justify-center items-center">
                            <FaRegFaceGrinBeam size={100} className="text-gray-700" />
                            <h2 className="text-lg font-bold text-red-500 mb-2">Oops!</h2>
                            <p className="text-sm text-gray-700 px-5">{messageResponse}</p>
                            <button
                                onClick={() => setIsErrorDialogOpen(false)}
                                className="mt-4 py-1 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </ErrorDialog>
                )}
            </div>
        </div>
    );
};

export default SignIn;

'use client'
import React, { useState, useEffect } from "react";
import VerifyOTP_register from "./verifyOTP";
import SignUpHandler from "@/actions/register/signUp";
import ErrorDialog from "./errorDialog";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { FaEyeSlash , FaEye} from "react-icons/fa";

interface FormData {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
    phone: string;
}

const Model = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [registedNOverify, setRegistedNOverify] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [messageResponse, setMessageResponse] = useState<string>('');
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [nextBtnClicked, setNextBtnClicked] = useState(false);
    const [isPasswordOpen , setIsPasswordOpen] = useState(false);
    const [isPasswordOpenConfirm, setIsPasswordOpenConfirm] = useState(false);

    const { register , handleSubmit, watch, formState: {errors}} = useForm<FormData>({ mode: "onChange" });

    const name = watch("name")?.trim();
    const emailValue = watch("email")?.trim();
    const password = watch("password")?.trim(); 
    const password_confirmation = watch("password_confirmation")?.trim();  
    const phone = watch("phone")?.trim();

    useEffect(() => {
        const isAllFieldsFilled = !!(name && emailValue && password && password_confirmation);
        const isPasswordMatched = (password === password_confirmation);
        setIsFormValid(isAllFieldsFilled && isPasswordMatched);
    }, [name, emailValue, password, password_confirmation]);

    const submitInformation = async (data: FormData) => {
        setNextBtnClicked(true);
        try {
            const response = await SignUpHandler(data);
            if (response.success && response.data?.status === 201) {
                setMessageResponse(response.data.message);
                setRegistedNOverify(true); 
                setEmail(data.email);
            } else {
                setNextBtnClicked(false);
                setIsErrorDialogOpen(true);
                setIsFormValid(false);
                setMessageResponse(response.data?.message || "Something went wrong, please try again later.");
            }
        } catch (error) {
            setIsFormValid(false);
            setIsErrorDialogOpen(true);
            setMessageResponse("An error occurred. Please try again.");
        }
    }

    useEffect(() => { setIsMounted(true); }, []);

    return (
        <div className="min-h-screen w-[400px] flex justify-center items-center  p-4 max-sm:flex-col max-sm:justify-start max-sm:w-full">
            <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl p-8 rounded-lg">
                {!registedNOverify ? (
                    <form 
                        onSubmit={handleSubmit(submitInformation)}
                        className={`space-y-4 text-black transition-all duration-300   ${
                            isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                        }`}
                    >
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="p-1 placeholder:text-xs  text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="p-1 placeholder:text-xs text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    type={isPasswordOpen ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters" }
                                    })}
                                    className="p-1 placeholder:text-xs  text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                                {isPasswordOpen ? (
                                    <FaEye size={12} onClick={() => setIsPasswordOpen(false)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                                ) : (
                                    <FaEyeSlash size={12} onClick={() => setIsPasswordOpen(true)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                                )}
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    type={isPasswordOpenConfirm ? "text" : "password"}
                                    {...register("password_confirmation", {
                                        required: "Confirm password is required",
                                        validate: (val) => val === watch("password") || "Passwords do not match"
                                    })}
                                    className="p-1 placeholder:text-xs  text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm your password"
                                />
                                {isPasswordOpenConfirm ? (
                                    <FaEye size={12} onClick={() => setIsPasswordOpenConfirm(false)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                                ) : (
                                    <FaEyeSlash size={12} onClick={() => setIsPasswordOpenConfirm(true)} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                                )}
                            </div>
                            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-gray-300 text-xs font-normal">(optional)</span></label>
                            <input
                                type="tel"
                                {...register("phone", { required: "Phone number is required" })}
                                className="p-1 placeholder:text-xs  text-sm w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your phone number"
                            />
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
                                {nextBtnClicked ? "Sending..." : "Next"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <VerifyOTP_register email={email} />
                )}

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

export default Model;

'use client'
import { useEffect, useRef, useState } from 'react';
import { TbMessageDots } from "react-icons/tb";
import verifyOTP from '@/actions/register/verifyOtp';
import resendOtp from '@/actions/register/resendOtp';
import ErrorDialog from './errorDialog';
import useCountdown from '@/lib/useCountdown';


type VerifyOTPProps = {
    email: string;
}

export default function VerifyOTP_register({email}: VerifyOTPProps) {
    const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
    const [otpStatus, setOtpStatus] = useState<string | null>(null); // Store OTP status
    const [errorDialog, setIsErrorDialogOpen] = useState(false)
    const [resendOptStatus, setResendOptStatus] = useState<string | null>(null);
    const [timeExpired, setTimeExpired] = useState(false);
    const resendOTPcount = useRef(0);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false)
    const { timeLeft, formattedTime, resetTimer } = useCountdown(300);

    
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Only allow digits
        
        const newOtp = [...otpDigits];
        newOtp[index] = value;
        setOtpDigits(newOtp);
        
        // Auto-focus next input
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput && value) {
            (nextInput as HTMLInputElement).focus();
        }
    };
    const handleSubmit = async () => {
        const otp = otpDigits.join('');
        if (otp.length !== 6) {
            alert("Please enter all 6 digits");
            return;
        }
    
        const input = {
            email,
            otp
        };
        console.log("OTP input:", input);
    
        try {
            setLoadingVerify(true);
            const res = await verifyOTP(input);
            console.log("res", res?.success)
            if(res?.success ){
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                setOtpStatus("success");
                alert("Welcome to Blush Cambodia!");
                window.location.href = "/"; // Redirect to the next page or perform any other action
            }
            else{
                setLoadingVerify(false);
                setIsErrorDialogOpen(true);
                setOtpStatus("invalid or experied code");
                setOtpDigits(Array(6).fill(''));
            }
            // setOtpStatus(res); // Update OTP status
        } catch (err) {
            setIsErrorDialogOpen(true)
            console.error('server error', err);
        }
    };
    const handleResend = async() => {
        if(resendOTPcount.current >= 5){
            setResendOptStatus('Too many request. Please try again !')
            setTimeExpired(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 5000)
            return
        }
        setLoadingResend(true)
        const res = await resendOtp(email);
        console.log('res:', res)
        if(res.status == 200){
            resendOTPcount.current += 1;
            resetTimer()
            setResendOptStatus('code had been resent!');
            setLoadingResend(false);
        }else{
            setLoadingResend(false)
            setResendOptStatus(res.message)
            setOtpStatus('Invalid code !!')
        }
    }

    


    //to take off resendtOptsStatus after 10sec 
    useEffect(() => {
        let resendTimeout: NodeJS.Timeout;
        if(resendOptStatus){
            resendTimeout = setTimeout(() => {
                setResendOptStatus(null);
            }, 10000);
        }
        return () => clearTimeout(resendTimeout);
    }, [resendOptStatus]);
    

    return (
        <div className="w-full flex flex-col justify-center items-center gap-5 max-sm:h-[40vh]">
            <div className='w-full flex items-start justify-center gap-2'>
                <div className='flex flex-col items-center gap-2'>
                    <TbMessageDots className='text-yellow-300 text-2xl' size={30} />
                    <h1 className='text-2xl font-semibold text-black'>Verify OTP</h1>
                </div>
            </div>
            {!timeExpired && timeLeft > 0 &&
                    <div className="mb-2 text-right text-sm text-gray-500">
                            Time left: <span className="font-bold text-red-500">{formattedTime}</span>
                    </div>
            }

            <div className='flex flex-row justify-center items-start gap-x-2'>
                {otpDigits.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className='w-8 h-10 max-sm:w-6 max-sm:h-9 border-2 rounded border-yellow-300 text-center text-black'
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-1 w-full max-w-xs">
                <button
                    className="w-full h-9 text-white bg-yellow-400 rounded font-semibold duration-300 hover:cursor-pointer hover:scale-105 disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={loadingVerify}
                >
                    {loadingVerify ? 'Verifying...' : 'Verify'}
                </button>

                <div className="w-full flex justify-end">
                    <span
                    className="text-md text-gray-500 cursor-pointer hover:underline hover:underline-offset-1 hover:text-gray-700"
                    onClick={handleResend}
                    >
                    {loadingResend ? 'resending...' : 'resend'}
                    </span>
                </div>
            </div>
            <div>
                {errorDialog &&         
                <ErrorDialog onClose={() => setIsErrorDialogOpen(false)}>
                    <div className="text-center py-4 w-80 flex flex-col justify-center items-center">
                        <h2 className="text-lg font-bold text-red-500 mb-2">oops!</h2>
                        <p className="text-sm text-balance px-5 text-gray-700">{otpStatus}</p>
                        <button
                            onClick={() => setIsErrorDialogOpen(false)}
                            className="mt-4 py-1 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                        Close
                        </button>
                    </div>
                </ErrorDialog>
                }
                <p className='text-xs text-red-500'>{resendOptStatus}</p>
            </div>
        </div>
    );
}

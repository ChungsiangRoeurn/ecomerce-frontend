import React from "react";
import { useEffect } from "react";

type ErrorDialogProps = {
    onClose: () => void;
    children: React.ReactNode;
}
const ErrorDialog = ({onClose, children}: ErrorDialogProps) => {
        useEffect(() => {
        // Disable scrolling when the modal is open
        document.body.style.overflow = "hidden";
        return () => {
            // Restore scrolling when the modal is closed
            document.body.style.overflow = "auto";
        };
    }, []);
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-80 transition-opacity">
            <div className="bg-white  rounded-lg   max-w-full shadow-lg relative transform animate-bounce-twice">
                <button
                className="absolute top-2 right-1 text-lg text-gray-500 hover:text-black"
                onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}
export default ErrorDialog;

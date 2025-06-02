// components/QRCheckoutModal.tsx
'use client';

import { useTransition } from "react";
import { QRCodeSVG } from "qrcode.react";
import { checkPaymentStatus } from "@/actions/products/checkTransaction";

interface QRCheckoutModalProps {
    qr: string;
    md5: string;
    onClose: () => void;
}

export default function QRCheckoutModal({ qr, md5, onClose }: QRCheckoutModalProps) {
    const [isPending, startTransition] = useTransition();

    const handlePaidCheck = () => {
        startTransition(async () => {
        const result = await checkPaymentStatus(md5);
        if (result.success && result.data.status === "PAID") {
            alert("✅ Payment confirmed!");
            onClose();
        } else {
            alert("❌ Not paid yet.");
        }
        });
    };

    if (!qr) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white flex flex-col items-center p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h1 className="text-xl font-bold mb-4">Bakong KHQR</h1>
            <QRCodeSVG value={qr} size={256} />
            <div className="flex gap-4 mt-6 w-full">
            <button
                onClick={onClose}
                className="w-full py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                Close
            </button>
            <button
                onClick={handlePaidCheck}
                disabled={isPending}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? "Checking..." : "Paid check"}
            </button>
            </div>
        </div>
        </div>
    );
}

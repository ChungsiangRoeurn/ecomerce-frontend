import { useEffect, useState } from "react";
export default function useCountdonw(initialSeconds: number){
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    useEffect(() => {
        if(timeLeft === 0) return ;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev -1);
        }, 1000);
        return () =>  clearInterval(timer);
    }, [timeLeft]);

    const resetTimer = () => {
        setTimeLeft(initialSeconds);
    };

    const formatTime = (seconds: number): string => {
        const min = String(Math.floor(seconds/60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${min}:${secs}`;
    }

    return{
        timeLeft,
        formattedTime: formatTime(timeLeft),
        resetTimer
    };
}
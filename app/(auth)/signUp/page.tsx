import Model from "./model";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "sign up with our platform to continue",
};

export default function RegisterPage() {
    return (
        <div className="bg-white flex justify-center">
            <Model />
        </div>
    );
}

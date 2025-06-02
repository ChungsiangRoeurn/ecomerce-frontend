import Model from "./model";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "sign in your account to continue",
};

export default function RegisterPage() {
    return (
        <div className="bg-white flex justify-center">
            <Model />
        </div>
    );
}

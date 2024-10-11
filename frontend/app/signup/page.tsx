import SignUp from "@/components/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup | Linknbio',
};

export default function Page() {
    return (
        <>
            <SignUp />
        </>
    )
}
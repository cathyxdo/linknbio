import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login | Linknbio',
};
export default function Page() {
    return (
        <>
            <Login />
        </>
    )
}
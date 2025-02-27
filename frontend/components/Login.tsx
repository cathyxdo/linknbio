// app/SignupPage.tsx
"use client"; // Ensure this is a client component as it uses hooks

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase"; // Adjust the path to your Firebase config
import { useRouter } from "next/navigation"; // useRouter is for navigation in Next.js
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Google Sign-In provider
  const googleProvider = new GoogleAuthProvider();

  // Handle Email/Password sign up
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      router.push("/dashboard"); // Redirect to dashboard or any other protected page
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user signed in:", user);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error: any) {
      console.error("Error with Google sign in:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen md:bg-stone-50 pt-10 ">
      <Link href="/" >
        <span className="flex flex-col items-center text-2xl font-semibold whitespace-nowrap">
          Linknbio
        </span>
      </Link>
      <div className="flex flex-col bg-white shadow-none md:shadow rounded-lg items-center p-10  md:mx-auto mt-12 w-full md:w-1/2">

        <h2 className="text-xl font-bold">Log in</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignIn} className="my-4 flex flex-col w-full gap-4 items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-4 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-4 w-full"
            />
          <button
            type="submit"
            className="bg-custom-blue-500 font-semibold hover:bg-custom-blue-200 text-black py-3 px-4 rounded-lg"        >
            Log In with Email
          </button>
        </form>

        <div className="flex flex-col items-center">
          <p>Or continue with:</p>
          <button
            onClick={handleGoogleSignIn}
            className="my-4 bg-white border border-black text-black py-3 px-4 rounded-lg"

          >
            <div className="flex items-center gap-4">
              <Image
                src="/google-logo.png" // Update the path to your Google logo
                alt="google-logo"
                width={24}
                height={24}
              />
              <span>Continue with Google</span>
            </div>        </button>
        </div>
      </div>
    </div>
  );
}

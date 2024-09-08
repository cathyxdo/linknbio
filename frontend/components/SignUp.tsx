"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Redirect or do something after successful sign-up
            console.log("User created:", userCredential.user);
            router.push('/dashboard'); // Navigate to dashboard or any protected page after sign-up
        } catch (error: any) {
            // Handle Errors
            console.error('Error signing up:', error.message);
            setError(error.message);
        }       
    };
    return (
        <div>
          <h1>Sign Up</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
}
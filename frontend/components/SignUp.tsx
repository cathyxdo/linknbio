// app/SignupPage.tsx
"use client"; // Ensure this is a client component as it uses hooks

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase'; // Adjust the path to your Firebase config
import { useRouter } from 'next/navigation'; // useRouter is for navigation in Next.js

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Google Sign-In provider
  const googleProvider = new GoogleAuthProvider();

  // Handle Email/Password sign up
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      router.push('/dashboard'); // Redirect to dashboard or any other protected page
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google user signed in:', user);
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error: any) {
      console.error('Error with Google sign in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSignup} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Sign Up with Email
        </button>
      </form>

      <div>
        <p>Or continue with:</p>
        <button
          onClick={handleGoogleSignIn}
          style={{ padding: '10px 20px', cursor: 'pointer', background: '#4285F4', color: 'white' }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

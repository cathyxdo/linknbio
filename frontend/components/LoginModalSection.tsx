// components/LoginModal.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

export default function LoginModalSection() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setError(error.message);
    }
  };

  return (

    <div>
        <h1 className="text-xl font-bold ">Log in</h1>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSignIn} className="my-8 flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-4 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-4 w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Log In with Email
          </button>
        </form>

      </div>

  );
}

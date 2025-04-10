// components/LoginModal.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function LoginModalSection() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold ">Login</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSignIn} className="my-4 flex flex-col">
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
        <button
          type="submit"
          className="bg-custom-blue-600 font-semibold hover:bg-custom-blue-700 text-white tracking-wide py-3 text-sm px-4 rounded-full"
        >
          Log in with email
        </button>
      </form>
    </div>
  );
}

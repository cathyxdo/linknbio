// components/AuthModal.tsx
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CloseRounded } from "@mui/icons-material";
import SignUpModalSection from "./SignUpModalSection";
import LoginModalSection from "./LoginModalSection";

export default function AuthModal({
  isOpen,
  onClose,
  authType,
  setAuthType,
}: {
  isOpen: boolean;
  onClose: () => void;
  authType: string;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user signed in:", user);
      router.push("/dashboard");
      onClose(); // Close the modal on successful sign-in
    } catch (error: any) {
      console.error("Error with Google sign in:", error.message);
      setError(error.message);
    }
  };

  if (!isOpen) return null;
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if clicking on the background
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-md flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:bg-stone-100 flex items-center rounded-full w-10 h-10 p-2"
        >
          <CloseRounded />
        </button>
        {authType === "signup" && <SignUpModalSection />}

        {authType === "login" && <LoginModalSection />}

        <p>or</p>
        <button
          onClick={handleGoogleSignIn}
          className="my-4 bg-white border text-sm w-full border-black text-black py-3 px-4 rounded-full"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/google-logo.png" // Update the path to your Google logo
              alt="google-logo"
              width={24}
              height={24}
            />
            <span>Continue with Google</span>
          </div>
        </button>
        {authType === "signup" && (
          <div className="flex gap-2">
            <p>Already have an account?</p>
            <span
              className="hover:cursor-pointer font-bold"
              onClick={() => setAuthType("login")}
            >
              Login
            </span>
          </div>
        )}
        {authType === "login" && (
          <div className="flex gap-2">
            <p>No Account Yet?</p>
            <span
              className="hover:cursor-pointer font-bold"
              onClick={() => setAuthType("signup")}
            >
              Sign Up
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

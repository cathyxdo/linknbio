// app/page.tsx or wherever your Home component is located
"use client";
import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import AuthModal from "@/components/AuthModal"; // Import your new LoginModal component

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authType, setAuthType] = useState("");

  function handleAuthButtonClick(type: string) {
    setAuthType(type);
    setIsLoginModalOpen(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="fixed w-full">
        <nav className="bg-white border-b border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Linknbio
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              <button
                onClick={() => handleAuthButtonClick("login")}
                className="border border-black text-black bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthButtonClick("signup")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Signup
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container flex flex-col md:flex-row justify-center gap-12 items-center text-left min-h-screen p-4">
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-5xl">
            Centralize your online presence in one place using{" "}
            <span className="font-bold">Linknbio</span>
          </h1>
          <h3 className="mt-4">
            Gather all your links, social media, music, videos, and more in one
            place. Create a page that matches your style and never worry about
            changing your bio link again.
          </h3>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg mt-4"
            onClick={() => handleAuthButtonClick("signup")}
          >
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/hero-graphic.png"
            width={1178}
            height={1276}
            alt="hero-image"
            className="w-full h-auto"
          />
        </div>
      </div>
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        authType={authType}
        setAuthType={setAuthType}
      />
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white text-center py-2 border-t border-gray-200">
          <div className="text-xs flex gap-1 justify-center">
            <p>Made by Cathy Do.</p>
            <a target="_blank" href={"https://github.com/cathyxdo/linknbio"} className="text-blue-700 hover:underline">Github</a>
          </div>

      </footer>
    </main>
  );
}

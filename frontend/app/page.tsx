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
    <main className="flex min-h-screen flex-col w-full items-center">
      <header className="fixed w-full">
        <nav className="bg-white border-b border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between px-4 ">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Linknbio
              </span>
            </Link>
            <div className="flex items-center lg:order-2 gap-2">
              <button
                onClick={() => handleAuthButtonClick("login")}
                className="border border-black text-black bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded-lg "
              >
                Login
              </button>
              <button
                onClick={() => handleAuthButtonClick("signup")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full"
              >
                Signup
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className="w-full flex flex-col items-center">
        <div className="container flex flex-col md:flex-row gap-12 items-center pt-20 md:py-48 pb-10 md:px-20 px-4">
          <div className=" flex flex-col flex-1">
            <h1 className="text-5xl font-extrabold tracking-tight">
                Centralize your online presence in one place using Linknbio
            </h1>
            <h3 className="mt-6 text-xl">
            Gather all your links, social media, music, videos, and more in one
              place. Create a page that matches your style and never worry about
              changing your bio link again.            </h3>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full mt-8"
              onClick={() => handleAuthButtonClick("signup")}
            >
              Get Started
            </button>
          </div>
          <div className="flex-1">
            <Image
              src="/hero-graphic.png"
              width={1178}
              height={1276}
              alt="hero-image"
              className="w-full h-auto "
            />
          </div>
        </div>
        <div className="bg-indigo-200 py-20 md:py-40 px-4 md:px-24 w-full flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex flex-col flex-1">
            <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">
              Your page up and running in minutes, customized to your personal brand
            </h1>
            <h3 className="mt-4 font-semibold text-blue-900">
              No need to download anything. Easily add all your links and personalize the page to your style.
            </h3>
            <div>
              <button
                className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 px-8 rounded-full mt-6"
                onClick={() => handleAuthButtonClick("signup")}
              >
                Get Started
              </button>
              </div>
          </div>
          <div className="flex-1">
            <Image
              src="/hero-graphic.png"
              width={1178}
              height={1276}
              alt="hero-image"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="bg-fuchsia-200 py-20 md:py-40 px-4 md:px-24 w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col flex-1">
            <h1 className="text-5xl font-extrabold text-rose-900 tracking-tight">
            Share your Linknbio on your Instagram, Youtube, TikTok, Twitter and other platforms
            </h1>
            <h3 className="mt-4 font-semibold text-rose-900">
            Add your Linknbio URL wherever your audience is. Direct all your following to one location.

            </h3>
            <div>
              <button
                className="bg-rose-900 hover:bg-rose-950 text-white font-bold py-4 px-8 rounded-full mt-6"
                onClick={() => handleAuthButtonClick("signup")}
              >
                Get Started
              </button>
              </div>
          </div>
          <div className="flex-1">
            <Image
              src="/hero-graphic.png"
              width={1178}
              height={1276}
              alt="hero-image"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="bg-rose-100 py-20 md:py-40 px-4 md:px-24 w-full flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex flex-col flex-1">
            <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight">
              Analyze the performance of your Linknbio

            </h1>
            <h3 className="mt-4 text-indigo-600 font-semibold">
              See what's working and what's not. Track your page performance over time and keep your audience engaged.
            </h3>
            <div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full mt-6"
                onClick={() => handleAuthButtonClick("signup")}
              >
                Get Started
              </button>
              </div>
          </div>
          <div className="flex-1">
            <Image
              src="/hero-graphic.png"
              width={1178}
              height={1276}
              alt="hero-image"
              className="w-full h-auto"
            />
          </div>
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

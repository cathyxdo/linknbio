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

  const avatars = [
    { src: "https://linknbio-resources.s3.amazonaws.com/1b99eb8a-71c2-4a50-8448-0a34e2dc1a29.png", name: "Maya James", link: "/mayajames", desc: "Fashion Influencer"},
    { src: "https://linknbio-resources.s3.amazonaws.com/bcc1463c-cf4d-47f2-a384-5846268fd8e7.png", name: "The Golden Crust", link: "/thegoldencrust", desc: "Bakery" },
    { src: "https://linknbio-resources.s3.amazonaws.com/177d79f6-fcb2-401a-a1aa-5199519d1c1b.png", name: "Fur Babies Rescue", link: "/fur_babies_rescue" , desc: "Non-profit"},
    { src: "https://linknbio-resources.s3.amazonaws.com/f16d1b9d-3779-4fcd-8dac-3af39779fd64.png", name: "Pure Radiance Co", link: "/pureradianceco" , desc: "Natural Shampoo Bars"},
    { src: "https://linknbio-resources.s3.amazonaws.com/8e9379c6-3585-4ea9-a4a1-8eed465b89fa.png", name: "Logan Steele", link: "/logansteele" , desc: "Musician"},
    { src: "https://linknbio-resources.s3.amazonaws.com/173b76f7-d99f-40fa-b313-63042f4718d2.png", name: "Tessa's Table", link: "/tessastable", desc: "Food Blog" },
  ]

  function handleAuthButtonClick(type: string) {
    setAuthType(type);
    setIsLoginModalOpen(true);
  }

  return (
    <main className="flex min-h-screen flex-col w-full items-center">
      <header className="fixed w-full z-50">
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
                className=" bg-white  text-black py-2 px-6 text-sm font-semibold rounded-full"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthButtonClick("signup")}
                className="bg-custom-blue-600 hover:bg-custom-blue-700 text-white py-2 px-6 font-semibold text-sm rounded-full"
              >
                Sign up
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className="w-full flex flex-col items-center">
        <div className="container flex flex-col md:flex-row gap-12 items-center pt-20 md:py-48 pb-10 px-4">
          <div className=" flex flex-col flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Centralize your online presence in one place using Linknbio
            </h1>
            <h3 className="mt-6 text-m md:text-xl">
            Gather all your links, social media, music, videos, and more in one
              place. Create a page that matches your style and never worry about
              changing your bio link again.            </h3>
            <button
              className="bg-custom-blue-600 tracking-wide hover:bg-custom-blue-700 text-white font-semibold py-3 px-8  w-max md:w-full rounded-full mt-8"
              onClick={() => handleAuthButtonClick("signup")}
            >
              Get Started
            </button>
          </div>
          <div className="flex-1">
            <Image
              src="/LandingPage4.png"
              width={2434}
              height={1333}
              alt="hero-image"
              className="w-full h-auto "
            />
          </div>
        </div>
        <div className="py-32 bg-stone-800 text-center w-full text-white flex flex-col items-center gap-20">
          <h2 className="text-3xl font-bold italic">Check out these <span className="border-b-4 border-custom-blue-600">Linknbios</span> for inspiration</h2>
            
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-16 overflow-x-auto flex-nowrap px-8 pb-10 scrollbar-custom scroll-smooth">
            {avatars.map((avatar, index) => (
                <a
                  target="_blank"
                  key={index}
                  href={avatar.link}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center w-48 snap-start"
                >
                  <div className="w-48 h-48 p-4 hover:scale-105 transition-transform duration-300">
                    <Image
                      src={avatar.src}
                      alt={avatar.name}
                      width={192}
                      height={192}
                      className="rounded-full"
                    />
                  </div>
                  <span className="font-bold tracking-wider text-center mt-4">{avatar.name}</span>
                  <span className="text-sm mt-2">{avatar.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-stone-100 py-20 md:py-40 px-4 lg:px-24 w-full flex flex-col items-center text-center  gap-12">
          <div className="flex flex-col flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              Your page up and running in minutes, customized to your personal brand
            </h1>
            <h3 className="text-m md:text-xl mt-4 font-semibold text-black">
              No need to download anything. Easily add all your links and personalize the page to your style.
            </h3>
            <div>
            <button
              className="bg-custom-blue-600 tracking-wide hover:bg-custom-blue-700 text-white font-semibold py-3 px-8  w-max md:w-fit rounded-full mt-8"
              onClick={() => handleAuthButtonClick("signup")}
            >
              Get Started
            </button>
              </div>
          </div>
          <div className="flex-1">
             <video autoPlay loop muted playsInline className="border-2 border-stone-500 rounded  max-w-3xl w-full">
              <source src="/AppearanceRecording.mp4" type="video/mp4" />
             </video>
          </div>
        </div>
        <div className=" bg-white py-24 px-4 md:px-12 w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 md:p-8 rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Share your Linknbio on your Instagram, Youtube, TikTok, Twitter and other platforms
            </h1>
            <h3 className="text-m md:text-xl mt-4 font-semibold text-black">
            Add your Linknbio URL wherever your audience is. Direct all your following to one location.

            </h3>
            <div>
              <button
              className="bg-custom-blue-600 tracking-wide hover:bg-custom-blue-700 text-white font-semibold py-3 px-8  w-max md:w-fit rounded-full mt-8"
              onClick={() => handleAuthButtonClick("signup")}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/SocialsLanding4.svg"
              width={938}
              height={599}
              alt="hero-image"
              className="w-full max-w-[100%] h-auto object-contain"
            />
          </div>
        </div>
{/*         <div className="bg-custom-red-50 text-custom-red-600 text-3xl font-semibold text-center flex w-full justify-center py-36 px-24">
          "Ever since using Linknbio we've seen a 45% increase in our website traffic"
        </div> */}
        <div className=" bg-stone-100 py-24 px-4 md:px-12 w-full flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex flex-col flex-1 md:p-8 rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              Analyze the performance of your Linknbio

            </h1>
            <h3 className="text-m md:text-xl mt-4 text-black font-semibold">
              See what&apos;s working and what&apos;s not. Track your page performance over time and keep your audience engaged.
            </h3>
            <div>
              <button
              className="bg-custom-blue-600 tracking-wide hover:bg-custom-blue-700 text-white font-semibold py-3 px-8  w-max md:w-fit rounded-full mt-8"
              onClick={() => handleAuthButtonClick("signup")}
              >
                Get Started
              </button>
              </div>
          </div>
          <div className="flex-1 ">
            <Image
              src="/AnalyticsLanding3.svg"
              width={572}
              height={497}
              alt="hero-image"
              className="w-full h-auto max-w-[90%] object-contain"
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

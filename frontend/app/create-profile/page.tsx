"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase auth

export default function Page() {
  const [listUsername, setListUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");   
  const router = useRouter();

  function handleListUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const invalidChars = /[^a-zA-Z0-9_]/g;
    const value = e.target.value;
    if (value !== value.trim()) {
      setError("Title cannot contain spaces.");
    } else if (/\s/.test(value)) {
      setError("Title cannot contain spaces.");
    } else if (invalidChars.test(value)) {
      setError(
        "Title contains invalid characters (only letters, numbers, and underscores are allowed)."
      );
    } else {
      setError("");
    }

    setListUsername(value);
  }
  async function checkListName(username: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/check-username/?list_username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add your auth token here if needed
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsAvailable(!data.exists);
      } else {
        console.error("Error checking list name:", response.statusText);
      }
    } catch (err) {
      console.error("Error checking list name:", err);
    }
  }
  useEffect(() => {
    if (listUsername) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        checkListName(listUsername);
        setLoading(false);
      }, 500); // Debounce to avoid too many requests
      return () => clearTimeout(timeoutId);
    }
  }, [listUsername]);

  // The function to submit the list to the Django REST API
  async function handleSubmit() {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach Firebase token for authentication
          },
          body: JSON.stringify({
            username: listUsername, // Send the list name as payload
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("List created successfully:", data);

        // Redirect to the newly created list's page (e.g., /share/newlist)
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error creating list:", errorData);
        setError("Failed to create list. Please try again.");
      }
    } catch (err) {
      console.error("Error during list creation:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  }
  return (
    <div className="min-h-screen bg-stone-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <Link key="Home" href="/" className="">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Linknbio
              </span>
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Create new Linknbio
            </h1>
            <div className="flex mt-8 items-center gap-2">
              <p>linknbio.com/share/</p>
              <input
                className="w-full px-4 py-4 rounded font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                type="text"
                name="listname"
                value={listUsername}
                onChange={handleListUsernameChange}
                placeholder="your_url"
              />
            </div>
            {loading && <p className="font-semibold">Checking username...</p>}
            {!isAvailable && (
              <p  className="text-red-600">Username is already taken!</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              className="mt-8 font-bold bg-custom-blue-500 hover:bg-custom-blue-200 py-3 px-8 rounded-lg flex items-center justify-center disabled:cursor-not-allowed "
              type="submit"
              onClick={handleSubmit}
              disabled={!isAvailable || loading}
            >
              <span>Continue</span>
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white text-center md:flex hidden ">
          <div className="m-12 xl:m-16 w-full flex items-center">
            <Image
              src="/LandingPage4.png"
              width={1178}
              height={1276}
              alt="hero-image"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

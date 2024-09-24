'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase auth

export default function Page() {

    const [listName, setListName] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    function handleListNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const invalidChars = /[^a-zA-Z0-9_]/g;
        const value = e.target.value;
        if (value !== value.trim()) {   
            setError('Title cannot contain spaces.');
        } else if (/\s/.test(value)) {
            setError('Title cannot contain spaces.');
        } else if (invalidChars.test(value)) {
            setError('Title contains invalid characters (only letters, numbers, and underscores are allowed).');
        } else {
            setError('');
        }
      
          setListName(value);
    }
    async function checkListName(name: string) {
        try {
            const user = auth.currentUser; // Get current user
            if (!user) {
                throw new Error("User not authenticated");
            }

            const token = await getIdToken(user); // Get Firebase auth token
            const response = await fetch(`http://127.0.0.1:8000/api/check-list-name/?list_name=${name}`, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${token}`,  // Add your auth token here if needed
                },
            });
            if (response.ok) {
                const data = await response.json();
                setIsAvailable(!data.exists);
              } else {
                console.error('Error checking list name:', response.statusText);
              }
        } catch (err) {
            console.error('Error checking list name:', err);
        }
    }
    useEffect(() => {
        if (listName) {
          setLoading(true);
          const timeoutId = setTimeout(() => {
            checkListName(listName);
            setLoading(false);
          }, 500); // Debounce to avoid too many requests
          return () => clearTimeout(timeoutId);
        }
      }, [listName]);
    

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <Link
                        key='Home'
                        href='/'
                        className=""
                        >
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">Linknbio</span>
                        </Link>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Create new Link N Bio
                        </h1>
                        <h2>Choose a Link n bio URL. You can always change it later.</h2>
                        <div className="flex justify-center">
                            <p>linknbio.com/</p>
                            <input
                                className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                                type="text" 
                                name="listname" 
                                value={listName} 
                                onChange={handleListNameChange}
                                placeholder="your_url" />
                        </div>
                        {loading && <p>Checking name...</p>}
                        {!isAvailable && <p style={{ color: 'red' }}>Name is already taken!</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            type="submit"
                            disabled={!isAvailable || loading} >
                            <span className="ml-3">
                                Continue
                            </span>
                        </button>

                    </div>

                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                        <Image
                            src='/hero-graphic.png'
                            width={1178}
                            height={1276}
                            alt='hero-image'
                        >
                        </Image>
                    </div>
                </div>
            </div>
        </div>
    )
}
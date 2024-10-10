"use client";

import { useState, useEffect } from "react";
import { ListProfile } from "@/shared/interfaces";
import Dashboard from "@/components/Dashboard";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase auth
import { useRouter} from "next/navigation";
import { CircularProgress } from '@mui/material';

export default function Page() {
  const [list, setList] = useState<ListProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchList = async (user: User) => {
      try {
        const token = await getIdToken(user);
        console.log("Token: ", token);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lists/`, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include Firebase token here
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const lists: ListProfile[] = await res.json();
        if (lists.length > 0) {
          setList(lists[0]);
        } else {
          router.push("/create-profile");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch the list
        fetchList(user);
      } else {
        // User is not signed in
        setError("User not authenticated");
        setLoading(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <CircularProgress size="3em"/>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return list ? <Dashboard data={list} /> : <div>No data available</div>;
}

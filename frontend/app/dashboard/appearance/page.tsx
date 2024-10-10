"use client";

import { useState, useEffect } from "react";
import { ListProfile } from "@/shared/interfaces";
import Appearance from "@/components/Appearance";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";
import { useRouter} from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function Page() {
  const [list, setList] = useState<ListProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchList = async (user: User) => {
      try {
        const token = await getIdToken(user); // Get Firebase token
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

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchList(user);
      } else {
        setError("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen ">
        <CircularProgress size="3em"/>
      </div>
    );
  };
  if (error) return <div>Error: {error}</div>;

  return list ? <Appearance data={list} /> : <div>No data available</div>;
}

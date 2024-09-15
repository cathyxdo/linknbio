"use client";

import { useState, useEffect } from "react";
import { ListProfile } from "@/shared/interfaces";
import Dashboard from "@/components/Dashboard";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase auth

export default function Page() {
  const [list, setList] = useState<ListProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchList = async (user: User) => {
      try {
        const token = await getIdToken(user);
        console.log("Token: ", token);
        const res = await fetch("http://127.0.0.1:8000/api/lists/1", {
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

        const list: ListProfile = await res.json();
        setList(list);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return list ? <Dashboard data={list} /> : <div>No data available</div>;
}

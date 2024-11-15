"use client";
import { useState, useEffect } from "react";
import { AnalyticsData, PageView, LinkClick, SocialMediaClick } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";

export default function Page() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchList = async (user: User) => {
          try {
            const token = await getIdToken(user); // Get Firebase token
            console.log("Token: ", token);
    
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/`,
              {
                method: "GET",
                cache: "no-store",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Include Firebase token here
                },
              }
            );
    
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }
            const data: AnalyticsData = await res.json();
            setAnalyticsData(data);
            console.log(data);
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="md:mt-0 mt-8 md:px-8 md:py-8 ">
            <div className="py-10 min-h-screen ">
                <div className="bg-white">Analytics Page</div>
            </div>
        </div>
    )
}

"use client";
import { useState, useEffect, useMemo } from "react";
import { AnalyticsData, PageView, LinkClick, SocialMediaClick } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import GraphPageViews from "@/components/GraphPageViews";
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
      // Memoize the page_views data to ensure it's stable between renders
      const memoizedPageViews = useMemo(() => {
        return analyticsData ? analyticsData.page_views : [];
      }, [analyticsData]); // Recompute only if analyticsData changes

      if (loading) {
        return (
          <div className="flex items-center justify-center h-screen w-screen ">
            <CircularProgress size="3em" />
          </div>
        );
      }
      if (error) {
        return (
          <div className="flex flex-col gap-6 items-center justify-center h-screen w-screen">
            <div>Error: {error}</div>
            <Link key="Home" href="/" className="">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Go Home
              </button>
            </Link>
          </div>
        );
      }
    return (
        <div className="md:mt-0 mt-8 md:px-8 md:py-8  ">
            <div className="p-10 min-h-screen bg-white rounded-xl">
                <div className="bg-white flex justify-center">Page Views per Day</div>
                {analyticsData && <GraphPageViews data={analyticsData.page_views} />
                }

            </div>
        </div>
    )
}

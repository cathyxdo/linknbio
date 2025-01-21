"use client";
import { useState, useEffect, useMemo } from "react";
import { AnalyticsData, PageView, LinkClick, SocialMediaClick } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import GraphPageViews from "@/components/GraphPageViews";
import TotalCounts from "@/components/TotalCounts";
import GraphContent from "@/components/GraphContent";
export default function Page() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // Calculate the date range for the last 30 days
    const getDateRange = () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 30); // Subtract 30 days

      const formatDate = (date: Date) => date.toLocaleDateString(); // Format to MM/DD/YYYY or any format you prefer

      return `${formatDate(startDate)} - ${formatDate(today)}`;
    };
    useEffect(() => {
        const fetchList = async (user: User) => {
          try {
            const token = await getIdToken(user); // Get Firebase token
            console.log("Token: ", token);
    
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/analytics2/`,
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


    // Calculate total page views
    const totalPageViews = useMemo(() => {
      return analyticsData?.page_views.reduce((sum, view) => sum + view.count, 0) || 0;
    }, [analyticsData]);

    // Calculate total link clicks
    const totalLinkClicks = useMemo(() => {
      return (
        analyticsData?.links.reduce((sum, link) => {
          return sum + link.clicks.reduce((clickSum, click) => clickSum + click.count, 0);
        }, 0) || 0
      );
    }, [analyticsData]);

    // Calculate total social media clicks
    const totalSocialMediaClicks = useMemo(() => {
      return (
        analyticsData?.social_media.reduce((sum, profile) => {
          return sum + profile.clicks.reduce((clickSum, click) => clickSum + click.count, 0);
        }, 0) || 0
      );
    }, [analyticsData]);
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
        <div className="pt-24 py-10 md:px-8 min-h-screen px-4 flex flex-col gap-6">
        {/* Date Range Heading */}
          <div className="flex items-center justify-end">
            <h2>Last 30 days: {getDateRange()}</h2>
          </div>
          {analyticsData && <TotalCounts pageViews={totalPageViews} linkClicks={totalLinkClicks} socialMediaClicks={totalSocialMediaClicks}/>
          }
          {analyticsData && <GraphPageViews data={analyticsData.page_views} />
          }
          {analyticsData && <GraphContent linkClicks={analyticsData.links} socialMediaClicks={analyticsData.social_media} /> }
        </div>
    )
}

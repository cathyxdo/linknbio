import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/utils/AuthContext";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Linknbio: Share your links in one place",
  description: "Create a custom centralized site for your entire online presence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

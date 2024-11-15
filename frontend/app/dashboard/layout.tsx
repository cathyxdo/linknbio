"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { signOut } from "firebase/auth"; // Import signOut from Firebase Auth
import { useRouter } from "next/navigation"; // Import Next.js router for redirection
import { auth } from "@/utils/firebase"; // Adjust the path to your Firebase config
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Use usePathname to get the current path
  const router = useRouter(); // Initialize Next.js router
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth); // Trigger Firebase signOut
      router.push("/"); // Redirect the user to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className="bg-stone-100">
      <nav className="flex justify-center sticky top-0 z-50 ">
        <div
          className="block fixed md:hidden p-4 cursor-pointer bg-white w-full border-b"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <div className="">
              <CloseIcon className="" />
              <ul className="mt-4 flex flex-col gap-4">
                <li>
                  <Link key="content" href="/dashboard" className="">
                    <div
                      className={
                        pathname === "/dashboard"
                          ? "text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                          : "font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                      }
                    >
                      <ViewDayOutlinedIcon />
                      <p>Content</p>
                    </div>{" "}
                    {/* Apply blue color if path matches */}
                  </Link>
                </li>
                <li>
                  <Link key="appearance" href="/dashboard/appearance">
                    <div
                      className={
                        pathname === "/dashboard/appearance"
                          ? "text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                          : "font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                      }
                    >
                      <AutoFixHighOutlinedIcon />
                      <p>Appearance</p> {/* Apply blue color if path matches */}
                    </div>
                  </Link>
                </li>
                <li className="">
                  <div
                    onClick={handleLogout}
                    className="font-semibold text-slate-500 text-sm hover:cursor-pointer hover:underline hover:text-black rounded-xl p-2 "
                  >
                    <p>Sign out</p>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <MenuIcon className="ml-auto"/>
          )}
        </div>

        {/* Full Navbar for Desktop */}
        <ul
          className={`md:flex hidden lg:gap-6 w-full px-10 py-3 mt-4 mx-4 gap-6 bg-white rounded-full shadow justify-center`}
        >
          <li className="">
            <Link key="content" href="/dashboard" className="">
              <div
                className={
                  pathname === "/dashboard"
                    ? "text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                    : "font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                }
              >
                <ViewDayOutlinedIcon />
                <p>Content</p>
              </div>{" "}
              {/* Apply blue color if path matches */}
            </Link>
          </li>
          <li>
            <Link key="appearance" href="/dashboard/appearance">
              <div
                className={
                  pathname === "/dashboard/appearance"
                    ? "text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                    : "font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center"
                }
              >
                <AutoFixHighOutlinedIcon />
                <p>Appearance</p> {/* Apply blue color if path matches */}
              </div>
            </Link>
          </li>
          <li>
            <Link key="analytics" href="/dashboard/analytics">

              <div className= {pathname === '/dashboard/analytics' ? 'text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center' : 'font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center'}>
                <LeaderboardOutlinedIcon />
                <p>Analytics</p>
              </div>
            </Link>
          </li> 
          <li className="ml-auto">
            <div
              onClick={handleLogout}
              className="font-semibold text-slate-500 text-sm hover:cursor-pointer hover:underline hover:text-black rounded-xl p-2 "
            >
              <p>Sign out</p>
            </div>
          </li>
        </ul>
      </nav>

      {children}
    </section>
  );
}

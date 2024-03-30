'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname(); // Use usePathname to get the current path

  return (
    <section className="bg-stone-100" >
      <nav className="flex justify-center sticky top-0 z-50" >            
          <ul className="px-10 py-3 mt-4 mx-4 flex gap-6 w-full bg-white rounded-full shadow">
              <li className="">
                <Link 
                  key='content'
                  href='/dashboard'
                  className=""
                >
                  <div className={pathname === '/dashboard' ? 'text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center' : 'font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center'}>
                    <ViewDayOutlinedIcon />
                    <p>Content</p>
                  </div> {/* Apply blue color if path matches */}
                
                </Link>
              </li>
              <li>
                <Link 
                  key='appearance'
                  href='/dashboard/appearance'
                >
                  <div className= {pathname === '/dashboard/appearance' ? 'text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center' : 'font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center'}>
                    <AutoFixHighOutlinedIcon />
                    <p>Appearance</p> {/* Apply blue color if path matches */}
                  </div>
                </Link>
              </li>
              <li>
                  <div className= {pathname === '/dashboard/analytics' ? 'text-black font-semibold text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center' : 'font-semibold text-slate-500 text-sm hover:bg-stone-100 rounded-xl p-2 flex gap-2 items-center'}>
                    <LeaderboardOutlinedIcon />

                    <p>Analytics</p>
                  </div>
              </li>
          </ul>
      </nav>

      {children}
    </section>
  )
}

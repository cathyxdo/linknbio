import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    return (
        <nav className="bg-white fixed w-full z-50 top-0 start-0 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    key='Home'
                    href='/'
                    className='flex items-center space-x-3 rtl:space-x-reverse'
                >
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Linknbio</span>
                </Link>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link 
                                key='Login'
                                href='/login'
                            >
                                <a className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Login
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                key='Signup'
                                href='/signup'
                            >
                                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Sign Up
                                </a>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
'use client';

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface FormData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export default function SignUpForm() {
    const[formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/registration/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(formData),
            });
        
            if (response.ok) {
            // Handle successful registration, e.g., redirect or show a success message
            console.log('User successfully registered!');
            } else {
            // Handle errors, e.g., display error messages to the user
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('error during registration', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <Link
                        key='Home'
                        href='/'
                        className=""
                        >
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">Linknbio</span>
                        </Link>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign Up
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-white text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign Up with Google
                                    </span>
                                </button>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <form onSubmit={handleFormSubmit}>
                                    <label>Username</label>
                                    <input
                                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                                        type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" />
                                    <label className="">Email</label>
                                    <input
                                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                                        type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                                    <label className="">Password</label>
                                    <input
                                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                                        type="password" name="password1" value={formData.password1} onChange={handleInputChange} placeholder="Password" />
                                    <label className="">Re-type Password</label>
                                    <input
                                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password" name="password2" value={formData.password2}  onChange={handleInputChange} placeholder="Re-type Password" />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit">
                                        <span className="ml-3">
                                            Sign Up
                                        </span>
                                    </button>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Linknbio&apos;s 
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600">Already have an Account? </p>
                                <Link 
                                key='Login'
                                href='/login'
                                className=""
                                >
                                    <span className="">Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                        <Image
                            src='/hero-graphic.png'
                            width={1178}
                            height={1276}
                            alt='hero-image'
                        >
                        </Image>
                    </div>
                </div>
            </div>
        </div>
    );
}
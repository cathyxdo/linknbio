"use client"
import { useState } from "react";
import SocialMediaForm from "./SocialMediaForm";
interface SocialMediaProps {
    listid: number
}
export default function AddSocialMediaForm({ listid } : SocialMediaProps) {
    const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);

    return (
        <div className="p-4">
            <button onClick={() => setShowSocialMediaForm(true)}className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-400 dark:hover:bg-blue-600">Add Socials</button>

            {showSocialMediaForm && 
                <SocialMediaForm listid={listid}/>
            }  
        </div>
    )
}
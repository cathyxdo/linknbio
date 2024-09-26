import { FormEvent, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/Add';

import { SocialMediaProfile } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth"; // Import Firebase auth

interface SocialMediaProps {
    id: number,
    addNewProfile: (newProfile: SocialMediaProfile) => void;
}

export default function AddSocialMediaForm2({ id, addNewProfile } : SocialMediaProps) {
    const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);

    const emptySocialMediaForm = {
        type: "instagram",
        link: "",
        list: id   
    }
    const [socialMediaForm,  setSocialMediaForm] = useState(emptySocialMediaForm);

    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setSocialMediaForm({
            ...socialMediaForm,
            [event.target.name]:  event.target.value
        })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const user = auth.currentUser; // Get current user
            if (!user) {
                throw new Error("User not authenticated");
            }

            const token = await getIdToken(user); // Get Firebase auth token
            const response = await fetch("http://127.0.0.1:8000/api/social-media-profiles/", {
                method: 'POST', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Add your auth token here if needed
                },
                body: JSON.stringify(socialMediaForm)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Error: ${response.status}');
            } else {
                console.log('Social Media added successfully');
                
                const newSocialMedia : SocialMediaProfile = await response.json();
                addNewProfile(newSocialMedia);
                setSocialMediaForm(emptySocialMediaForm);
            }

        } catch (error) {
            console.error('Failed to add social media: ', error);
        }
    }

    return (
        <div className="p-4">
            {!showSocialMediaForm ?
                (
                    <button onClick={() => setShowSocialMediaForm(true)}className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center focus:shadow-outline focus:outline-none">
                        <AddIcon />
                        <p>Add Socials</p>
                    </button>
                )
               : (
                    <div className="p-6 mb-4 space-y-6 bg-white rounded-xl shadow-xl ">
                        <div className="relative">
                            <button onClick={() => setShowSocialMediaForm(false)} className="absolute top-0 right-0 hover:bg-stone-100  rounded-full w-10 h-10">
                                <CloseRoundedIcon className=""/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">

                        
                            <label>Social Media App</label>
                            <select name="type" value={socialMediaForm.type} onChange={(e) => setSocialMediaForm({...socialMediaForm, type: e.target.value})} className="w-1/4 py-2 px-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="twitter">X / Twitter</option>
                                <option value="youtube">Youtube</option>
    
                            </select>
                            <label>Link</label>
                            <input name="link" value={socialMediaForm.link} onChange={handleChange} className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                            <div className="flex justify-end">
                                <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/4 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                            </div>
                        </form>
                    </div> 
                )
            }
        </div>
    )
}
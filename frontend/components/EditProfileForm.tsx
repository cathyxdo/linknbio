"use client"
import { useState } from "react";

interface ProfileFormProps {
    id: number;
    user: number;
    name: string;
    bio: string;
    photo: string;
}

export default function EditProfileForm({ id, user, name, bio, photo } : ProfileFormProps) {
    const [formData, setFormData] = useState( {
        name : name ? name : "",
        bio: bio ? bio : "",
    });

    function handleChange(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({
            ...formData,
            [event.target.name]:  event.target.value
        })
    }

    async function handleSubmit(event : React.FormEvent) {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/lists/" + id + "/", {
                method: 'PATCH', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Profile updated successfully');
            }

        } catch (error) {
            console.error('Failed to update: ', error);
        }
    }

    return (
            <div className="p-4">
                <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                    <h3 className="text-lg">Edit Profile</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                        <div className="flex ">
                            <div className="basis-3/4">
                                <label>Url</label>
                                <div className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                                    <p className="inline  mr-1">
                                        <label className="font-bold">linknbio.com/share/{id}</label>
                                    </p>
                                    <p className="inline">
                                        <input className="bg-transparent focus:outline-none"></input>
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm">Upload Profile Photo</button>
                        </div>
                        
                        <label>Name</label>
                        <input value={formData.name} onChange={handleChange} name="name" className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>

                        <label>Bio</label>
                        <textarea value={formData.bio} onChange={handleChange} name="bio" className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white resize-none"></textarea>
                        <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Edit</button>
                    </form>
                </div>
            </div>
    )
}
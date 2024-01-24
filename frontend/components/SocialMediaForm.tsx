import { revalidatePath } from "next/cache";
import { FormEvent, useState } from "react";
interface SCFormProps {
    listid: number
}
export default function SocialMediaForm({listid} : SCFormProps ) {
    const [socialMediaForm,  setSocialMediaForm] = useState({
        type: "instagram",
        link: "",
        list: listid
    })
    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setSocialMediaForm({
            ...socialMediaForm,
            [event.target.name]:  event.target.value
        })
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/social-media-profiles/", {
                method: 'POST', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(socialMediaForm)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Social Media added successfully');
                revalidatePath('/dashboard');
            }

        } catch (error) {
            console.error('Failed to add social media: ', error);
        }
    }
    const addSocialMedia = async (formData: FormData) => {
        const rawFormData = {
            type: formData.get('socialMediaType'),
            link: formData.get('link'),
            list: listid,
        }

        const res = await fetch('http://127.0.0.1:8000/api/social-media-profiles/', {
            method: "POST",
            body: JSON.stringify(rawFormData),
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: "include"
        })
        const data = await res.json();
        console.log(data);
        revalidatePath('/dashboard');
    };


    return (
        <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label>Social Media App</label>
                        <select name="type" value={socialMediaForm.type} onChange={(e) => setSocialMediaForm({...socialMediaForm, type: e.target.value})} className="w-1/4 py-2 px-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">X / Twitter</option>
                            <option value="youtube">Youtube</option>

                        </select>
                        <label>Link</label>
                        <input name="link" value={socialMediaForm.link} onChange={handleChange} className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                        <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                    </form>
                </div>
    )
}
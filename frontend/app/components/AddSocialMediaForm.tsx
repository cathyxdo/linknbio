import { revalidatePath } from "next/cache";
interface SocialMediaProps {
    listid: number
}
export default function AddSocialMediaForm({ listid } : SocialMediaProps) {
    const addSocialMedia = async (formData: FormData) => {
        "use server";

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
        });
        const data = await res.json();
        console.log(data);
        revalidatePath('/dashboard');
    };

    return (
        <div className="p-4">
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-400 dark:hover:bg-blue-600 dark:focus:ring-purple-900">Add Socials</button>

            <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                
                <form action={addSocialMedia} className="flex flex-col gap-2">
                    <label>Social Media App</label>
                    <select name="socialMediaType" className="w-1/4 py-2 px-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">X / Twitter</option>
                        <option value="youtube">Youtube</option>

                    </select>
                    <label>Link</label>
                    <input name="link" className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                </form>
            </div>
        </div>
    )
}
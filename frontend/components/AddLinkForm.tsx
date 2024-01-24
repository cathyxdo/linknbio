import { revalidatePath } from "next/cache";
interface LinkProps {
    listid: number
}

export default function AddLinkForm({ listid }: LinkProps) {
    const addLink = async (formData: FormData) => {
        "use server";

        const rawFormData = {
            title: formData.get('title'),
            link: formData.get('link'),
            list: listid,
        }
        const res = await fetch('http://127.0.0.1:8000/api/links/', {
            method: "POST",
            body: JSON.stringify(rawFormData),
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        revalidatePath('/dashboard');
    }
    return (
        <div className="p-4">
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add Link</button>
            <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                <form action={addLink} className="flex flex-col gap-2">
                    <label>Title</label>
                    <input name="title" className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                    <label>URL</label>
                    <input name="link" className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                </form>
            </div>
        </div>
    )
}
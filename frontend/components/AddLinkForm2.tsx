import { FormEvent, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "@/shared/interfaces";

interface LinkProps {
    id: number,
    addNewLink: (newLink: Link) => void;
}

export default function AddLinkForm2({ id, addNewLink}: LinkProps) {
    const [showLinkForm, setShowLinkForm] = useState(false);
    const emptyLinkForm = {
        link: "",
        title: "",
        list: id
    }
    const [linkForm, setLinkForm] = useState(emptyLinkForm);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLinkForm({
            ...linkForm,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/links/", {
                method: 'POST', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(linkForm)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Error: ${response.status}');
            } else {
                console.log('Link added successfully');
                
                const newLink : Link = await response.json();
                addNewLink(newLink);
                setLinkForm(emptyLinkForm);
            }

        } catch (error) {
            console.error('Failed to add link: ', error);
        }
    }
    
    
    return (
        <div className="p-4">
            {!showLinkForm ? 
                (
                    <button onClick={() => setShowLinkForm(true)} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center focus:shadow-outline focus:outline-none">
                        <AddIcon />
                        <p>Add Link</p>
                    </button>
                )
                : (
                    <div className="p-6 mb-4 space-y-6 bg-white rounded-xl shadow-xl ">
                        <div className="relative">
                            <button onClick={() => setShowLinkForm(false)} className="absolute top-0 right-0 hover:bg-stone-100  rounded-full w-10 h-10">
                                <CloseRoundedIcon className=""/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <label>Title</label>
                            <input name="title" value={linkForm.title} onChange={handleChange} className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                            <label>URL</label>
                            <input name="link"value={linkForm.link} onChange={handleChange} className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                            <div className="flex justify-end">
                                <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/4 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { SocialMediaProfile } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth"; // Import Firebase auth

interface SocialMediaProps {
    id: number,
    type: string,
    link: string,
    deleteSocialMedia: (id: number) => void;
    updateSocialMedia: (profile: SocialMediaProfile) => void;

}
export default function SocialMedia({id, type: initialType, link: initialLink, deleteSocialMedia, updateSocialMedia} : SocialMediaProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMenu, setDeleteMenu] = useState<boolean>(false);
    const [type, setType] = useState<string>(initialType);
    const [link, setLink] = useState<string>(initialLink);

    const toggleEditMode = (): void => {
        setEditMode(!editMode);
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setType(e.target.value);
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLink(e.target.value);
    };

    async function handleBlur() {
        try {
            const user = auth.currentUser; // Get current user
            if (!user) {
                throw new Error("User not authenticated");
            }

            const token = await getIdToken(user); // Get Firebase auth token
            const data = { 
                id: id, 
                type: type,
                link: link,
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social-media-profiles/` + id + "/", {
                method: 'PATCH', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Add your auth token here if needed
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Social Media updated successfully');
                const updatedSocialMedia : SocialMediaProfile = await response.json();
                updateSocialMedia(updatedSocialMedia);
                setEditMode(false);
            }
        } catch (error) {
            console.error('error during login', error);
        }
    };    

    async function handleDelete() {
        try {
            const user = auth.currentUser; // Get current user
            if (!user) {
                throw new Error("User not authenticated");
            }

            const token = await getIdToken(user); // Get Firebase auth token
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social-media-profiles/` + id + "/", {
                method: 'DELETE', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Add your auth token here if needed
                },
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Social Media deleted successfully');
                deleteSocialMedia(id);                
            }
        } catch (error) {
            console.error('error during login', error);
        }
    }
    return (
        <div className="shadow bg-white rounded-xl px-6 py-8 mb-4 relative">
            <button onClick={toggleEditMode} className="absolute top-2 right-2 hover:bg-stone-100 rounded-lg p-1">
                <EditOutlinedIcon className="w-5 h-5 text-stone-500 "/> {/* Replace with your actual edit icon */}
            </button>

            <div className="">

            {editMode ? (
                <>
                    <select value={type} onChange={handleTypeChange} onBlur={handleBlur} className="border p-2 rounded-lg w-200 block mb-4">
                        <option value="instagram">instagram</option>
                        <option value="facebook">facebook</option>
                        <option value="twitter">x/twitter</option>
                        <option value="youtube">youtube</option>
                    </select>
                    <input value={link} onChange={handleLinkChange} onBlur={handleBlur} className="border p-2 rounded-lg block w-full mb-4"/>
                </>
            ) : (
                <>
                    <h3 className="p-1 font-semibold">{type}</h3>
                    <p className="p-1">{link}</p>

                </>
            )}

            </div>
            {!deleteMenu ?  (
                    <button onClick={() => setDeleteMenu(true)}className="absolute bottom-2 right-2 hover:bg-stone-100 rounded-lg p-1">
                        <DeleteOutlinedIcon className="w-5 h-5 text-stone-500 "/>
                    </button>
                ) : (
                    <div className="flex flex-col gap-4 mt-8">
                        <h3>Delete this social media profile? You will not be able to undo this action.</h3>
                        <div className="flex">
                            <button onClick={handleDelete} className="rounded-full bg-red-200 hover:bg-red-400 font-medium px-5 py-2.5 text-center mr-2">Delete</button>
                            <button onClick={() => setDeleteMenu(false)} className="rounded-full border font-medium px-5 py-2.5 text-center hover:bg-gray-100">Cancel</button>
                        </div>
                        
                    </div>
                )}
                
            
        </div>
    )
}
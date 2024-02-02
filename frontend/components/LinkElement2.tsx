import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from "@/shared/interfaces";

interface LinkProps {
    id: number,
    title: string,
    link: string,
    deleteLink: (id: number) => void;
    updateLink: (link: Link) => void;

}
export default function LinkElement2({id, title: initialTitle, link: initialLink, deleteLink, updateLink} : LinkProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMenu, setDeleteMenu] = useState<boolean>(false);

    const [linkData, setLinkData] = useState({
        id: id,
        title: initialTitle,
        link: initialLink
    });

    const toggleEditMode = (): void => {
        setEditMode(!editMode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLinkData({
            ...linkData,
            [e.target.name]: e.target.value
        });
    };

    async function handleBlur() {
        try {

            const response = await fetch("http://127.0.0.1:8000/api/links/" + id + "/", {
                method: 'PATCH', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(linkData)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Link updated successfully');
                const updatedLink : Link = await response.json();
                updateLink(updatedLink);
                setEditMode(false);

            }
        } catch (error) {
            console.error('error: ', error);
        }
    };    

    async function handleDelete() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/links/" + id + "/", {
                method: 'DELETE', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Social Media deleted successfully');
                deleteLink(id);                
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
                    <input name="title" value={linkData.title} onChange={handleChange} onBlur={handleBlur} className="border p-2 rounded-lg block w-full mb-4"/>
                    <input name="link" value={linkData.link} onChange={handleChange} onBlur={handleBlur} className="border p-2 rounded-lg block w-full mb-4"/>
                </>
            ) : (
                <>
                    <h3 className="p-1 font-semibold">{linkData.title}</h3>
                    <p className="p-1">{linkData.link}</p>
                </>
            )}
                <button className="p-1 hover:bg-stone-100 rounded-lg">
                    <InsertPhotoOutlinedIcon />
                </button>
            </div>
            {!deleteMenu ?  (
                    <button onClick={() => setDeleteMenu(true)}className="absolute bottom-2 right-2 hover:bg-stone-100 rounded-lg p-1">
                        <DeleteOutlinedIcon className="w-5 h-5 text-stone-500 "/>
                    </button>
                ) : (
                    <div className="flex flex-col gap-4 mt-8">
                        <h3>Delete this link? You will not be able to undo this action.</h3>
                        <div className="flex">
                            <button onClick={handleDelete} className="rounded-full bg-blue-100 hover:bg-blue-300 font-medium px-5 py-2.5 text-center mr-2">Delete</button>
                            <button onClick={() => setDeleteMenu(false)} className="rounded-full border font-medium px-5 py-2.5 text-center hover:bg-gray-100">Cancel</button>
                        </div>
                        
                    </div>
                )}
                
            
        </div>
    )
}
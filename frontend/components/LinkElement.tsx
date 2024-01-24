"use client"
import { useState } from "react";

interface LinkElementProps {
    id: number,
    title: string,
    link: string
}

export default function LinkElement({id, title, link} : LinkElementProps) {
    const [linkData, setLinkData] = useState({
        title: title ? title : "",
        link: link ? link : ""
    })
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLinkData({...linkData,
            [e.target.name]: e.target.value
        })
    }

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
                console.log('Profile updated successfully');
            }
        } catch (error) {

        }
    }
    return (
        <div className="border rounded p-2 mb-2">
            <input name="title" onChange={handleChange} onBlur={handleBlur} value={linkData.title} className="w-full font-semibold"></input>
            <input name="link" onChange={handleChange} onBlur={handleBlur} value={linkData.link} className="w-full mt-4"></input>
        </div>
    )
}
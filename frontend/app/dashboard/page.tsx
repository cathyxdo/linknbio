import { Add } from "@mui/icons-material";
import AddSocialMediaForm from "@/components/AddSocialMediaForm";
import SocialMedia from "@/components/SocialMedia";
import AddLinkForm from "@/components/AddLinkForm";
import EditProfileForm from "@/components/EditProfileForm";
import LinkElement from "@/components/LinkElement";
import { useState, useEffect } from "react";

interface ListProfile {
    id: number;
    user: number;
    name: string;
    bio: string;
    photo: string;
    profile_font: string;
    profile_font_color: string;
    background_flag: string;
    background_color: string;
    background_image: string;
    link_bubble_style: string;
    link_font: string;
    social_media_icons_location: string;
    social_media_profiles: SocialMediaProfile[];
    links: Link[];
}

interface SocialMediaProfile {
    id: number;
    type: string;
    link: string;
    list: number;
}

interface Link {
    id: number;
    link: string;
    title: string;
    photo: string;
    list: number;
} 
export default async  function Page() {
    const list = await getList();
    /* const initialPageData = {
        id: 0,
        user: 0,
        name: "hello",
        bio: "",
        photo: "",
        profile_font: "",
        profile_font_color: "",
        background_flag: "",
        background_color: "",
        background_image: "",
        link_bubble_style: "",
        link_font: "",
        social_media_icons_location: "",
        social_media_profiles: [],
        links: []
    }
    const [pageData, setPageData] = useState<ListProfile>(initialPageData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/lists/1', {
                    method: "GET",
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:3000',

                    }
                });
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data: ListProfile = await res.json();
                console.log(res);
                setPageData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    },[]);
 */

    return (
        <div className="px-8 py-8">
            <div className="flex justify-center">
                <ul className="px-4 py-4 mt-4 fixed flex gap-4 bg-white w-full rounded-3xl border">
                    <li>
                        Content
                    </li>
                    <li>
                        Appearance
                    </li>
                    <li>
                        Analytics
                    </li>
                </ul>
            </div>
            <div className="py-20 flex min-h-screen gap-8">
                <div className="basis-full lg:basis-3/4 mt-8 px-24 ">
                    <EditProfileForm id={1} user={list.user} name={list.name} bio={list.bio} photo={list.photo} />
                    <AddSocialMediaForm listid={1}/>
                    <div className="p-4">
                        {list.social_media_profiles.map((profile) => (
                            <SocialMedia key={profile.id} {...profile} />
                        ))}
                    </div>
                    <AddLinkForm listid={1} />
                    <div className="p-4">
                        {list.links.map((link) => (
                            <LinkElement key={link.id} {...link} />
                        ))}
                    </div>

                </div>


                <div className="basis-1/4 justify-center hidden lg:flex">
                    <div className="fixed top-1/4 m-4 h-[466px] w-[215px] p-4 mb-4 space-y-6 bg-white border-gray-600 border-8 rounded-2xl shadow-sm ">
                        <div className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card header</h3>
                        </div>
                        <div className="h-32 px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card body</h3>
                        </div>
                        <div className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card footer</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
async function getList(): Promise<ListProfile> {
    const res = await fetch('http://127.0.0.1:8000/api/lists/1');
    const list: ListProfile = await res.json();
    console.log(list);
    return list;
}; 
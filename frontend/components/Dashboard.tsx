"use client"
import { useState } from "react";
import { ListProfile, SocialMediaProfile, Link } from "@/shared/interfaces";
import EditProfileForm from "./EditProfileForm";
import SocialMedia from "./SocialMedia";
import AddSocialMediaForm2 from "./AddSocialMediaForm2";
import AddLinkForm2 from "./AddLinkForm2";
import LinkElement2 from "./LinkElement2";
import PhonePreview from "./PhonePreview";
import { Phone } from "@mui/icons-material";
interface DashboardProps {
    data: ListProfile,
}
export default function Dashboard({ data }: DashboardProps) {
    const [pageData, setPageData] = useState<ListProfile>({
        id: data.id || 0,
        user: data.user || 0,
        name: data.name || "",
        bio: data.bio || "",
        photo: data.photo || "",
        profile_font: data.profile_font || "",
        profile_font_color: data.profile_font_color || "",
        background_flag: data.background_color || "",
        background_color: data.background_color || "",
        background_image: data.background_image || "",
        link_bubble_style: data.link_bubble_style || "",
        link_font: data.link_font || "",
        social_media_icons_location: data.social_media_icons_location || "",
        social_media_profiles: data.social_media_profiles || [],
        links: data.links || []
    });
    function handleLinkAdd(newLink: Link) {
        setPageData(prevPageData => ({
            ...prevPageData,
            links: [...prevPageData.links, newLink]
        }));
    }
    function handleLinkDelete(id: number) {
        setPageData(prevPageData => ({
            ...prevPageData,
            links: prevPageData.links.filter(link => link.id !== id)
        }));
    }
    function handleLinkUpdate(updatedLink: Link) {
        setPageData(prevPageData => ({
            ...prevPageData,
            links: prevPageData.links.map(link =>
                link.id === updatedLink.id ? updatedLink : link)

        }));
    }
    function handleSocialMediaAdd(newProfile: SocialMediaProfile) {
        setPageData(prevPageData => ({ 
            ...prevPageData, 
            social_media_profiles: [...prevPageData.social_media_profiles, newProfile]
        }));
    }

    function handleSocialMediaDelete(id: number) {
        setPageData(prevData => ({
            ...prevData,
            social_media_profiles: prevData.social_media_profiles.filter(profile => profile.id !== id),
        }));
    }

    function handleSocialMediaUpdate(updatedProfile: SocialMediaProfile) {
        setPageData(prevData => ({
            ...prevData,
            social_media_profiles: prevData.social_media_profiles.map(profile => 
                profile.id === updatedProfile.id ? updatedProfile : profile),
        }));
    }
    function handleProfileUpdate(newName: string, newBio: string) {
        setPageData(prevData => ({
            ...prevData,
            name: newName,
            bio: newBio
        }));
    }

    return (
        <div className="px-8 py-8 ">
            <div className="py-20 flex min-h-screen gap-8">
                <div className="basis-full lg:basis-3/4 mt-8 px-16 ">
                    <EditProfileForm id={pageData.id} user={pageData.user} name={pageData.name} bio={pageData.bio} photo={pageData.photo} updateProfile={handleProfileUpdate}/>
                    <AddSocialMediaForm2 id={pageData.id} addNewProfile={handleSocialMediaAdd}/>
                    <div className="p-4">
                        {pageData.social_media_profiles.map((profile) => (
                            <SocialMedia key={profile.id} {...profile} deleteSocialMedia={handleSocialMediaDelete} updateSocialMedia={handleSocialMediaUpdate} />
                        ))}
                    </div>
                    <AddLinkForm2 id={pageData.id} addNewLink={handleLinkAdd} />
                    <div className="p-4">
                        {pageData.links.map((link) => (
                            <LinkElement2 key={link.id} {...link} deleteLink={handleLinkDelete} updateLink={handleLinkUpdate} />
                        ))}
                    </div>        
                </div>
                <PhonePreview pageData={pageData}/>

            </div>
        </div>
    )
}
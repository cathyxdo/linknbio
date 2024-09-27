"use client"
import { useState } from "react";
import { ListProfile, SocialMediaProfile, Link } from "@/shared/interfaces";
import EditProfileForm from "./EditProfileForm";
import SocialMedia from "./SocialMedia";
import AddSocialMediaForm2 from "./AddSocialMediaForm2";
import AddLinkForm2 from "./AddLinkForm2";
import LinkElement2 from "./LinkElement2";
import PhonePreview from "./PhonePreview";
import ImageModal from "./ImageModal";
import { Phone } from "@mui/icons-material";
import { EventLoopMonitorOptions } from "perf_hooks";

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
        profile_photo_url: data.profile_photo_url || "",
        profile_font: data.profile_font || "",
        profile_font_color: data.profile_font_color || "",
        background_flag: data.background_color || "",
        background_color: data.background_color || "",
        background_image: data.background_image || "",
        link_bubble_style: data.link_bubble_style || "",
        link_bubble_color: data.link_bubble_color || "",
        link_font: data.link_font || "",
        link_font_color: data.link_font_color || "",
        social_media_icons_location: data.social_media_icons_location || "",
        social_media_profiles: data.social_media_profiles || [],
        links: data.links || []
    });
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageModalData, setImageModalData] = useState({
        type: "",
        id: 0,
    })
    const [isPhonePreviewVisible, setIsPhonePreviewVisible] = useState(false);


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
    function handleProfileUpdate(newName: string, newBio: string, newProfilePhotoUrl: string) {
        setPageData(prevData => ({
            ...prevData,
            name: newName,
            bio: newBio,
            profile_photo_url: newProfilePhotoUrl
        }));
    }
    function handleProfileUpdate2(updatedProfile: ListProfile) {
        setPageData(prevPageData => ({
            ...prevPageData,
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            profile_photo_url: updatedProfile.profile_photo_url
        }));
    }
    function closeImageModal() {
        setShowImageModal(false);
    }
    function openImageModal(type: string, id: number) {
        setShowImageModal(true);
        setImageModalData({
            type: type,
            id: id
        })
    }

    return (
        <div className="px-8 py-8 ">
            <div className="py-10 flex min-h-screen ">
                <div className="basis-full lg:basis-3/4 px-16 ">
                    <EditProfileForm id={pageData.id} user={pageData.user} name={pageData.name} bio={pageData.bio} profile_photo_url={pageData.profile_photo_url} photo={pageData.photo} updateProfile={handleProfileUpdate}/>
                    <AddSocialMediaForm2 id={pageData.id} addNewProfile={handleSocialMediaAdd}/>
                    <div className="p-4">
                        {pageData.social_media_profiles.map((profile) => (
                            <SocialMedia key={profile.id} {...profile} deleteSocialMedia={handleSocialMediaDelete} updateSocialMedia={handleSocialMediaUpdate} />
                        ))}
                    </div>

                    <AddLinkForm2 id={pageData.id} addNewLink={handleLinkAdd} />
                    <div className="p-4">
                        {pageData.links.map((link) => (
                            <LinkElement2 key={link.id} {...link} deleteLink={handleLinkDelete} updateLink={handleLinkUpdate} openImageModal={openImageModal}/>
                        ))}
                    </div>    
                </div>
                {/* Conditionally render PhonePreview or button based on screen size */}
                <div className="hidden lg:block basis-1/4 justify-center ">
                    <PhonePreview pageData={pageData} />
                </div>

                {/* Show Preview button for smaller screens */}
                {!isPhonePreviewVisible && (
                    <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                            onClick={() => setIsPhonePreviewVisible(true)}
                        >
                            Show Preview
                        </button>
                    </div>
                )}

                {/* Fullscreen Phone Preview for small screens */}
                {isPhonePreviewVisible && (
                        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                            <PhonePreview pageData={pageData} />
                            <button
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full"
                                onClick={() => setIsPhonePreviewVisible(false)}
                            >
                                Close Preview
                            </button>
                        </div>
                )}
            </div>

            {showImageModal && 
                <ImageModal closeImageModal={closeImageModal} data={imageModalData}/>
            }   
        </div>
    )
}
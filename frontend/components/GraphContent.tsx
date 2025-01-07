import { useState } from "react";
import { LinkClicks, SocialMediaProfileClicks } from "@/shared/interfaces";
import GraphSocialMediaClicks from "./GraphSocialMediaClicks";
import GraphLinkClicks from "./GraphLinkClicks";

interface GraphContentProps {
    linkClicks: LinkClicks[],
    socialMediaClicks: SocialMediaProfileClicks[]
}
export default function GraphContent({ linkClicks, socialMediaClicks }: GraphContentProps) {
    const [contentMode, setContentMode] = useState<'link' | 'sm'>('link');
    return (
        <div className="bg-white p-10 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Content</h3>
            <div className="flex gap-4">
            <button 
                    className={`relative pb-1 hover:border-b-2 hover:border-black  ${contentMode === 'link' ? 'font-bold border-b-2 border-black' : ''}`} 
                    onClick={() => setContentMode("link")}
                >
                    Links
                </button>
                <button 
                    className={`relative pb-1 hover:border-b-2 hover:border-black ${contentMode === 'sm' ? 'font-bold hover:none border-b-2 border-black' : ''}`} 
                    onClick={() => setContentMode("sm")}
                >
                    Social Media
                </button>
            </div>
            {contentMode === "sm" && (
                <div className="flex flex-col gap-4 mt-8">
                {socialMediaClicks.length > 0 ? (
                    socialMediaClicks.map((social_media) => (
                        <GraphSocialMediaClicks key={social_media.social_media_profile_id} data={social_media} />
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
            )}
            {contentMode === "link" && (
                <div className="flex flex-col gap-4 mt-8">
                    {linkClicks.length > 0 ? (
                        linkClicks.map((link) => (
                            <GraphLinkClicks key={link.link_id} data={link} />
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            )}

        </div>
    )
}
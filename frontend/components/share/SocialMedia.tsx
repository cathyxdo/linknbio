"use client"

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

interface SocialMediaProps {
    profileFontColor : string,
    profileLink: string,
    profileType: string,
    profileId: number
}

export default function SocialMedia({profileFontColor, profileLink, profileType, profileId} : SocialMediaProps) {
    const renderSocialMediaIcons = (type: string) => {
        switch (type) {
          case "instagram":
            return (
              <InstagramIcon
                className="ease-in transform hover:scale-110 text-4xl transition duration-150"
                style={{ color: profileFontColor }}
              />
            );
          case "facebook":
            return (
              <FacebookIcon
                className="ease-in transform hover:scale-110 text-4xl transition duration-150"
                style={{ color: profileFontColor }}
              />
            );
          case "youtube":
            return (
              <YouTubeIcon
                className="ease-in transform hover:scale-110 text-4xl transition duration-150"
                style={{ color: profileFontColor }}
              />
            );
          case "twitter":
            return (
              <TwitterIcon
                className="ease-in transform hover:scale-110 text-4xl transition duration-150"
                style={{ color: profileFontColor }}
              />
            );
          default:
            return null;
        }
      };
    
    async function logSocialMediaClick(socialMediaProfileId: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/log/social_media_click/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ social_media_profile_id: socialMediaProfileId }),
        });
        if (!res.ok) {
            console.error("Failed to log social media click");
        }
    }
    

      return (
        <a target="_blank" href={profileLink} onClick={() => logSocialMediaClick(profileId)}>
            {renderSocialMediaIcons(profileType)}
        </a>
      )
    
}

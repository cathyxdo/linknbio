import { ListProfile } from "@/shared/interfaces";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
interface PhonePreviewProps {
  pageData: ListProfile;
}
export default function PhonePreview({ pageData }: PhonePreviewProps) {
  const imageStyle = {
    borderRadius: "50%",
  };
  const renderSocialMediaIcons = (type: string) => {
    switch (type) {
      case "instagram":
        return (
          <InstagramIcon
            className="ease-in transform hover:scale-110 text-4xl transition duration-150 md:text-xl"
            style={{ color: pageData.profile_font_color }}
          />
        );
      case "facebook":
        return (
          <FacebookIcon
            className="ease-in transform hover:scale-110 text-4xl transition duration-150 md:text-xl"
            style={{ color: pageData.profile_font_color }}
          />
        );
      case "youtube":
        return (
          <YouTubeIcon
            className="ease-in transform hover:scale-110 text-4xl transition duration-150 md:text-xl"
            style={{ color: pageData.profile_font_color }}
          />
        );
      case "twitter":
        return (
          <TwitterIcon
            className="ease-in transform hover:scale-110 text-4xl transition duration-150 md:text-xl"
            style={{ color: pageData.profile_font_color }}
          />
        );
      default:
        return null;
    }
  };
  function getLinkBubbleColorStyle() {
    if (pageData.link_bubble_style.includes("bubble_outline")) {
      return {
        outlineStyle: "solid",
        outlineColor: pageData.link_bubble_color,
        color: pageData.link_font_color,
      };
    } else {
      return {
        backgroundColor: pageData.link_bubble_color,
        color: pageData.link_font_color,
      };
    }
  }
  function getLinkBubbleStyle() {
    switch (pageData.link_bubble_style) {
      case "bubble_filled":
        return "";
      case "bubble_filled_rounded":
        return "rounded-xl";
      case "bubble_filled_circular":
        return "rounded-full";
      case "bubble_outline":
        return "";
      case "bubble_outline_rounded":
        return "rounded-xl";
      case "bubble_outline_circular":
        return "rounded-full";
      case "bubble_shadow":
        return "shadow-lg";
      case "bubble_shadow_rounded":
        return "shadow-lg rounded-xl";
      case "bubble_shadow_circular":
        return "shadow-lg rounded-full";
      default:
        return "border-2 border-black";
    }
  }

  return (
    <div
      style={{ backgroundColor: pageData.background_color }}
      className={`fixed overflow-auto scrollbar-hidden h-full w-full md:h-[692px] md:w-[320px] px-4 md:px-2 py-4 mb-4 space-y-2  md:border-gray-900 md:border-8 md:rounded-3xl shadow-sm flex flex-col items-center text-center font-${pageData.profile_font}`}
    >
      <div className="mt-10 md:mt-0 text-black flex flex-col gap-2 items-center">
        {pageData.profile_photo_url && (
          <div className="">
            <Image
              src={pageData.profile_photo_url}
              width={50}
              height={50} 
              style={imageStyle}
              alt="link picture"
              className="w-24 h-24 md:w-12 md:h-12"
            />
          </div>
        )}

        <div
          style={{ color: pageData.profile_font_color }}
          className="text-xl md:text-sm font-bold"
        >
          {pageData.name ? pageData.name : `@${pageData.username}`}
        </div>
        <div style={{ color: pageData.profile_font_color }} className="md:text-xs">
          {pageData.bio}
        </div>
      </div>
      {pageData.social_media_icons_location === "top" && (
        <div className="">
          <ul className="flex gap-4 md:gap-2 text-black md:mt-0 md:mb-0 mt-2 mb-2">
            {pageData.social_media_profiles &&
              pageData.social_media_profiles.map((profile) => (
                <li key={profile.id}>
                  <a target="_blank" href={profile.link}>
                    {renderSocialMediaIcons(profile.type)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-6 md:gap-4 w-full">
        {pageData.links &&
          pageData.links.map((link) => (
            <a
              target="_blank"
              key={link.id}
              href={link.link}
              style={getLinkBubbleColorStyle()}
              className={`${getLinkBubbleStyle()} relative flex items-center justify-center md:px-3 md:py-3 md:h-12 px-4 py-4 h-16 transform hover:scale-105 md:hover:scale-101 transition duration-150`}
            >
              {link.link_photo_url && (
                <Image
                  src={link.link_photo_url}
                  width={36}
                  height={36}
                  style={imageStyle}
                  alt={link.title}
                  className="absolute left-2 md:left-1.5 md:top-1.5 w-11 h-11 md:w-9 md:h-9"
                />
              )}
              <p className="text-center text-sm md:text-xs">{link.title}</p>
            </a>
          ))}
      </div>
      {pageData.social_media_icons_location === "bottom" && (
        <div className="">
          <ul className="flex gap-4 md:gap-2 text-black">
            {pageData.social_media_profiles &&
              pageData.social_media_profiles.map((profile) => (
                <li key={profile.id}>
                  <a target="_blank" href={profile.link}>
                    {renderSocialMediaIcons(profile.type)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

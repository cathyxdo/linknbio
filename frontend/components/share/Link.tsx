"use client"

import Image from "next/image";
interface LinkProps {
    linkBubbleColor: string,
    linkFontColor: string, 
    linkBubbleStyle: string,
    linkId: number,
    linkLink: string,
    linkTitle: string,
    linkPhotoUrl: string

}
export default function Link({linkBubbleColor, linkFontColor, linkBubbleStyle, linkId, linkLink, linkTitle, linkPhotoUrl} : LinkProps) {
    function getLinkBubbleColorStyle() {
        if (linkBubbleStyle.includes("bubble_outline")) {
          return {
            outlineStyle: "solid",
            outlineColor: linkBubbleColor,
            color: linkFontColor,
          };
        } else {
          return {
            backgroundColor: linkBubbleColor,
            color: linkFontColor,
          };
        }
      }
    function getLinkBubbleStyle() {
        switch (linkBubbleStyle) {
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
    async function logLinkClick(linkId: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/log/link_click/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link_id: linkId }),
        });
      
        if (!res.ok) {
          console.error("Failed to log link click");
        }
      }
    return (
        <a
            target="_blank"
            key={linkId}
            href={linkLink}
            style={getLinkBubbleColorStyle()}
            className={`${getLinkBubbleStyle()} px-4 py-4  ease-in transform hover:scale-105 transition duration-150`}
            onClick={() => logLinkClick(linkId)}
            >
            {linkPhotoUrl && (
                <Image
                src={linkPhotoUrl} // Fallback to a default image if photo is not available
                width={45}
                height={45}
                style={{borderRadius: "50%"}}
                alt={linkTitle}
                className="absolute left-1 top-1"
                />
            )}
            <p className="text-sm">{linkTitle}</p>
        </a>
    )
}
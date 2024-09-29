import { ListProfile } from "@/shared/interfaces";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from "next/image";
interface PhonePreviewProps {
    pageData: ListProfile
}
export default function PhonePreview({pageData}: PhonePreviewProps) {
    const imageStyle = {
        borderRadius: '50%',
    }
    const renderSocialMediaIcons = (type: string) => {
        switch (type) {
            case 'instagram':
                return <InstagramIcon className='text-m' style={{color: pageData.profile_font_color}}/>;
            case 'facebook':
                return <FacebookIcon className='text-m' style={{color: pageData.profile_font_color}}/>;
            case 'youtube':
                return <YouTubeIcon className='text-m' style={{color: pageData.profile_font_color}}/>
            case 'twitter':
                return <TwitterIcon className='text-m' style={{color: pageData.profile_font_color}}/>
            default:
                return null;
        }
    }
    function getLinkBubbleColorStyle() {
        if (pageData.link_bubble_style.includes('bubble_outline')) {
            return {outlineStyle: 'solid', outlineColor: pageData.link_bubble_color, color: pageData.link_font_color}
        } else {
            return {backgroundColor: pageData.link_bubble_color, color: pageData.link_font_color}
        } 
    }
    function getLinkBubbleStyle() {
        switch(pageData.link_bubble_style) {
            case 'bubble_filled':
                return '';
            case 'bubble_filled_rounded':
                return 'rounded-xl';
            case 'bubble_filled_circular':
                return 'rounded-full';
            case 'bubble_outline':
                return '';
            case 'bubble_outline_rounded':
                return 'rounded-xl';
            case 'bubble_outline_circular':
                return 'rounded-full';
            case 'bubble_shadow':
                return 'shadow-lg';
            case 'bubble_shadow_rounded':
                return 'shadow-lg rounded-xl';
            case 'bubble_shadow_circular':
                return 'shadow-lg rounded-full';    
            default:
                return 'border-2 border-black';           
        }
    }

    return (
            <div style = {{backgroundColor: pageData.background_color }} 
                className={`fixed  h-[692px] w-[320px] p-4 mb-4 space-y-2  border-gray-900 border-8 rounded-3xl shadow-sm flex flex-col items-center text-center font-${pageData.profile_font}`} >
                <div className=" text-black flex flex-col gap-2 items-center">
                {pageData.profile_photo_url && 
                    <div className="">
                        <Image
                            src={pageData.profile_photo_url}
                            width={50}
                            height={50}
                            style= {imageStyle}
                            alt="link picture"
                            className=""/>
                        
                    </div>
                }
                    <div 
                        style={{color: pageData.profile_font_color}}
                        className="text-sm font-bold" 
                    >        
                        {pageData.name}
                    </div>
                    <div 
                        style={{color: pageData.profile_font_color}}
                        className="text-xs"
                    >
                        {pageData.bio}
                    </div>
                </div>
                {pageData.social_media_icons_location === "top" && 
                    <div className="">
                        <ul className="flex gap-2 text-black">
                            {pageData.social_media_profiles && pageData.social_media_profiles.map(profile => (
                                <li key={profile.id}>
                                    <a target="_blank" href={profile.link}>{renderSocialMediaIcons(profile.type)}</a>
                                </li>
                            ))}
                        </ul>                
                    </div>
                }
                <div className="flex flex-col gap-4 w-full">
                    {pageData.links && pageData.links.map(link => (
                        <a target="_blank" key={link.id} href={link.link} style={getLinkBubbleColorStyle()} className={`${getLinkBubbleStyle()} relative  text-xs px-3 py-3  `} >
                            {link.link_photo_url && 
                            <Image
                                src={link.link_photo_url} 
                                width={33}
                                height={33}
                                style={imageStyle}
                                alt={link.title}
                                className="absolute left-1 top-1"/>
                            }
                            <p className="text-center text-xs">{link.title}</p>
                        </a>
                    ))}
                </div>
                {pageData.social_media_icons_location === "bottom" && 
                    <div className="">
                        <ul className="flex gap-2 text-black">
                            {pageData.social_media_profiles && pageData.social_media_profiles.map(profile => (
                                <li key={profile.id}>
                                    <a target="_blank" href={profile.link}>{renderSocialMediaIcons(profile.type)}</a>
                                </li>
                            ))}
                        </ul>                
                    </div>
                }
            </div>
    )
}
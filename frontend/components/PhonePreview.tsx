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
                return <InstagramIcon className='text-m'/>;
            case 'facebook':
                return <FacebookIcon className='text-m'/>;
            case 'youtube':
                return <YouTubeIcon className='text-m'/>
            case 'twitter':
                return <TwitterIcon className='text-m'/>
            default:
                return null;
        }
    }

    function getLinkBubbleStyle() {
        switch(pageData.link_bubble_style) {
            case 'bubble_filled':
                return '';
            case 'bubble_filled_rounded':
                return 'rounded_xl';
            case 'bubble_filled_circular':
                return 'rounded_full';
            case 'bubble_outline':
                return 'border-black border-2 ';
            case 'bubble_outline_rounded':
                return 'border-black border-2 rounded-xl';
            case 'bubble_outline_circular':
                return 'border-black border-2 rounded-full';
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
        <div className="basis-1/4 justify-center hidden lg:flex">
            <div className={` bg-[${pageData.background_color}] fixed top-1/4 m-4 h-[692px] w-[320px] p-4 mb-4 space-y-2  border-gray-900 border-8 rounded-3xl shadow-sm flex flex-col items-center text-center`}>
                <div className=" text-black flex flex-col gap-2 items-center">
                    <div className="">
                        <Image
                            src={'/test_img.jpg'}
                            width={50}
                            height={50}
                            style= {imageStyle}
                            alt="link picture"
                            className=""/>
                    </div>
                    <div className="text-sm font-bold">{pageData.name}</div>
                    <div className="text-xs">{pageData.bio}</div>
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
                        <a target="_blank" key={link.id} href={link.link} className={`${getLinkBubbleStyle()} relative  text-xs px-3 py-3  `} >
                            <Image
                                src={link.photo || '/test_img.jpg'} // Fallback to a default image if photo is not available
                                width={33}
                                height={33}
                                style={imageStyle}
                                alt={link.title}
                                className="absolute left-1 top-1"/>
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
        </div>
    )
}
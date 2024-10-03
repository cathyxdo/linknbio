
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';
import { ListProfile } from "@/shared/interfaces";


interface SharePageProps {
    list: ListProfile

    //listid: string;
    //list: ListProfile;
}

/* interface ListProfile {
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
}  */

export default async function Page({ params }: any) {
    const list = await getList(params.name);
    const imageStyle = {
        borderRadius: '50%',
        
    }

    const renderSocialMediaIcons = (type: string) => {
        switch (type) {
            case 'instagram':
                return <InstagramIcon className='ease-in transform hover:scale-110 transition duration-150' style={{color: list.profile_font_color}}/>;
            case 'facebook':
                return <FacebookIcon className='ease-in transform hover:scale-110 transition duration-150' style={{color: list.profile_font_color}}/>;
            case 'youtube':
                return <YouTubeIcon className='ease-in transform hover:scale-110 transition duration-150' style={{color: list.profile_font_color}}/>
            case 'twitter':
                return <TwitterIcon className='ease-in transform hover:scale-110 transition duration-150' style={{color: list.profile_font_color}}/>
            default:
                return null;
        }
    }

    function getLinkBubbleColorStyle() {
        if (list.link_bubble_style.includes('bubble_outline')) {
            return {outlineStyle: 'solid', outlineColor: list.link_bubble_color, color: list.link_font_color}
        } else {
            return {backgroundColor: list.link_bubble_color, color: list.link_font_color}
        } 
    }
    function getLinkBubbleStyle() {
        switch(list.link_bubble_style) {
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
        <div className={`flex flex-col items-center h-screen font-${list.profile_font}`} style={{ backgroundColor: list.background_color}}>
            <div className="flex flex-col gap-4 items-center text-center m-10 w-full max-w-2xl ">
                <div className="flex flex-col gap-2 items-center">
                    {list.profile_photo_url &&
                        <div className="">
                            <Image
                                src={list.profile_photo_url}
                                width={100}
                                height={100}
                                style={imageStyle}
                                alt="profile-photo"
                                className=""/>
                        </div>
                    }
                    <div 
                        style={{color: list.profile_font_color}}
                        className="text-xl font-bold" 
                    >        
                        {list.name}
                    </div>
                    <div 
                        style={{color: list.profile_font_color}}
                        className="text-l"
                    >
                        {list.bio}
                    </div>
                </div>
                {list.social_media_icons_location === "top" && 
                    <div>
                        <ul className="flex gap-4 mt-4 mb-4">
                            {list.social_media_profiles && list.social_media_profiles.map(profile => (
                                <li key={profile.id}>
                                    <a target="_blank" href={profile.link}>{renderSocialMediaIcons(profile.type)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <div className="flex flex-col gap-6 w-full">
                    {list.links && list.links.map(link => (
                        <a target="_blank" key={link.id} href={link.link} style={getLinkBubbleColorStyle()} className={`${getLinkBubbleStyle()} px-4 py-4  ease-in transform hover:scale-105 transition duration-150`} >
                            {link.link_photo_url && 
                                <Image
                                    src={link.link_photo_url} // Fallback to a default image if photo is not available
                                    width={45}
                                    height={45}
                                    style={imageStyle}
                                    alt={link.title}
                                    className="absolute left-1 top-1"/>
                            }
                            <p className="text-sm">{link.title}</p>
                        </a>
                    ))}
                </div>
               {list.social_media_icons_location === "bottom" && 
                    <div>
                        <ul className="flex gap-4 mt-4 mb-4">
                            {list.social_media_profiles && list.social_media_profiles.map(profile => (
                                <li key={profile.id}>
                                    <a target="_blank" href={profile.link}>{renderSocialMediaIcons(profile.type)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <ul>
                </ul>
            </div>

         </div>
                    
    )
}


async function getList(name: string): Promise<ListProfile> {
    const res = await fetch('http://backend:8000/api/lists/view/' + name, { cache: 'no-store' });
    const list: ListProfile = await res.json();

    return list;
};
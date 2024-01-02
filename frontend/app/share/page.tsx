
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from "react";

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



export default function Page() {
/*     const [listData, setListData] = useState<ListProfile>({
        id: 0,
        user: 0,
        name: '',
        bio: '',
        photo: '',
        profile_font: '',
        profile_font_color: '',
        background_flag: '',
        background_color: '',
        background_image: '',
        link_bubble_style: '',
        link_font: '',
        social_media_icons_location: '',
        social_media_profiles: [],
        links: [],
    });
    
    useEffect(() => {

    }, []); */
    
/*     const imageStyle = {
        borderRadius: '50%',
      } */
      
    return (

        <div className="bg-black">hi</div>
    )
}
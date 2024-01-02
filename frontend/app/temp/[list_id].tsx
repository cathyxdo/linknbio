
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

interface SharePageProps {
    list_id: string;
    list: ListProfile;
}

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


const SharePage: NextPage<SharePageProps> = ({ list, list_id }) => {
    const imageStyle = {
        borderRadius: '50%',
    }
    return (
        <div className="flex flex-col items-center ml-4 mr-4">
            <div className="flex flex-col gap-4 items-center text-center m-10 w-full max-w-2xl ">
                <div className="flex flex-col gap-2 items-center">
                    <div className="">
                        <Image
                            src="/test_img.jpg"
                            width={100}
                            height={100}
                            style={imageStyle}
                            alt="link picture"
                            className=""/>
                    </div>
                    <div className="text-xl font-bold">First Name - Last Name</div>
                    <div className="text-l">Bio Description</div>
                </div>
                <div>
                    <ul className="flex gap-4 mt-4 mb-4">
                        <li>
                            <InstagramIcon className='ease-in transform hover:scale-110 transition duration-150'/>
                        </li>
                        <li><FacebookIcon className='ease-in transform hover:scale-110 transition duration-150'/></li>
                        <li><YouTubeIcon className='ease-in transform hover:scale-110 transition duration-150'/></li>
                        <li><TwitterIcon className='ease-in transform hover:scale-110 transition duration-150'/></li>
                    </ul>
                </div>
                <ul className="flex flex-col gap-6 w-full">
                    
                    <li className="bg-slate-300 px-6 py-6 rounded-full ease-in transform hover:scale-105 transition duration-150">
                        <Image
                            src="/test_img.jpg"
                            width={50}
                            height={50}
                            style={imageStyle}
                            alt="link picture"
                            className="absolute left-4 top-3"/>
                        <p>Link 1</p>
                    </li>
                    <li className="bg-slate-300 px-6 py-6 rounded-full ease-in transform hover:scale-105 transition duration-150">
                        <Image
                            src="/test_img.jpg"
                            width={50}
                            height={50}
                            style={imageStyle}
                            alt="link picture"
                            className="absolute left-4 top-3"/>
                        <p>Link 2</p>
                    </li>
                    <li className="bg-slate-300 px-6 py-6 rounded-full ease-in transform hover:scale-105 transition duration-150">
                        <Image
                            src="/test_img.jpg"
                            width={50}
                            height={50}
                            style={imageStyle}
                            alt="link picture"
                            className="absolute left-4 top-3"/>
                        <p>Link 3</p>
                    </li>
                    <li className="bg-slate-300 px-6 py-6 rounded-full ease-in transform hover:scale-105 transition duration-150">
                        <Image
                            src="/test_img.jpg"
                            width={50}
                            height={50}
                            style={imageStyle}
                            alt="link picture"
                            className="absolute left-4 top-3"/>
                        <p>Link 4</p>
                    </li>
                </ul>
                <ul>
                </ul>
            </div>
         </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const list_id = context.params?.list_id as string;
    console.log(list_id);
    // Replace with your API endpoint
    const res = await fetch('http://127.0.0.1:8000/api/lists/${list_id}');
    const list = await res.json();
    console.log(res);
    return {
        props: {
            list,
            list_id,
        },
    };
};
export default SharePage;
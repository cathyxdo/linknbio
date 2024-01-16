import { Add } from "@mui/icons-material";
import AddSocialMediaForm from "../components/AddSocialMediaForm";
interface SharePageProps {
    listid: string;
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
export default async function Page() {
    const list = await getList();

    return (
        <div className="px-8 py-8">
            <div className="flex justify-center">
                <ul className="px-4 py-4 mt-4 fixed flex gap-4 bg-white w-full rounded-3xl border">
                    <li>
                        Content
                    </li>
                    <li>
                        Appearance
                    </li>
                    <li>
                        Analytics
                    </li>
                </ul>
            </div>
            <div className="py-20 flex min-h-screen gap-8">
                <div className="basis-full lg:basis-3/4 mt-8 px-24 ">
                    <div className="p-4">
                        <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                            <h3 className="text-lg">Edit Profile</h3>
                            <form className="flex flex-col gap-2">

                                <div className="flex ">
                                    <div className="basis-3/4">
                                        <label>Url</label>
                                        <div className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                                            <p className="inline  mr-1">
                                                <label className="font-bold">linknbio.com/</label>
                                            </p>
                                            <p className="inline">
                                                <input className="bg-transparent focus:outline-none"></input>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-sm">Upload Profile Photo</button>
                                </div>
                                
                                <label>Name</label>
                                <input className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>

                                <label>Bio</label>
                                <textarea className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white resize-none"></textarea>
                                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                            </form>
                        </div>
                    </div>


                    <AddSocialMediaForm listid={1}/>
                    <div className="p-4">
                        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add Link</button>
                        <div className="p-4 mb-4 space-y-6 bg-white border border-gray-400 rounded-lg shadow-sm ">
                            <form className="flex flex-col gap-2">
                                <label>Title</label>
                                <input className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                                <label>URL</label>
                                <input className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"></input>
                                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Add</button>
                            </form>
                        </div>
                    </div>
                    
                </div>


                <div className="basis-1/4 justify-center hidden lg:flex">
                    <div className="fixed top-1/4 m-4 h-[466px] w-[215px] p-4 mb-4 space-y-6 bg-white border-gray-600 border-8 rounded-2xl shadow-sm ">
                        <div className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card header</h3>
                        </div>
                        <div className="h-32 px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card body</h3>
                        </div>
                        <div className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600">
                            <h3>Card footer</h3>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
async function getList(): Promise<ListProfile> {
    const res = await fetch('http://127.0.0.1:8000/api/lists/1');
    const list: ListProfile = await res.json();
    console.log(list);
    return list;
};
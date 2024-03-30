'use client'
import { Phone, PhotoOutlined } from "@mui/icons-material";
import { ChromePicker } from "react-color";
import PhonePreview from "./PhonePreview";
import { ListProfile } from "@/shared/interfaces";
import { useState, useRef, useEffect } from "react";
interface AppearanceProps {
    data: ListProfile,
}
export default function Apperance({ data }: AppearanceProps) {
    const [pageData, setPageData] = useState<ListProfile>({
        id: data.id || 0,
        user: data.user || 0,
        name: data.name || "",
        bio: data.bio || "",
        photo: data.photo || "",
        profile_font: data.profile_font || "",
        profile_font_color: data.profile_font_color || "",
        background_flag: data.background_color || "",
        background_color: data.background_color || "",
        background_image: data.background_image || "",
        link_bubble_style: data.link_bubble_style || "",
        link_font: data.link_font || "",
        social_media_icons_location: data.social_media_icons_location || "",
        social_media_profiles: data.social_media_profiles || [],
        links: data.links || []
    });
    const [showColorBgPicker, setShowColorBgPicker] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const pickerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setShowColorBgPicker(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, [pickerRef]);

    async function handleLocationChange(e: React.ChangeEvent<HTMLInputElement> ) {
 
        try {
            const response = await fetch("http://127.0.0.1:8000/api/lists/" + pageData.id + "/", {
                method: 'PATCH', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({social_media_icons_location: e.target.value})
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Profile updated successfully');
                setPageData(prevState => ({
                    ...prevState,
                    social_media_icons_location: e.target.value,
                }));   
            }

        } catch (error) {
            console.error('Failed to update: ', error);
        }
    }

    function getLinkBubbleStyle(style: string) {
        if (style === pageData.link_bubble_style) {
            return 'border-4 border-blue-400 rounded-lg'
        } else {
            return 'border-4 border-transparent'
        }
    }
    async function handleLinkBubbleClick(style: string) {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/lists/" + pageData.id + "/", {
                method: 'PATCH', // or 'PUT' if you are replacing the entire resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({link_bubble_style: style})
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            } else {
                console.log('Profile updated successfully');
                setPageData(prevState => ({
                    ...prevState,
                    link_bubble_style: style,
                }));
            }

        } catch (error) {
            console.error('Failed to update: ', error);
        }
    }
    return (
        <div className="px-8 py-8 ">
            <div className="py-10 flex min-h-screen gap-8">
                <div className="basis-full lg:basis-3/4 mt-8 px-16 ">
                    <h2 className="text-lg font-semibold">Background</h2>
                    <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <button className="p-2 border-4 border-blue-400 rounded-lg" >
                                    <div className="bg-black h-9 w-full"></div>
                                    <p>Color</p>
                                </button>
                                <button className="p-2">
                                    <div className="bg-white h-9 rounded-xl border border-black border-dashed flex items-center justify-center">
                                        <PhotoOutlined />
                                    </div>
                                    <p>Image</p>
                                </button>
                            </div>
                            <div>
                                <h3>Background Color</h3>
                                <button 
                                    className="mt-2 bg-blue-400 w-10 h-10 rounded-lg"
                                    onClick={() => setShowColorBgPicker(showColowBgPicker => !showColorBgPicker)}
                                >
                                </button>
                                {showColorBgPicker && 
                                <div ref={pickerRef} className="absolute z-10">
                                    <ChromePicker 
                                        color={backgroundColor}
                                        onChangeComplete={(newColor) => setBackgroundColor(newColor.hex)}
                                    />
                                </div>
                                }
                            </div>
                        </div>

                    </div>

                    <h2 className="mt-4 text-lg font-semibold">Buttons</h2>
                    <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
                        <div className="flex flex-col gap-2">
                            <h3>Fill</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                                <button onClick={() => handleLinkBubbleClick('bubble_filled')} className={`p-2 ${getLinkBubbleStyle('bubble_filled')} `} >
                                    <div className="bg-black h-9 w-full"></div>
                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_filled_rounded')} className={`p-2 ${getLinkBubbleStyle('bubble_filled_rounded')} `} >
                                    <div className="bg-black h-9 rounded-xl"></div>
                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_filled_circular')} className={`p-2 ${getLinkBubbleStyle('bubble_filled_circular')} `} >
                                    <div className="bg-black h-9 rounded-full"></div>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3>Outline</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <button onClick={() => handleLinkBubbleClick('bubble_outline')} className={`p-2 ${getLinkBubbleStyle('bubble_outline')} `} >
                                    <div className="bg-white border-black border-2 h-9"></div>
                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_outline_rounded')} className={`p-2 ${getLinkBubbleStyle('bubble_outline_rounded')} `} >
                                    <div className="bg-white h-9 border-black border-2 rounded-xl"></div>

                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_outline_circular')} className={`p-2 ${getLinkBubbleStyle('bubble_outline_circular')} `} >
                                    <div className="bg-white h-9 border-black border-2 rounded-full"></div>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3>Shadow</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                                <button onClick={() => handleLinkBubbleClick('bubble_shadow')} className={`p-2 ${getLinkBubbleStyle('bubble_shadow')} `} >
                                    <div className="bg-white shadow-lg h-9"></div>
                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_shadow_rounded')} className={`p-2 ${getLinkBubbleStyle('bubble_shadow_rounded')} `} >
                                    <div className="bg-white h-9 shadow-lg rounded-xl"></div>
                                </button>
                                <button onClick={() => handleLinkBubbleClick('bubble_shadow_circular')} className={`p-2 ${getLinkBubbleStyle('bubble_shadow_circular')} `} >
                                    <div className="bg-white h-9 shadow-lg rounded-full"></div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3>Button Color</h3>
                            <button className="mt-2 bg-blue-400 w-10 h-10 rounded-lg">
                            </button>
                        </div>
                        <div>
                            <h3>Button Font Color</h3>
                            <button className="mt-2 bg-blue-600 w-10 h-10 rounded-lg">
                            </button>
                        </div>

                    </div>
                    <h2 className="mt-4 text-lg font-semibold">Font</h2>
                    <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">

                        <div>
                            <h3>Profile Font</h3>
                            <select>
                                <option>Arial</option>
                                <option>Times New Roman</option>
                                <option>Calibri</option>
                                <option>Cambria</option>

                            </select>
                        </div>
                        <div>
                            <h3>Profile Font Color</h3>
                            <button className="mt-2 bg-blue-600 w-10 h-10 rounded-lg">
                            </button>
                        </div>

                    </div>
                    <h2 className="mt-4 text-lg font-semibold">Social Media</h2>
                    <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
                        <div>
                            <h3 className="mb-4">Social Media Icons Location</h3>
                            <form>
                            <fieldset>

                            <div className="flex flex-col gap-2">
                                <div className="">
                                    <input 
                                        type="radio" 
                                        id="top" 
                                        name="location" 
                                        value="top" 
                                        checked={pageData.social_media_icons_location === "top"} 
                                        onChange={handleLocationChange}

                                    />
                                    <label htmlFor="top" className="ml-4">Top</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="bottom" 
                                        name="location" 
                                        value="bottom" 
                                        checked={pageData.social_media_icons_location === "bottom"}
                                        onChange={handleLocationChange}
                                    />
                                    <label htmlFor="bottom" className="ml-4">Bottom</label>
                                </div>
                            </div>
                            </fieldset>
                            </form>
                        </div>

                    </div>

                </div>

                <PhonePreview pageData={pageData} />
            </div>
        </div>
    )
}
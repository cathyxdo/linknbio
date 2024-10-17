"use client";

import { ChromePicker } from "react-color";
import PhonePreview from "./PhonePreview";
import { ListProfile } from "@/shared/interfaces";
import { useState, useRef, useEffect } from "react";
import FontModal from "./FontModal";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth";

interface AppearanceProps {
  data: ListProfile;
}
export default function Apperance({ data }: AppearanceProps) {
  const [pageData, setPageData] = useState<ListProfile>({
    id: data.id || 0,
    user: data.user || 0,
    username: data.username || "",
    name: data.name || "",
    bio: data.bio || "",
    photo: data.photo || "",
    profile_photo_url: data.profile_photo_url || "",
    profile_font: data.profile_font || "",
    profile_font_color: data.profile_font_color || "",
    background_flag: data.background_color || "",
    background_color: data.background_color || "",
    background_image: data.background_image || "",
    link_bubble_style: data.link_bubble_style || "",
    link_bubble_color: data.link_bubble_color || "",
    link_font: data.link_font || "",
    link_font_color: data.link_font_color || "",
    social_media_icons_location: data.social_media_icons_location || "",
    social_media_profiles: data.social_media_profiles || [],
    links: data.links || [],
  });
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showButtonColorPicker, setShowButtonColorPicker] = useState(false);
  const [showButtonFontColorPicker, setShowButtonFontColorPicker] =
    useState(false);
  const [showProfileFontColorPicker, setShowProfileFontColorPicker] =
    useState(false);
  const bgPickerRef = useRef<HTMLDivElement>(null);
  const buttonColorPickerRef = useRef<HTMLDivElement>(null);
  const buttonFontColorPickerRef = useRef<HTMLDivElement>(null);
  const profileFontColorPickerRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showFontModal, setShowFontModal] = useState(false);
  const [isPhonePreviewVisible, setIsPhonePreviewVisible] = useState(false);
  const fontMapping: { [key: string]: string } = {
    times: "Times New Roman",
    roboto: "Roboto",
    "open-sans": "Open Sans",
    merriweather: "Merriweather",
    poppins: "Poppins",
    "courier-new": "Courier New",
    bitter: "Bitter",
    "libre-baskerville": "Libre Baskerville",
    inter: "Inter",
    "gothic-a1": "Gothic A1",
    montserrat: "Montserrat",
    oswald: "Oswald",
    quicksand: "Quicksand",
    "bebas-neue": "Bebas Neue",
    pacifico: "Pacifico", // using 'cursive' for script fonts
    "fredoka-one": "Fredoka One",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bgPickerRef.current &&
        !bgPickerRef.current.contains(event.target as Node)
      ) {
        setShowBgColorPicker(false);
      }
      if (
        buttonColorPickerRef.current &&
        !buttonColorPickerRef.current.contains(event.target as Node)
      ) {
        setShowButtonColorPicker(false);
      }
      if (
        buttonFontColorPickerRef.current &&
        !buttonFontColorPickerRef.current.contains(event.target as Node)
      ) {
        setShowButtonFontColorPicker(false);
      }
      if (
        profileFontColorPickerRef.current &&
        !profileFontColorPickerRef.current.contains(event.target as Node)
      ) {
        setShowProfileFontColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeFontModal() {
    setShowFontModal(false);
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  }
  async function handleUpload() {
    if (!selectedFile) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const responseData = await response.json();
      setImageUrl(responseData.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  async function handleBgColorChange(newColor: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ background_color: newColor }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          background_color: newColor,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }
  async function handleButtonFontColorChange(newColor: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ link_font_color: newColor }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          link_font_color: newColor,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }

  async function handleButtonColorChange(newColor: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ link_bubble_color: newColor }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          link_bubble_color: newColor,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }
  async function handleProfileFontColorChange(newColor: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profile_font_color: newColor }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          profile_font_color: newColor,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }
  async function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ social_media_icons_location: e.target.value }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          social_media_icons_location: e.target.value,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }

  function getLinkBubbleStyle(style: string) {
    if (style === pageData.link_bubble_style) {
      return "border-4 border-indigo-500 rounded-lg";
    } else {
      return "border-4 border-transparent";
    }
  }
  async function handleLinkBubbleClick(style: string) {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ link_bubble_style: style }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        setPageData((prevState) => ({
          ...prevState,
          link_bubble_style: style,
        }));
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }
  async function handleFontChange(newFont: string) {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await getIdToken(user);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + pageData.id + "/",
          {
            method: "PATCH", // or 'PUT' if you are replacing the entire resource
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profile_font: newFont }),
          }
        );

        if (response.ok) {
          const updatedData = await response.json();
          setPageData((prevState) => ({
            ...prevState,
            profile_font: updatedData.profile_font,
          }));
          setShowFontModal(false); // Close modal after successful update
        } else {
          console.error("Failed to update font");
        }
      }
    } catch (error) {
      console.error("Error updating font:", error);
    }
  }

  return (
    <>
      <div className="md:mt-0 mt-8 md:px-8 md:py-8 ">
        <div className="py-10 flex min-h-screen ">
          <div className="basis-full lg:basis-3/4 px-8 ">
            <h2 className="text-lg font-semibold">Background</h2>
            <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <button className="p-2 border-4 border-indigo-500 rounded-lg">
                    <div className="bg-black h-9 w-full"></div>
                    <p>Color</p>
                  </button>
                  {/* <button className="p-2">
                                        <div className="bg-white h-9 rounded-xl border border-black border-dashed flex items-center justify-center">
                                            <PhotoOutlined />
                                        </div>
                                        <p>Image</p>
                                    </button> */}
                </div>
                <div>
                  <h3>Background Color</h3>
                  <button
                    className="mt-2 w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: pageData.background_color }}
                    onClick={() =>
                      setShowBgColorPicker(
                        (showBgColorPicker) => !showBgColorPicker
                      )
                    }
                  ></button>
                  {showBgColorPicker && (
                    <div ref={bgPickerRef} className="absolute z-10">
                      <ChromePicker
                        color={pageData.background_color}
                        onChangeComplete={(newColor) =>
                          handleBgColorChange(newColor.hex)
                        }
                      />
                    </div>
                  )}
                </div>
                {/* <div>
                                    <h3>Background Image</h3>

                                            <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                        />
                                        <button onClick={handleUpload} disabled={!selectedFile}>
                                        Upload
                                        </button>
                                        <p>{imageUrl}</p>
                                        

                                </div> */}
              </div>
            </div>

            <h2 className="mt-4 text-lg font-semibold">Buttons</h2>
            <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
              <div className="flex flex-col gap-2">
                <h3>Fill</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                  <button
                    onClick={() => handleLinkBubbleClick("bubble_filled")}
                    className={`p-2 ${getLinkBubbleStyle("bubble_filled")} `}
                  >
                    <div className="bg-black h-9 w-full"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_filled_rounded")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_filled_rounded"
                    )} `}
                  >
                    <div className="bg-black h-9 rounded-xl"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_filled_circular")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_filled_circular"
                    )} `}
                  >
                    <div className="bg-black h-9 rounded-full"></div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3>Outline</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleLinkBubbleClick("bubble_outline")}
                    className={`p-2 ${getLinkBubbleStyle("bubble_outline")} `}
                  >
                    <div className="bg-white border-black border-2 h-9"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_outline_rounded")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_outline_rounded"
                    )} `}
                  >
                    <div className="bg-white h-9 border-black border-2 rounded-xl"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_outline_circular")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_outline_circular"
                    )} `}
                  >
                    <div className="bg-white h-9 border-black border-2 rounded-full"></div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3>Shadow</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                  <button
                    onClick={() => handleLinkBubbleClick("bubble_shadow")}
                    className={`p-2 ${getLinkBubbleStyle("bubble_shadow")} `}
                  >
                    <div className="bg-white shadow-lg h-9"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_shadow_rounded")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_shadow_rounded"
                    )} `}
                  >
                    <div className="bg-white h-9 shadow-lg rounded-xl"></div>
                  </button>
                  <button
                    onClick={() =>
                      handleLinkBubbleClick("bubble_shadow_circular")
                    }
                    className={`p-2 ${getLinkBubbleStyle(
                      "bubble_shadow_circular"
                    )} `}
                  >
                    <div className="bg-white h-9 shadow-lg rounded-full"></div>
                  </button>
                </div>
              </div>
              <div>
                <h3>Button Color</h3>
                <button
                  className="mt-2 w-10 h-10 rounded-lg border-2"
                  style={{ backgroundColor: pageData.link_bubble_color }}
                  onClick={() =>
                    setShowButtonColorPicker(
                      (showButtonColorPicker) => !showButtonColorPicker
                    )
                  }
                ></button>
                {showButtonColorPicker && (
                  <div ref={buttonColorPickerRef} className="absolute z-10">
                    <ChromePicker
                      color={pageData.link_bubble_color}
                      onChangeComplete={(newColor) =>
                        handleButtonColorChange(newColor.hex)
                      }
                    />
                  </div>
                )}
              </div>
              <div>
                <h3>Button Font Color</h3>
                <button
                  className="mt-2 w-10 h-10 rounded-lg border-2"
                  style={{ backgroundColor: pageData.link_font_color }}
                  onClick={() =>
                    setShowButtonFontColorPicker(
                      (showButtonFontColorPicker) => !showButtonFontColorPicker
                    )
                  }
                ></button>
                {showButtonFontColorPicker && (
                  <div ref={buttonFontColorPickerRef} className="absolute z-10">
                    <ChromePicker
                      color={pageData.link_font_color}
                      onChangeComplete={(newColor) =>
                        handleButtonFontColorChange(newColor.hex)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <h2 className="mt-4 text-lg font-semibold">Font</h2>
            <div className="mt-2 px-4 py-6 mb-4 border rounded-xl shadow flex flex-col gap-8 bg-white ">
              <div>
                <h3>Profile Font</h3>
                <button
                  className="flex gap-4 shadow rounded-md border border-gray-200  w-full md:w-1/2 p-4 justify-middle align-middle hover:bg-gray-200"
                  onClick={() => setShowFontModal(true)}
                >
                  <div>
                    <span className="p-2 bg-white rounded-lg font-serif text-lg">
                      Aa
                    </span>
                  </div>
                  <div>
                    <span className={`text-lg font-${pageData.profile_font}`}>
                      {fontMapping[pageData.profile_font]}
                    </span>
                  </div>
                </button>
              </div>
              <div>
                <h3>Profile Font Color</h3>
                <button
                  className="mt-2 w-10 h-10 rounded-lg border-2"
                  style={{ backgroundColor: pageData.profile_font_color }}
                  onClick={() =>
                    setShowProfileFontColorPicker(
                      (showProfileFontColorPicker) =>
                        !showProfileFontColorPicker
                    )
                  }
                ></button>
                {showProfileFontColorPicker && (
                  <div
                    ref={profileFontColorPickerRef}
                    className="absolute z-10"
                  >
                    <ChromePicker
                      color={pageData.profile_font_color}
                      onChangeComplete={(newColor) =>
                        handleProfileFontColorChange(newColor.hex)
                      }
                    />
                  </div>
                )}
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
                          checked={
                            pageData.social_media_icons_location === "top"
                          }
                          onChange={handleLocationChange}
                        />
                        <label htmlFor="top" className="ml-4">
                          Top
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="bottom"
                          name="location"
                          value="bottom"
                          checked={
                            pageData.social_media_icons_location === "bottom"
                          }
                          onChange={handleLocationChange}
                        />
                        <label htmlFor="bottom" className="ml-4">
                          Bottom
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>

          {/* Conditionally render PhonePreview or button based on screen size */}
          <div className="hidden lg:block basis-1/4  ">
            <PhonePreview pageData={pageData} />
          </div>

          {/* Show Preview button for smaller screens */}
          {!isPhonePreviewVisible && (
            <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={() => setIsPhonePreviewVisible(true)}
              >
                Show Preview
              </button>
            </div>
          )}

          {/* Fullscreen Phone Preview for small screens */}
          {isPhonePreviewVisible && (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
              <PhonePreview pageData={pageData} />
              <button
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={() => setIsPhonePreviewVisible(false)}
              >
                Close Preview
              </button>
            </div>
          )}
        </div>
      </div>
      {showFontModal && (
        <FontModal
          closeFontModal={closeFontModal}
          onFontSelect={handleFontChange} // Pass the handler to the modal
        />
      )}
    </>
  );
}

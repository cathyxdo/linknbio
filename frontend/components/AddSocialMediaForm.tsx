import { FormEvent, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";

import { SocialMediaProfile } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth"; // Import Firebase auth
import { isValidUrl } from "@/utils/validation";

interface SocialMediaProps {
  id: number;
  addNewProfile: (newProfile: SocialMediaProfile) => void;
}

export default function AddSocialMediaForm({
  id,
  addNewProfile,
}: SocialMediaProps) {
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);

  const emptySocialMediaForm = {
    type: "instagram",
    link: "",
    list: id,
  };
  const [socialMediaForm, setSocialMediaForm] = useState(emptySocialMediaForm);
  const isUrlValid = isValidUrl(socialMediaForm.link);
  const [errorStatus, setErrorStatus] = useState(false);

  function closeSocialMediaForm() {
    setSocialMediaForm(emptySocialMediaForm);
    setShowSocialMediaForm(false);
    setErrorStatus(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSocialMediaForm({
      ...socialMediaForm,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }
      let updatedLink = socialMediaForm.link;
      if (!/^https?:\/\//i.test(updatedLink)) {
        updatedLink = `http://${updatedLink}`;
      }
  
      // Log the updated link before making the fetch request
      console.log(updatedLink);
  
      // Update the form state with the new link before making the request
      const updatedForm = { ...socialMediaForm, link: updatedLink };
  
      console.log(socialMediaForm);
      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/social-media-profiles/`,
        {
          method: "POST", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add your auth token here if needed
          },
          body: JSON.stringify(updatedForm),
        }
      );
      if (!response.ok) {
        console.log(response);
        setErrorStatus(true);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Social Media added successfully");

        const newSocialMedia: SocialMediaProfile = await response.json();
        addNewProfile(newSocialMedia);
        setSocialMediaForm(emptySocialMediaForm);
        setShowSocialMediaForm(false);
      }
    } catch (error) {
      console.error("Failed to add social media: ", error);
      setErrorStatus(true);
    }
  }

  return (
    <div className="mt-12">
      {!showSocialMediaForm ? (
        <button
          onClick={() => setShowSocialMediaForm(true)}
          className="mt-5 tracking-wide font-semibold bg-custom-blue-600 text-white w-full py-4 rounded-full hover:bg-custom-blue-700 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <AddIcon />
          <p>Add Socials</p>
        </button>
      ) : (
        <div className="relative p-6 mb-4 space-y-6 bg-white rounded-xl shadow-xl ">
          <button
            onClick={closeSocialMediaForm}
            className="absolute top-2 right-2 flex justify-center items-center hover:bg-stone-100  rounded-full w-10 h-10"
          >
            <CloseRoundedIcon className="" />
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            <label>Social Media App</label>
            <select
              name="type"
              value={socialMediaForm.type}
              onChange={(e) =>
                setSocialMediaForm({ ...socialMediaForm, type: e.target.value })
              }
              className="w-min py-2 px-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">X / Twitter</option>
              <option value="youtube">Youtube</option>
            </select>
            <label>Link</label>
            <input
              name="link"
              value={socialMediaForm.link}
              onChange={handleChange}
              className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
            ></input>
            {errorStatus && 
              <div className="text-red-500">Error: There was a problem adding Social Media</div>
            }
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isUrlValid}
                className="mt-5 tracking-wide font-semibold bg-custom-blue-600 text-white py-2.5 px-16 rounded-full hover:bg-custom-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-200 disabled:text-gray-400"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

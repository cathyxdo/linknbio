import { useState } from "react";
import Image from "next/image";
import ProfileImageModal from "./ProfileImageModal";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth";
import { responsiveFontSizes } from "@mui/material";

interface ProfileFormProps {
  id: number;
  user: number;
  username: string;
  name: string;
  bio: string;
  photo: string;
  profile_photo_url: string;
  updateProfile: (
    newName: string,
    newBio: string,
    newProfilePhotoUrl: string
  ) => void;
}

export default function EditProfileForm({
  id,
  user,
  username,
  name,
  bio,
  profile_photo_url,
  photo,
  updateProfile,
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: name ? name : "",
    bio: bio ? bio : "",
    profile_photo_url: profile_photo_url ? profile_photo_url : "",
  });
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  function closeProfileImageModal() {
    setShowProfileImageModal(false);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleProfileImageUpdate(newProfilePhotoUrl: string) {
    setFormData({ ...formData, profile_photo_url: newProfilePhotoUrl });
    updateProfile(formData.name, formData.bio,newProfilePhotoUrl);
  }

  async function handleProfileImageDelete() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + id + "/profile-image/delete/",
        {
          method: "DELETE", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Image deleted successfully");
        setFormData({ ...formData, profile_photo_url: '' });
        updateProfile(formData.name, formData.bio, '');
      }
    } catch (error) {
      console.error("error during delete", error);
    }
  }    

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/` + id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Profile updated successfully");
        updateProfile(formData.name, formData.bio, formData.profile_photo_url);
      }
    } catch (error) {
      console.error("Failed to update: ", error);
    }
  }

  return (
    <>
      <div className="">
        <div className="px-4 py-8 mb-4 space-y-6 bg-white border rounded-xl shadow ">
          <h3 className=" text-lg font-semibold">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="basis-3/4">
                <label>Url</label>
                <div className="mt-2 px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white">
                  <a
                    className="underline"
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_SHARE_URL}/share/${username}`}
                  >{`${process.env.NEXT_PUBLIC_SHARE_URL}/share/${username}`}</a>
                </div>
              </div>
              <div className="basis-1/4 flex flex-col items-center">
                {profile_photo_url ? (
                  <Image
                    src={profile_photo_url}
                    width={100}
                    height={100}
                    style={{ borderRadius: "50%" }}
                    alt={"profile-photo"}
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 bg-gray-700 text-white rounded-full text-2xl font-bold">
                    {username.charAt(0).toUpperCase()}{" "}
                    {/* Display the first letter of the username */}
                  </div>
                )}
                <button
                  className="text-sm rounded-full bg-blue-100 hover:bg-blue-300 px-5 py-2.5 text-center my-4"
                  onClick={() => setShowProfileImageModal(true)}
                >
                  Edit Profile Photo
                </button>
              </div>
            </div>

            <label>Name</label>
            <input
              value={formData.name}
              onChange={handleChange}
              onBlur={handleSubmit}
              name="name"
              className="px-2 py-2 rounded-lg font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
            ></input>

            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleSubmit}
              name="bio"
              className="px-2 py-2 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white resize-none"
            ></textarea>
            {/*                         <div className="flex justify-center">
                            <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/4 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Edit</button>
                        </div> */}
          </form>
        </div>
      </div>
      {showProfileImageModal && (
        <ProfileImageModal
          id={id}
          closeProfileImageModal={closeProfileImageModal}
          handleProfileImageUpdate={handleProfileImageUpdate}
          handleProfileImageDelete={handleProfileImageDelete}
        />
      )}
    </>
  );
}

import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Link } from "@/shared/interfaces";
import Image from "next/image";
import ImageModal2 from "./ImageModal2";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth";
interface LinkProps {
  id: number;
  title: string;
  link: string;
  link_photo_url: string;
  deleteLink: (id: number) => void;
  updateLink: (link: Link) => void;
  //openImageModal: (type: string, id: number) => void;
}
export default function LinkElement({
  id,
  title: initialTitle,
  link: initialLink,
  link_photo_url: initialPhotoUrl,
  deleteLink,
  updateLink,
  //openImageModal,
}: LinkProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMenu, setDeleteMenu] = useState<boolean>(false);
  const [imageMenu, setImageMenu] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [linkData, setLinkData] = useState({
    id: id,
    title: initialTitle,
    link: initialLink,
    link_photo_url: initialPhotoUrl,
  });
  function setNewLinkImageData(newPhotoUrl: string) {
    setLinkData({ ...linkData, link_photo_url: newPhotoUrl });
  }
  function closeImageModal() {
    setImageModal(false);
  }
  const toggleEditMode = (): void => {
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLinkData({
      ...linkData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleBlur() {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/links/` + id + "/",
        {
          method: "PATCH", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(linkData),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Link updated successfully");
        const updatedLink: Link = await response.json();
        updateLink(updatedLink);
        setEditMode(false);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  }

  async function handleDelete() {
    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/links/` + id + "/",
        {
          method: "DELETE", // or 'PUT' if you are replacing the entire resource
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error: ${response.status}`);
      } else {
        console.log("Link deleted successfully");
        deleteLink(id);
      }
    } catch (error) {
      console.error("error during login", error);
    }
  }

  async function handleImageDelete() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/delete-image/links/` + id + "/",
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
        const updatedLink: Link = await response.json();
        updateLink(updatedLink);
        setImageMenu(false);
        setLinkData({ ...linkData, link_photo_url: "" });
      }
    } catch (error) {
      console.error("error during login", error);
    }
  }
  return (
    <>
      <div className="shadow bg-white rounded-xl px-6 py-8 mb-4 relative">
        <button
          onClick={toggleEditMode}
          className="absolute top-2 right-2 hover:bg-stone-100 rounded-lg p-1"
        >
          <EditOutlinedIcon className="w-5 h-5 text-stone-500 " />{" "}
          {/* Replace with your actual edit icon */}
        </button>

        <div className="">
          {editMode ? (
            <>
              <input
                name="title"
                value={linkData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 rounded-lg block w-full mb-4"
              />
              <input
                name="link"
                value={linkData.link}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 rounded-lg block w-full mb-4"
              />
            </>
          ) : (
            <>
              <h3 className="p-1 font-semibold">{linkData.title}</h3>
              <p className="p-1 block max-w-xs truncate">{linkData.link}</p>
            </>
          )}
          <button
            className="p-1 hover:bg-stone-100 rounded-lg"
            onClick={() => {
              setImageMenu(!imageMenu); /*openImageModal("link", id)*/
            }}
          >
            <InsertPhotoOutlinedIcon />
          </button>
        </div>
        {!deleteMenu ? (
          <>
            <button
              onClick={() => setDeleteMenu(true)}
              className="absolute bottom-2 right-2 hover:bg-stone-100 rounded-lg p-1"
            >
              <DeleteOutlinedIcon className="w-5 h-5 text-stone-500 " />
            </button>
            {imageMenu && (
              <div className="">
                <h2 className="bg-slate-100 text-center">Thumbnail Image</h2>

                {linkData.link_photo_url ? (
                  <>
                    <div className="flex gap-4">
                      <Image
                        src={linkData.link_photo_url}
                        width={100}
                        height={100}
                        alt={linkData.title}
                        className="border-2"
                      />
                      <button
                        className="rounded-full bg-blue-100 hover:bg-blue-300 font-medium px-5 py-2.5 text-center my-4"
                        onClick={() => setImageModal(true)}
                      >
                        Update Thumbnail
                      </button>
                      <button
                        className="rounded-full bg-red-100 hover:bg-red-400 font-medium px-5 py-2.5 text-center my-4"
                        onClick={handleImageDelete}
                      >
                        Delete Thumbnail
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="rounded-full bg-blue-100 hover:bg-blue-300 font-medium px-5 py-2.5 text-center my-4"
                    onClick={() => setImageModal(true)}
                  >
                    Set Thumbnail
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-8">
            <h3>Delete this link? You will not be able to undo this action.</h3>
            <div className="flex">
              <button
                onClick={handleDelete}
                className="rounded-full bg-red-200 hover:bg-red-400 font-medium px-5 py-2.5 text-center mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteMenu(false)}
                className="rounded-full border font-medium px-5 py-2.5 text-center hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {imageModal && (
        <ImageModal2
          id={id}
          updateLink={updateLink}
          closeImageModal={closeImageModal}
          setNewLinkImageData={setNewLinkImageData}
        />
      )}
    </>
  );
}

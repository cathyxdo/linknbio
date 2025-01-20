import { FormEvent, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@/shared/interfaces";
import { auth } from "@/utils/firebase";
import { getIdToken } from "firebase/auth"; // Import Firebase auth
import { isValidUrl } from "@/utils/validation";

interface LinkProps {
  id: number;
  addNewLink: (newLink: Link) => void;
}

export default function AddLinkForm({ id, addNewLink }: LinkProps) {
  const [showLinkForm, setShowLinkForm] = useState(false);
  const emptyLinkForm = {
    link: "",
    title: "",
    list: id,
  };
  const [linkForm, setLinkForm] = useState(emptyLinkForm);
  const isUrlValid = isValidUrl(linkForm.link);
  const [errorStatus, setErrorStatus] = useState(false);

  function closeLinkForm() {
    setLinkForm(emptyLinkForm);
    setShowLinkForm(false);
    setErrorStatus(false);
  }

  
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLinkForm({
      ...linkForm,
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
      let updatedLink = linkForm.link;
      if (!/^https?:\/\//i.test(updatedLink)) {
        updatedLink = `http://${updatedLink}`;
      }
  
      // Log the updated link before making the fetch request
      console.log(updatedLink);
  
      // Update the form state with the new link before making the request
      const updatedForm = { ...linkForm, link: updatedLink };
  
      const token = await getIdToken(user); // Get Firebase auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/links/`,
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
        console.log("Link added successfully");

        const newLink: Link = await response.json();
        addNewLink(newLink);
        setLinkForm(emptyLinkForm);
        setShowLinkForm(false);
      }
    } catch (error) {
      console.error("Failed to add link: ", error);
      setErrorStatus(true);
    }
  }

  return (
    <div className="mt-12">
      {!showLinkForm ? (
        <button
          onClick={() => setShowLinkForm(true)}
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <AddIcon />
          <p>Add Link</p>
        </button>
      ) : (
        <div className="relative p-6 mb-4 space-y-6 bg-white rounded-xl shadow-xl ">
            <button
              onClick={closeLinkForm}
              className="absolute top-2 right-2 hover:bg-stone-100 flex items-center justify-center rounded-full w-10 h-10"
            >
              <CloseRoundedIcon className="" />
            </button>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label>Title</label>
            <input
              name="title"
              value={linkForm.title}
              onChange={handleChange}
              className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
            ></input>
            <label>URL</label>
            <input
              name="link"
              value={linkForm.link}
              onChange={handleChange}
              className="px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
            ></input>
            {errorStatus && 
              <div className="text-red-500">Error: There was a problem adding Social Media</div>
            }
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isUrlValid || !linkForm.title}
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/4 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-200 disabled:text-gray-400"
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

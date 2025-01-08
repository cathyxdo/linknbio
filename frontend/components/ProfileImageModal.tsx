import ProfileImageCropper from "./ProfileImageCropper";
interface ProfileImageProps {
  id: number;
  closeProfileImageModal: () => void;
  handleProfileImageUpdate: (newProfilePhotoUrl: string) => void;
  handleProfileImageDelete: () => void;

}

export default function ProfileImageModal({
  id,
  closeProfileImageModal,
  handleProfileImageUpdate,
  handleProfileImageDelete,
}: ProfileImageProps) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>
        <div className="relative bg-white rounded-lg p-8 ">
          <h3 className="text-lg font-semibold mb-6">Upload Profile Picture</h3>
          <ProfileImageCropper
            id={id}
            closeProfileImageModal={closeProfileImageModal}
            handleProfileImageUpdate={handleProfileImageUpdate}
            handleProfileImageDelete={handleProfileImageDelete}
          />
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 hover:bg-stone-200 p-2 rounded-full"
            onClick={closeProfileImageModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

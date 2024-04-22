interface FontModalProps {
    closeFontModal: () => void,
}
export default function FontModal({closeFontModal}: FontModalProps) {
    return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75">
                </div>
            </div>
            <div className="relative bg-white rounded-lg p-8 md:max-h-[672px] md:max-w-[512px] h-[80vh] w-full">
                <h3 className="font-semibold">Select Font</h3>
                <ul className="flex flex-col mt-4">
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-serif">Times New Roman</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full">Roboto</button>
                    </li>
                </ul>
                <button className="text-md mt-4 rounded-full bg-blue-100 hover:bg-blue-300 px-5 py-2.5 text-center w-full">Save</button>
                <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 hover:bg-stone-100 p-2 rounded-full "
                    onClick={closeFontModal}
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
    )
}
interface FontModalProps {
    closeFontModal: () => void,
    onFontSelect: (font: string) => void;

}
export default function FontModal({closeFontModal, onFontSelect}: FontModalProps) {
    return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75">
                </div>
            </div>
            <div className="relative bg-white rounded-lg p-8 md:max-h-[672px] md:max-w-[512px] h-[80vh] w-full">
                <h3 className="font-semibold">Select Font</h3>
                <ul className="flex flex-col mt-4 overflow-auto max-h-[60vh]">
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-bebas-neue" onClick={() => onFontSelect("bebas-neue")}>Bebas Neue</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-bitter" onClick={() => onFontSelect("bitter")}>Bitter</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-courier-new" onClick={() => onFontSelect("courier-new")}>Courier New</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-fredoka-one" onClick={() => onFontSelect("fredoka-one")}>Fredoka One</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-gothic-a1" onClick={() => onFontSelect("gothic-a1")}>Gothic A1</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-inter" onClick={() => onFontSelect("inter")}>Inter</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-libre-baskerville" onClick={() => onFontSelect("libre-baskerville")}>Libre Baskerville</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-merriweather" onClick={() => onFontSelect("merriweather")}>Merriweather</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-montserrat" onClick={() => onFontSelect("montserrat")}>Montserrat</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-oswald" onClick={() => onFontSelect("oswald")}>Oswald</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-open-sans" onClick={() => onFontSelect("open-sans")}>Open Sans</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-pacifico" onClick={() => onFontSelect("pacifico")}>Pacifico</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-poppins" onClick={() => onFontSelect("poppins")}>Poppins</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-quicksand" onClick={() => onFontSelect("quicksand")}>Quicksand</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-roboto" onClick={() => onFontSelect("roboto")}>Roboto</button>
                    </li>
                    <li>
                        <button className="hover:bg-stone-100 w-full p-2 rounded-full font-times" onClick={() => onFontSelect("times")}>Times New Roman</button>
                    </li>
                </ul>
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
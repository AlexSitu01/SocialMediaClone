import { useEffect } from "react";
import { CarouselProps } from "./ProfileSetupCarousel";

interface ProfilePicProps extends CarouselProps {
    fileName: string
    setFileName: React.Dispatch<React.SetStateAction<string>>
    imageFile: string
    setImageFile: React.Dispatch<React.SetStateAction<string>>
}
export function ProfilePicQuestionare({ handleNext, handlePrev, setImageFile, imageFile, fileName, setFileName }: ProfilePicProps) {

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name); // 
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImageFile(base64String);
                console.log("Base64 string:", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-screen h-screen">
                <div className="flex flex-col justify-center items-center space-y-2 w-[40%] h-[80%] bg-gradient-to-tr from-indigo-200 to-red-200 rounded-3xl">
                    <div className="text-lg p-2">
                        <div>Optional: upload a profile picture</div>
                    </div>

                    {imageFile && (
                        <img className="flex flex-col w-[320px] h-[320px] rounded-full" src={imageFile}></img>
                    )}

                    <input id="file-upload" type="file" className="hidden" onChange={handleImageInput} accept="image/*" />
                    <label htmlFor="file-upload" className="cursor-pointer px-4 my-3 bg-blue-200 flex items-center h-12 rounded-2xl">
                        {imageFile ? "Change Image" : "Upload Image"}
                    </label>


                    <div className="flex space-x-3 p-4">
                        {/* prev */}
                        <button className="cursor-pointer space-x-2 p-2 rounded-sm bg-blue-500 text-white" onClick={handlePrev} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        {/* next */}
                        <button className="cursor-pointer space-x-2 p-2 rounded-sm bg-blue-500 text-white" onClick={handleNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
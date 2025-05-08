import { useEffect } from "react";
import { CarouselProps } from "./ProfileSetupCarousel";
interface BioProps extends CarouselProps {
    bio: string,
    setBio: React.Dispatch<React.SetStateAction<string>>
}
export function BioQuestionare({ handleNext, handlePrev, bio, setBio }: BioProps) {

    return (

    <div>
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center space-y-4 w-[40%] h-[80%] bg-gradient-to-tr from-indigo-200 to-red-200 rounded-3xl p-4">
                <div className="text-lg">
                    Optional: Enter a bio for your profile
                </div>
                <div className="flex justify-center w-full">
                    <textarea
                        className="w-[80%] h-48 p-3 text-lg border-2 rounded-lg outline-none resize-none"
                        placeholder="Write something about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3">
                    <button
                        className="cursor-pointer p-2 rounded-sm bg-blue-500 text-white"
                        onClick={handlePrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <button
                        className="cursor-pointer p-2 rounded-sm bg-blue-500 text-white"
                        onClick={handleNext}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

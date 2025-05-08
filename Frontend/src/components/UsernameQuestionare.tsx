import { CarouselProps } from "./ProfileSetupCarousel";

interface UsernameQuestionareProps extends CarouselProps {
    userNameErorr: string | undefined
    userName: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

export function UsernameQuestionare({ handleNext, handlePrev, userNameErorr, userName, setUsername }: UsernameQuestionareProps) {
    return (
        <div>
            <div className="flex flex-col justify-center items-center w-screen h-screen">
                <div className="flex flex-col justify-center items-center space-y-2 w-[40%] h-[80%] bg-gradient-to-tr from-indigo-200 to-red-200 rounded-3xl">
                    <div className="flex text-lg p-2">
                        <div>Please enter a Username</div>
                    </div>
                    <div className="flex text-lg border-2 space-x-2 p-2 rounded-sm">
                        <input type="text" className="outline-0" value={userName} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    {userNameErorr === "EMPTY" ? <div className="text-red-500">You must enter a username</div> : ""}
                    <div className="flex space-x-3 p-4">
                        <button className="cursor-pointer space-x-2 p-2 rounded-sm bg-blue-500 text-white" onClick={handlePrev} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
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
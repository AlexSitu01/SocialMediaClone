import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PostInformation, timeDifference } from "./Post";
import { useState } from "react";



interface CommentsDialogProps {
    isCommentsOpen: boolean
    setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>
    postInfo: PostInformation
}
export function CommentsDialog({ isCommentsOpen, setIsCommentsOpen, postInfo }: CommentsDialogProps) {

    const [likeButtonColor, setLikeButtonColor] = useState("white")

    return (
        <Dialog open={isCommentsOpen} as="div" className="relative z-2" onClose={() => setIsCommentsOpen(false)}>
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Centered Dialog */}
            <div className="fixed inset-0 flex items-center justify-center p-4">

                <DialogPanel className="rounded-sm bg-white shadow-lg flex">
                    {/* Post Picture */}
                    {/* The aspect ratio of images should be 4:5 but if the image isn't the right aspect, then the image should be cropped */}
                    <img src={postInfo.pic} alt="" className="w-[33.6rem] h-[42rem]" />

                    {/* vertical line */}
                    <div className="border-r-[1px] border-gray-200"></div>

                    {/* Right side of Image */}
                    <div className="flex flex-col w-[27.5rem]">
                        {/* Name Card */}
                        <div className="flex items-center mb-2 space-x-3 p-3 border-b-1 border-gray-200">
                            {/* profile picture */}
                            <div className=""><img className="w-[2.2rem] h-[2.2rem] rounded-full object-cover" src={postInfo.author.pic} alt="" /></div>

                            {/* author name */}
                            <div className="text-lg font-bold">{postInfo.author.name}</div>
                            <div>•</div>
                            <div className="text-blue-400 cursor-pointer">Follow</div>
                        </div>

                        {/* Comments */}
                        <div className="h-[73%] pl-3 border-b-1 border-gray-200">filler</div>

                        {/* Like, Comment, Share */}
                        <div>
                            <div className="flex space-x-2 w-full my-3 pl-3">
                                {/* heart */}
                                <button className={"cursor-pointer"} onClick={() => setLikeButtonColor(likeButtonColor === "white" ? "red" : "white")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={likeButtonColor} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>

                                {/* comment */}
                                <button className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>
                                </button>


                                {/* share */}
                                <button className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>

                                </button>
                            </div>
                            {/* like count */}
                            <div className="mb-1 font-bold pl-3 text-[.9rem]">{likeButtonColor === "white" ? postInfo.numLikes : postInfo.numLikes + 1} likes</div>
                            <div className="pl-3 text-[.9rem] text-gray-500 border-b-1 border-gray-200">{timeDifference(postInfo.timeOfPost)}</div>

                            {/* Input comment field */}
                            <form className="m-3 flex justify-between items-center">
                                <div className="flex items-center">
                                    <button className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                        </svg>
                                    </button>
                                    <input type="text" className="ml-2" placeholder="Add a comment..." />
                                </div>
                                <button className={"cursor-pointer m-3 text-blue-300"}>Post</button>
                            </form>

                        </div>

                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

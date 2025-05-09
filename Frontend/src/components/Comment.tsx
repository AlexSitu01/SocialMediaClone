import { useState } from "react"
import { timeDifference, User } from "./Post"

export interface CommentInfo {
    id: number
    author: User
    content: string
    timeOfComment: number
    likeCount: number
    replys?: Comment[]
    // is the comment a description
    isDescription?: boolean
}

export default function Comment({ id, author, content, timeOfComment, likeCount, replys, isDescription = false}: CommentInfo) {

    const [likeButtonColor, setLikeButtonColor] = useState("white")

    return <>
        <div className="flex mb-4">
            <div className="w-[25%]">
                <img className="w-[2.2rem] h-[2.2rem] rounded-full object-cover" src={author.pfp} alt="" />
            </div>
            <div className="w-auto">

                <div>{author.userName}</div>

                <div>{content}</div>

                {/* Time, Likes, Reply */}
                <div className="flex space-x-3 text-gray-500 text-xs mt-1">
                    {/* Time of post */}
                    <div>{timeDifference(timeOfComment)}</div>

                    {!isDescription && (
                        <>
                            {/* Like count */}
                            <div>{likeButtonColor === "white" ? likeCount : likeCount + 1} {likeCount > 1 ? "likes" : "like"}</div>
                            {/* Reply Button */}
                            <button className="cursor-pointer">Reply</button>
                        </>
                    )}
                </div>
            </div>
            {/* heart */}
            <button className="flex cursor-pointer mt-[.4rem]" onClick={() => setLikeButtonColor(likeButtonColor === "white" ? "red" : "white")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={likeButtonColor} viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-3.5">
                    <path stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </button>
        </div>


    </>
}
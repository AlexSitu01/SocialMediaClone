import { useState } from "react"
import { CommentsDialog } from "./CommentsDialog"

export class User {
    id: number
    name: string
    bio: string
    pic: string
    constructor(id: number, name: string, bio: string, pic: string){
        this.id = id
        this.name = name
        this.bio = bio
        this.pic = pic
    }
}

interface PostProps {
    id: number
    author: User
    desc: string
    pic: string
    numLikes: number
    timeOfPost: number
    comments: Comment[]
}
export class PostInfo implements PostProps{
    id: number
    author: User
    desc: string
    pic: string
    numLikes: number
    timeOfPost: number
    comments: Comment[]

    constructor(id: number, author: User, desc: string, pic: string, numLikes = 0, timeOfPost: number, comments: Comment[] = []) {
        this.id = id;
        this.author = author;
        this.desc = desc;
        this.pic = pic;
        this.numLikes = numLikes;
        this.timeOfPost = timeOfPost;
        this.comments = comments;
    }
}


export default function Post({id, author, desc, pic, numLikes = 0, timeOfPost, comments}: PostProps) {
    
    const postInfo = new PostInfo(id, author, desc, pic, numLikes, timeOfPost, comments)

    const [likeButtonColor, setLikeButtonColor] = useState("white")
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)

    return <>
        <div className="flex flex-col w-[25rem] w-max[31.25rem]">
           
            <div className="flex items-center mb-2 space-x-3">
                {/* profile picture */}
                <div className=""><img className="w-[2.2rem] h-[2.2rem] rounded-full object-cover" src={author.pic} alt="" /></div>

                {/* author name */}
                <div className="text-lg font-bold">{author.name}</div>
                {/* Time of post */}
                <div className="">{timeDifference(timeOfPost)}</div>
            </div>

            {/* picture */}
            <div className="flex justify-center"><img className="rounded-sm" src={pic} alt="" /></div>

            <div className="flex space-x-2 w-full my-3">
                {/* heart */}
                <button className={"cursor-pointer"} onClick={() => setLikeButtonColor(likeButtonColor === "white" ? "red" : "white")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={likeButtonColor} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>

                {/* comment */}
                <button className="cursor-pointer" onClick={() => setIsCommentsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                </button>
                <CommentsDialog isCommentsOpen={isCommentsOpen} setIsCommentsOpen={setIsCommentsOpen} postInfo={postInfo}></CommentsDialog >
                
                {/* share */}
                <button className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>

                </button>
            </div>
            {/* like count */}
            <div className="mb-1 font-bold text-[1rem]">{likeButtonColor === "white" ? numLikes: numLikes+1} likes</div>

            <div className="">{desc}</div>
            <hr className="border-gray-400 h-1 my-3"/>

        </div>
    </>
}

export function timeDifference(ms: number) {
    const now = Date.now();
    const diff = now - ms; // Difference in milliseconds
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
}

import { useEffect, useState, cache } from "react";
import { Navbar } from "../components/Navbar";
import { User as myUser } from "../components/Post";
import { getUserInfo } from "../lib/firebase/database";


export function Profile() {
    const [userData, setUserData] = useState<myUser | undefined>()
    useEffect(() => {
        async function fetchUser() {
            const data = await getUserInfo()
            if (data) {
                setUserData(data)
            }
        }
        fetchUser()
    }, [])
    return (
        <div className="p-4">
            <Navbar></Navbar>
            <div className="text-black flex flex-col justify-center items-center py-4">
                <div className="flex space-x-20 items-center">
                    <img src={userData?.pfp} className="rounded-full w-40 h-40" alt="" />
                    <div className="flex flex-col">
                        {/* Username, Follow, Message, Add */}
                        <div className="flex space-x-4 items-center font-semibold text-xl pb-4">
                            <div className="">{userData?.userName}</div>
                            <button className="font-bold cursor-pointer text-base bg-gray-200 rounded-md py-1 px-3">Edit profile</button>
                            <button className="font-bold cursor-pointer text-base bg-gray-200 rounded-md py-1 px-3">View archive</button>
                            <button className="cursor-pointer"><svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></button>
                        </div>
                        {/* Post, followers, following */}
                        <div className="flex space-x-8 pb-2">
                            <div className="text-gray-500 flex space-x-2">
                                <div className="text-black font-bold">52</div>
                                <div>Posts</div>
                            </div>
                            <div className="text-gray-500 flex space-x-2">
                                <div className="text-black font-bold">1232</div>
                                <div>Followers</div>
                            </div>
                            <div className="text-gray-500 flex space-x-2">
                                <div className="text-black font-bold">722</div>
                                <div>Following</div>
                            </div>
                        </div>
                        {/* Name, Title, Desc */}
                        <div>
                            <div className="font-bold">{userData?.userName}</div>
                            <div className="text-gray-500">Title/Occupation</div>
                            <div className="w-80">Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat qui saepe, error nemo aspernatur totam quae nisi cum mollitia quibusdam explicabo tempore, quis, ipsam molestiae ad magni iste vitae est?</div>
                            <div className="pt-5 text-xs">Followed By </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
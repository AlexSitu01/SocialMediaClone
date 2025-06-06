import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import Post, { PostInfo, User } from "../components/Post";
import { waitForFirebaseAuth } from "../lib/firebase/authHelpers";
import { getLikeCount, getUserInfo } from "../lib/firebase/database";
import { CommentInfo } from "../components/Comment";
import { collection, doc, getDoc, getDocFromServer, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { db, storage } from "../lib/firebase/firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export function Feed() {
    const [loading, setLoading] = useState<boolean>(false)
    const [posts, setPost] = useState<PostInfo[]>([])
    const [error, setError] = useState<"Error" | undefined>()
    const [lastPost, setLastPost] = useState<QueryDocumentSnapshot>()
    const [hasMore, setHasMore] = useState<boolean>(true)
    const postRef = collection(db, "posts")
    const order = orderBy("createdAt")


    const fetchData = async (paginate: boolean) => {
        if (loading || !hasMore) {
            return
        }
        setLoading(true);
        try {
            const q = lastPost
                ? query(postRef, order, startAfter(lastPost), limit(10))
                : query(postRef, order, limit(10))

            const snap = await getDocs(q);
            const lastDoc = snap.docs[snap.docs.length - 1]


            const newPosts: PostInfo[] = [];
            for (const docSnap of snap.docs) {
                const postData = docSnap.data()
                const userRef = doc(db, "users", postData.authorID)
                
                const userSnap = await getDoc(userRef)


                // skip posts without authors
                if (!userSnap.exists()) {
                    continue
                }

                const userData = userSnap.data() as User
                const {count, liked} = await getLikeCount(postData.postID) ?? { count: 0, liked: false };
                

                const post: PostInfo = {
                    id: postData.postID,
                    pic: postData.pic,
                    desc: postData.desc,
                    numLikes: count,
                    timeOfPost: postData.createdAt,
                    comments: postData.comments || [],
                    author: userData,
                    liked: liked
                };

                newPosts.push(post);

            }

            if (newPosts.length > 0) {
                if (paginate) {
                    setPost((prev) => [...prev, ...newPosts])
                } else {
                    setPost(newPosts)
                }
                setLastPost(lastDoc)

            }

            if (newPosts.length < 10) {
                setHasMore(false)
            }
        }
        catch (err) {
            console.log("Error fetching posts")

        }
        finally {
            setLoading(false)
        }

    }
    // fetchData()
    useEffect(() => {
        fetchData(false);
    }, []);
    // get first group of data
 
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !loading
            ) {
                fetchData(true);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [loading, lastPost, hasMore]);

    return (
        <div className="p-4">

            <Navbar></Navbar>

            <div className="flex flex-col size-full items-center my-4'">
                {posts.map((post) => (
                   
                    <Post
                        key={post.id}
                        id={post.id} 
                        author={post.author}
                        pic={post.pic}
                        desc={post.desc}
                        numLikes={post.numLikes}
                        timeOfPost={-post.timeOfPost}
                        comments={post.comments}
                        liked = {post.liked}
                    ></Post>
                    
                ))}
                {loading && <p>Loading...</p>}
                {!hasMore && <p>No more posts</p>}
            </div>


        </div>
    )



}
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Post, { PostInfo, User } from "../components/Post";
import { waitForFirebaseAuth } from "../lib/firebase/authHelpers";
import { getUserInfo } from "../lib/firebase/database";
import { CommentInfo } from "../components/Comment";
import { collection, doc, getDoc, getDocFromServer, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { db, storage } from "../lib/firebase/firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export function Feed() {
    const [loading, setLoading] = useState<boolean>()
    const [posts, setPost] = useState<PostInfo[]>([])
    const [error, setError] = useState<"Error" | undefined>()
    const [lastPost, setLastPost] = useState<QueryDocumentSnapshot>()
    const [hasMore, setHasMore] = useState<boolean>(true)
    const postRef = collection(db, "posts")
    const order = orderBy("createdAt")


    const fetchData = async () => {
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

                // Fetch image URL from Firebase Storage
                const imageRef = ref(storage, `posts/${postData.postID}`); // assuming .jpg or .png depending on upload
                let imageUrl = "";
                try {
                    imageUrl = await getDownloadURL(imageRef);
                } catch (error) {
                    console.warn(`Image not found for post ${postData.postID}`, error);
                    imageUrl = ""; // fallback or broken image
                }


                const post: PostInfo = {
                    id: postData.postID,
                    pic: imageUrl,
                    desc: postData.desc,
                    numLikes: postData.numLikes,
                    timeOfPost: postData.createdAt,
                    comments: postData.comments || [],
                    author: userData,
                };

                newPosts.push(post);

            }

            if (newPosts.length > 0) {
                setPost((prev) => [...prev, ...newPosts])
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
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !loading
            ) {
                fetchData();
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, lastPost, hasMore]);

    return (
        <div className="p-4">

            <Navbar></Navbar>

            <div className="flex flex-col size-full items-center my-4'">
                {posts.map((post, index) => (
                    <Post
                        key={post.id || index}
                        id={post.id || index}
                        author={post.author}
                        pic={post.pic}
                        desc={post.desc}
                        numLikes={post.numLikes}
                        timeOfPost={post.timeOfPost}
                        comments={post.comments}
                    ></Post>
                ))}
                {loading && <p>Loading...</p>}
                {!hasMore && <p>No more posts</p>}
            </div>


        </div>
    )



}
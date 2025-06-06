import { waitForFirebaseAuth } from "./authHelpers";
import { User as myUser } from "../../components/Post";
import axios from "axios";

export const addUser = async () => {
  const user = await waitForFirebaseAuth();
  if (!user) return;

  let token = await user.getIdToken();

  const result = await axios.post(
    "http://localhost:3000/api/addUser",
    {
      email: user?.email,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (result.status != 200) {
    throw Error;
  }
};

export async function addProfileSetup(userName: string, pfp: string, bio: string) {
  try {
    const user = await waitForFirebaseAuth()
    if (user) {
      let token = await user.getIdToken();
      const data = {
        userName: userName,
        pfp: pfp,
        bio: bio
      }
      await axios.post("http://localhost:3000/api/addProfile", data, {headers:{Authorization: "Bearer "+ token}})
    }
    else {
      console.log("How did you get here you must first be logged in")
    }
  }
  catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
}

export async function getUserInfo(): Promise<myUser| undefined>{
  const user = await waitForFirebaseAuth();
  const token = await user?.getIdToken()
  if(user){
    const result = await axios.get("http://localhost:3000/api/getUser", {headers: {Authorization: 'Bearer '+ token}});
    return result.data as myUser
  }
}

export async function createPost(imageFile: Blob, desc: string){
  const user = await waitForFirebaseAuth()
  const token = await user?.getIdToken()
  const formData = new FormData();
  formData.append('image', imageFile)
  formData.append('desc', desc)

  if (user){
     await axios.post("http://localhost:3000/api/createPost", formData, {headers:{Authorization: 'Bearer '+ token}})
  }

}

export async function addLike(postID:string){
  const user = await waitForFirebaseAuth()
  const token = await user?.getIdToken()
  if(user){
    await axios.post("http://localhost:3000/api/addLike", {postID: postID}, {headers:{Authorization: 'Bearer '+ token}})
  }
}
export async function getLikeCount(postID:string): Promise<{count: number, liked: boolean}|undefined>{
  const user = await waitForFirebaseAuth();
  const token = await user?.getIdToken()
  if(user){
    const res = await axios.get("http://localhost:3000/api/getLikeCount", {headers:{Authorization: 'Bearer '+ token}, params:{postID}} )
    let liked = false
    if (res.data.liked){
      (liked = true)
    }
    return {count: res.data.count, liked: liked }
  }
}

export async function removeLike(postID:string){
  const user = await waitForFirebaseAuth()
  const token = await user?.getIdToken()
  
  if(user){
    await axios.delete("http://localhost:3000/api/removeLike", {headers:{Authorization: 'Bearer '+ token}, params:{postID}})
  }
}
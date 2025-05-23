import { collection, doc, setDoc, where, query, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase"
import { getAuth, User } from "firebase/auth";
import { waitForFirebaseAuth } from "./authHelpers";
import { User as myUser } from "../../components/Post";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";



// export const addUser = async () => {
//   try {
//     const user = await waitForFirebaseAuth()
//     if (user) {
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         createdAt: new Date()
//       });
//       console.log("User added to Firestore");
//     }
//   } catch (error) {
//     console.error("Error adding user to Firestore:", error);
//   }
// };

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

// export async function getUserInfo(): Promise<myUser | undefined> {
//   const user = await waitForFirebaseAuth()
//   if (user) {
//     const userDocRef = doc(db, "users", user.uid);
//     const userDoc = await getDoc(userDocRef);

//     if (userDoc.exists()) {
//       return userDoc.data() as myUser;
//     }
//   }
// }

export async function getUserInfo(): Promise<myUser| undefined>{
  const user = await waitForFirebaseAuth();
  let token = await user?.getIdToken()
  console.log(token)
  if(user){
    let result = await axios.get("http://localhost:3000/api/getUser", {headers: {Authorization: 'Bearer '+ token}});
    return result.data as myUser
  }
}
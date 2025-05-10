import { collection, doc, setDoc, where, query, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase"
import { getAuth } from "firebase/auth";
import { waitForFirebaseAuth } from "./authHelpers";
import { User as myUser } from "../../components/Post";



export const addUser = async () => {
  try {
    const user = await waitForFirebaseAuth()
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date()
      });
      console.log("User added to Firestore");
    }
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

export async function addProfileSetup(userName: string, pfp: string, bio: string) {
  try {
    const user = await waitForFirebaseAuth()
    if (user) {
      const data = {
        userName: userName,
        pfp: pfp,
        bio: bio
      }
      await setDoc(doc(db, "users", user.uid), data, { merge: true })
    }
    else {
      console.log("How did you get here you must first be logged in")
    }
  }
  catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
}

export async function getUserInfo(): Promise<myUser| undefined> {
  const user = await waitForFirebaseAuth()
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as myUser;
    }
  }
}

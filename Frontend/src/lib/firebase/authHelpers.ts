import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { db } from "./firebase";
import { User as myUser} from "../../components/Post";
import { addUser } from "./database";


export function waitForFirebaseAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      unsubscribe(); // cleanup listener
      resolve(user);
    });
  });
}

export async function requireAuth() {
  const user = await waitForFirebaseAuth();

  if (!user) {
    throw redirect("/login");
  }
  
}

export async function redirectIfLoggedIn() {
  const user = await waitForFirebaseAuth();

  if (user) {
    throw redirect("/feed"); // or wherever you want to send them
  }

  return null;
}

// redirects user to setup page if thier account hasn't been setup yet
// also checks if the user is authenticated
export async function redirectIfNeedSetup(){
  const user = await waitForFirebaseAuth();

  if (!user) {
    throw redirect("/login");
  }
  
  if (user) {
    const userDocRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const userInfo = userDoc.data() as myUser
      if(!userInfo.userName){
        throw redirect("/setup")
      }
    }
    // first time logging in with google
    else{
      // add user file to db
      addUser()
      throw redirect("/setup")
    }
  }
  return null
}
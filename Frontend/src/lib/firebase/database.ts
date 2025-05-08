import {  doc, getFirestore, setDoc } from "firebase/firestore";
import {db} from "./firebase"
import { getAuth, User } from "firebase/auth";
import { waitForFirebaseAuth } from "./authHelpers";



export const addUser = async (user: User) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            createdAt: new Date()
        });
        console.log("User added to Firestore");
      } catch (error) {
        console.error("Error adding user to Firestore:", error);
      }
};
export async function addProfileSetup(userName: string, pfp: string, bio:string){
    try{
        const user = await waitForFirebaseAuth()
        if(user){
            const data = {
                userName: userName,
                pfp: pfp,
                bio: bio
            }
            await setDoc(doc(db, "users", user.uid), data, {merge: true} )
        }
        else{
            console.log("How did you get here you must first be logged in")
        }
    }
    catch (error){
        console.error("Error adding user to Firestore:", error);
    }
}
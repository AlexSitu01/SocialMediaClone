import {  doc, getFirestore, setDoc } from "firebase/firestore";
import {db} from "./firebase"
import { User } from "firebase/auth";



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
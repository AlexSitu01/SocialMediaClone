import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase"


export async function addUser(email: string, UID: string) {
    try {
        const docRef = await addDoc(collection(db, "users"),
            {
                email: email,
                UID: UID,
                createdAt: new Date()
            })
    }
    catch (e){
        console.log("Error adding document: ", e)
    }
}
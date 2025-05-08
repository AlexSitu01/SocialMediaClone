import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { redirect } from "react-router-dom";

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

  return user;
}

export async function redirectIfLoggedIn() {
  const user = await waitForFirebaseAuth();

  if (user) {
    throw redirect("/feed"); // or wherever you want to send them
  }

  return null;
}

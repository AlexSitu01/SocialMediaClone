import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../lib/firebase/database";
import { onAuthStateChanged, getAuth, User as FirebaseUser } from "firebase/auth";
import { User } from "../components/Post";

type UserContextType = {
  userData: User | undefined;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  userData: undefined,
  firebaseUser: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const data = await getUserInfo();
        setUserData(data);
      } else {
        setUserData(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, firebaseUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

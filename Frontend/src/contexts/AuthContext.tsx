import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import "../lib/firebase/firebase"


const auth = getAuth();

export interface AuthContextType {
    currentUser: User | null;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    userLoggedIn: boolean;
    loading: boolean;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, []);


    const value = {
        currentUser,
        userLoggedIn,
        loading,
        logout,
        login,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    )
}
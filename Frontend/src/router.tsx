import {createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./routes/Login";
import { Feed } from "./routes/Feed";
import { Register } from "./routes/Register";
import {getAuth} from "firebase/auth"

import { requireAuth, redirectIfLoggedIn } from "./lib/firebase/authHelpers";
import { ProfileSetUp } from "./routes/ProfileSetUp";

const router = createBrowserRouter([
    {
        path: "/", element:<Feed></Feed>, loader: requireAuth
    },
    {
        path: "/login", element:<Login></Login>, loader: redirectIfLoggedIn
    },

    {
        path: "/feed", element: <Feed></Feed>, loader: requireAuth
    },
    {
        path: "/register", element: <Register></Register>, loader: redirectIfLoggedIn
    },
    {
        path: "/setup", element: <ProfileSetUp></ProfileSetUp>
    }


]);

export function Router(){
    return <RouterProvider router={router}></RouterProvider>;
}

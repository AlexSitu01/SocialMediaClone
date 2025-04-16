import {createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./routes/Login";
import { Feed } from "./routes/Feed";
import { Register } from "./routes/Register";
const router = createBrowserRouter([
    {
        path: "/", element:<Login></Login>
    },
    {
        path: "/login", element:<Login></Login>
    },

    {
        path: "/feed", element: <Feed></Feed>
    },
    {
        path: "/register", element: <Register></Register>
    },


]);

export function Router(){
    return <RouterProvider router={router}></RouterProvider>;
}

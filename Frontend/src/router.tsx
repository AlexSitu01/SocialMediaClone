import {createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./routes/Login";
import { Feed } from "./routes/Feed";
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

]);

export function Router(){
    return <RouterProvider router={router}></RouterProvider>;
}

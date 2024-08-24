import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/private/Dashboard";
import Settings from "./pages/private/Settings";
import LayoutPrivate from "./pages/private/LayoutPrivate";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login/index";

export const routes = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path:"/",
                element:<Home />
            }
        ]
    },
    {
        element:<LayoutPrivate />,
        children:[
            {
                path:"/app",
                element:<Dashboard />,
            },
            {
                path:"/app/settings",
                element:<Settings />,
            },
        ]
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"*",
        element:
        <div className="flex h-screen w-full justify-center items-center bg-slate-800">
            <span className="text-white font-thin text-4xl"><span className="font-bold">404</span> | Página não encontrada.</span>
        </div>
    }
])
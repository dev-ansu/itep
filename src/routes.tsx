import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/private/Dashboard";
import Settings from "./pages/private/Settings";
import LayoutPrivate from "./pages/private/LayoutPrivate";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login/index";
import SiteSettings from "./pages/private/Settings/SiteSettings";
import { combinedLoadSite, loadSiteData } from "./loaders/siteLoader";
import Cursos from "./pages/private/Cursos";
import Curso from "./pages/private/Curso";
import ListaCursos from "./pages/private/ListaCursos";
import CursoInfo from "./pages/public/CursoInfo";

export const routes = createBrowserRouter([
    {
        element: <Layout />,
        loader: combinedLoadSite,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/cursos",
                element:<ListaCursos to="/curso/" />
            },
            {
                path:"/curso/:id",
                element:<CursoInfo />
            },
        ]
    },
    {
        element:<LayoutPrivate />,
        loader: loadSiteData,
        children:[
            {
                path:"/app",
                element:<Dashboard />,
            },
            {
                path:"/app/cursos",
                element:<ListaCursos />,
            },
            {
                path:"/app/settings",
                element:<Settings />,
            },
            {
                path:"/app/settings/site",
                element: <SiteSettings />
            },
            {
                path:"/app/settings/cursos",
                element: <Cursos />
            },
            {
                path:"/app/curso/:id",
                element: <Curso />
            }
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
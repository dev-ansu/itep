import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/public/Home";

export const routes = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path:"/",
                element:<Home />
            }
        ]
    }
])
import { Outlet } from "react-router-dom"
import TopHeader from "../../components/TopHeader";
import Navigation from "../../components/Navigation";
import BottomFooter from "../../components/BottomFooter";
import { SiteProvider } from "../../contexts/SiteContext";

const Layout = ()=>{
    return(
        <SiteProvider>
            <TopHeader />
            <Navigation />
            <Outlet />
            <BottomFooter />
        </SiteProvider>
    )
}

export default Layout;
import { Outlet } from "react-router-dom"
import TopHeader from "../../components/TopHeader";
import Navigation from "../../components/Navigation";
import BottomFooter from "../../components/BottomFooter";

const Layout = ()=>{
    return(
        <>
            <TopHeader />
            <Navigation />
            <Outlet />
            <BottomFooter />
        </>
    )
}

export default Layout;
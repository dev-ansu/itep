import { Outlet } from "react-router-dom"
import Container from "../../../components/Container/index";
import Header from "../../../components/Private/Header";
import Private from "../../../routes/Private";
import { AuthProvider } from "../../../contexts/AuthContext";

const LayoutPrivate = ()=>{
    return(
        <AuthProvider>
            <Private>
                <Container>
                        <Header />
                        <Outlet />
                </Container>
            </Private>
        </AuthProvider>
    )
}

export default LayoutPrivate;
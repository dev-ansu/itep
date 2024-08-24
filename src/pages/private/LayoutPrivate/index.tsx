import { Outlet } from "react-router-dom"
import Container from "../../../components/Container/index";
import Header from "../../../components/Private/Header";
import Private from "../../../routes/Private";

const LayoutPrivate = ()=>{
    return(
        <Private>
            <Container>
                    <Header />
                    <Outlet />
            </Container>
        </Private>
    )
}

export default LayoutPrivate;
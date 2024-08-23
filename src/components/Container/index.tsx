import { ReactNode } from "react"

interface ContainerProps{
    children?: ReactNode;
}

const Container = ({children}: ContainerProps)=>{
    return(
        <div className="w-full mx-auto max-w-7xl">
            {children}
        </div>
    )
}


export default Container;
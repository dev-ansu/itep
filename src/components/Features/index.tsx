import { Link } from "react-router-dom";
import Container from "../Container";

const Features = ()=>{
    return(
        <Container>
            <div className="h-auto">
                <div className="text-center">
                    <h1 className="text-4xl text-center font-bold uppercase">Principais <span className="text-orange-600">formações</span></h1>                
                    <p className="italic text-zinc-400 text-center">Conheça nossos principais cursos.</p>
                </div>

                <div className="my-12 w-full p-4 grid gap-8 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-center">
                    {[...Array(10).keys()].map( i =>(
                        <Link key={i} className="hover:scale-105 transition-all " to="/curso/1">
                            <div className="sm:w-full bg-white shadow-lg">
                                <div className="w-full">
                                    <img src="/img/sobre2.jpeg" className=""></img>
                                </div>
                                <div className="flex p-8 justify-center items-center">
                                    <p className="font-medium">Programador web</p>
                                </div>                        
                            </div>
                        </Link>
                    ))
                    }
                </div>
                
            </div>
        </Container>
    )
}

export default Features;
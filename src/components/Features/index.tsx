import { Link } from "react-router-dom";
import Container from "../Container";
import { CursoImageProps } from "../../pages/private/Cursos";
import { CursosData } from "../../schemas/cursosValidationSchema";
import { useSiteContext } from "../../contexts/SiteContext";
import { FaArrowRight } from "react-icons/fa";
import CardCurso from "../CardCurso";

export interface CursoProp extends CursosData{
    id: string;
    cursoIMage: CursoImageProps; 
    topicosCurso: string[];
    acessos?:number;
    entrouEmContato?: number;
}

const Features = ()=>{
    const {cursos} = useSiteContext();
  
    return(
        <Container>
            <div className="h-auto my-12 flex flex-col justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl text-center font-bold uppercase">Principais <span className="text-orange-600">formações</span></h1>                
                    <p className="italic text-zinc-400 text-center">Conheça nossos principais cursos.</p>
                </div>

                <div className="w-full p-4 grid gap-8 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-center">
                    {cursos && cursos.map(curso =>(
                        <CardCurso key={curso.id} curso={curso} to="curso/" />
                    ))
                    }
                </div>
                <Link className="text-bold hover:bg-orange-600 hover:text-white text-lg  justify-center rounded-lg gap-2 p-2 flex items-center border-2 border-orange-600 text-orange-600" to="/cursos">Veja mais <FaArrowRight /></Link>
             
            </div>
        </Container>
    )
}

export default Features;
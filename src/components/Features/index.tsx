import { Link } from "react-router-dom";
import Container from "../Container";
import { CursoImageProps } from "../../pages/private/Cursos";
import { CursosData } from "../../schemas/cursosValidationSchema";
import { useSiteContext } from "../../contexts/SiteContext";

export interface CursoProp extends CursosData{
    id: string;
    cursoIMage: CursoImageProps; 
    topicosCurso: string[];
}

const Features = ()=>{
    const {cursos} = useSiteContext();
  

    const truncateText = (text: string, maxLength:number) => {
      if(text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };
    return(
        <Container>
            <div className="h-auto">
                <div className="text-center">
                    <h1 className="text-4xl text-center font-bold uppercase">Principais <span className="text-orange-600">formações</span></h1>                
                    <p className="italic text-zinc-400 text-center">Conheça nossos principais cursos.</p>
                </div>

                <div className="my-12 w-full p-4 grid gap-8 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-center">
                    {cursos && cursos.map(curso =>(
                        <Link key={curso.id} className="hover:scale-105 transition-all " to={`curso/${curso.id}`}>
                            <div className="sm:w-full bg-white shadow-lg">
                                <div className="w-full">
                                    <img src={curso.cursoIMage.url} alt={curso.nome} className=""></img>
                                </div>
                                <div className="flex flex-col  p-8 justify-center items-center">
                                    <p className="font-medium text-center">{curso.nome}</p>
                                    <p className="mt-2 truncate">{truncateText(curso.descricao, 100)}</p>
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
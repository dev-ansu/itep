import {FaArrowRight, FaCheck} from "react-icons/fa"
import { Link } from "react-router-dom";

const About = ()=>{
    return(
        <div className="w-full relative my-12 min-h-screen h-screen bg-slate-600">

            <div className="h-full w-1/2 bg-slate-300">
                <img className="w-full h-full object-cover" src="/public/img/sobre2.jpeg" alt="Imagem do sobre. Homem mexendo no computador." />
            </div>
            
            <div  className="absolute shadow-lg md:left-[46.67%] top-24 bg-white drop-shadow-2xl flex flex-col gap-8 p-8">
                <div className="">
                    <h1 className="text-4xl font-bold uppercase">Sobre <span className="text-orange-600">nós</span></h1>                
                    <p className="italic text-zinc-400">A Escola ITEP oferece os melhores benefícios, confira:</p>
                </div>
                <ul className="flex flex-col gap-4">
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Acompanhamento de educador.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Laboratórios multimídia climatizados.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Aulas individualizadas.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Material didático para apoiar as aulas digitais.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Certificado reconhecido em todo o Brasil.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Um aluno por computador.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Horários diversificados.</li>
                    <li className="italic flex gap-2 items-center"><FaCheck className="text-orange-600" /> Início imediato, sem formação de turma.</li>
                </ul>
                <Link className="text-bold hover:bg-orange-600 hover:text-white text-lg  justify-center rounded-lg gap-2 p-2 flex items-center border-2 border-orange-600 text-orange-600" to="/sobre">Veja mais <FaArrowRight /></Link>
            </div>
            
        </div>

    )
}

export default About;
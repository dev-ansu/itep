
import { useParams } from "react-router-dom"
import Container from "../../../components/Container";
import { MouseEvent, useEffect, useState } from "react";
import { CursoProp } from "../../../components/Features";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import { FaCertificate, FaRegClock, FaWhatsapp } from "react-icons/fa";
import { useSiteContext } from "../../../contexts/SiteContext";
import { removeSpecialChars } from "../../../utils/utils";
import About from "../../../components/About";


const CursoInfo = ()=>{
    const {id} = useParams();
    const [curso, setCurso] = useState<CursoProp | null>(null);
    const {data: {siteData, cursos}} = useSiteContext();


   const loadCurso = async()=>{
        const cursoIndex = cursos.findIndex( (curso: CursoProp) => curso.id == id);
        if(cursoIndex >= 0){
            const cursoFilter = cursos[cursoIndex] as CursoProp;
            setCurso(cursoFilter);
        }
    }

    useEffect(()=>{
        window.scrollTo({top: 0})
        loadCurso()
    },[]);

    const handleClick = async(e: MouseEvent<HTMLAnchorElement>)=>{
        
        if(curso?.id){
            const docRef = doc(db, 'cursos', curso?.id)
            try{
                const document = await getDoc(docRef);
                if(document.exists()){
                    e.preventDefault();
                    if(document.data().entrouEmContato && document.data().entrouEmContato > 0){
                        await updateDoc(docRef, {
                            entrouEmContato: document.data().entrouEmContato + 1
                        });
                        window.location.href = `https://api.whatsapp.com/send?phone=55${removeSpecialChars(String(siteData.whatsapp))}&text=Olá, fiquei interessado no curso *${curso.nome}*. Gostaria de mais informações.`
                    }else{
                        await updateDoc(docRef, {
                            entrouEmContato: 1
                        })
                        window.location.href = `https://api.whatsapp.com/send?phone=55${removeSpecialChars(String(siteData.whatsapp))}&text=Olá, fiquei interessado no curso *${curso.nome}*. Gostaria de mais informações.`
                    }
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-full p-4 bg-orange-600">
                {curso && 
                    <Container>
                        <div className="pt-16 flex min-h-96 md:flex-row flex-col gap-16">
                            <div className="flex justify-center flex-col items-start">
                                <h1 className="lg:text-6xl md:text-4xl text-4xl text-white">{curso.nome}</h1>
                                <p className="text-xl md:text-md text-white mt-4">
                                    {curso.descricao}
                                </p>
                                <a onClick={handleClick} target="_blank" className="flex cursor-pointer text-white font-medium mt-4 text-xl bg-green-600 rounded-md py-3 px-2 items-center justify-center gap-2">Eu quero esse curso <FaWhatsapp size={30} /></a>
                            </div>
                            <img 
                                className="md:w-96 w-48 object-contain"
                                src={curso.cursoIMage.url}
                            />
                        </div>
                      
                    </Container>
                }
            </div>
            <Container>
            <div className="w-full text-orange-600 flex gap-4 justify-around items-center bg-white shadow-zinc-400 shadow-lg p-8">
                <div className="flex  flex-col items-center gap-1 text-lg">
                    <FaRegClock size={30} />
                    <p className="font-thin">{curso?.carga_horaria} horas</p>
                </div>
                {curso?.certificacao &&
                <div className="flex flex-col items-center gap-1 text-lg">
                    <FaCertificate size={30} />
                    <p className="font-thin">{curso?.certificacao ? "Certificado":""}</p>
                </div>
                }
            </div>
            </Container>
            <div className="my-16 w-full p-8 grid grid-cols-1 md:grid-cols-2 ">
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium text-zinc-600">Sobre o curso</h2>
                    <p>
                        {curso?.descricao}
                    </p>
                    <h2 className="text-lg font-medium text-zinc-600">O que aprender com este curso?</h2>
                    <p>
                        {curso?.topicosCurso.join(", ")}
                    </p>
                </div>
                <div className="flex justify-center w-full items-center flex-col gap-4">
                    <a onClick={handleClick} target="_blank" className="flex cursor-pointer text-white font-medium mt-4 text-xl bg-green-600 rounded-md py-3 px-2 items-center justify-center gap-2">Eu quero esse curso <FaWhatsapp size={30} /></a>
                    <img 
                        className="md:w-96 w-full object-contain"
                        src={curso?.cursoIMage.url}
                    />
                </div>
            </div>
            <About />
        </div>
    )
}


export default CursoInfo;
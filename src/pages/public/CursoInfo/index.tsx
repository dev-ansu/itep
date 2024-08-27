
import { useParams } from "react-router-dom"
import Container from "../../../components/Container";
import { MouseEvent, useEffect, useState } from "react";
import { CursoProp } from "../../../components/Features";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import { FaWhatsapp } from "react-icons/fa";
import { useSiteContext } from "../../../contexts/SiteContext";
import { removeSpecialChars } from "../../../utils/utils";


const CursoInfo = ()=>{
    const {id} = useParams();
    const [curso, setCurso] = useState<CursoProp | null>(null);
    const {siteData} = useSiteContext();
  
    const loadCurso = async()=>{
        if(id){
            const docRef = doc(db, 'cursos', id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const data = docSnap.data() as CursoProp;
                setCurso({
                    id: docSnap?.id,
                    nome: data?.nome,
                    carga_horaria: data?.carga_horaria,
                    certificacao: data?.certificacao,
                    cursoIMage: data?.cursoIMage,
                    descricao: data?.descricao,
                    topicosCurso: data?.topicosCurso,
                    acessos: data?.acessos,
                    entrouEmContato: data?.entrouEmContato,
                })
            }
        }
    }

    useEffect(()=>{
        loadCurso()
    },[])

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
        <div className="min-h-screen">
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
        </div>
    )
}


export default CursoInfo;
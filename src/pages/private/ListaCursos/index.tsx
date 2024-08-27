import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../../../services/firebaseConnection";
import { CursoProp } from "../../../components/Features";
import Input from "../../../components/Input";
import CardCurso from "../../../components/CardCurso";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FaTrash } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { CursoImageProps } from "../Cursos";

interface ListaCursoProps{
    to?: string;
}
const ListaCursos = ({to = '/app/curso/'}: ListaCursoProps)=>{
    const [cursos, setCursos] = useState<CursoProp[]>();
    const {user} = useAuthContext();
    const loadCursos = async()=>{
        const response = await getDocs(collection(db, 'cursos'));
        const cursos: CursoProp[] = [];
        response.docs.forEach(curso =>{
            const data = curso.data() as CursoProp;
            cursos.push({
                id: curso.id,
                nome: data.nome,
                carga_horaria: data.carga_horaria,
                certificacao: data.certificacao,
                cursoIMage: data.cursoIMage,
                descricao: data.descricao,
                topicosCurso: data.topicosCurso,
                acessos: data.acessos,
            })
        })
        setCursos(cursos);
    }
    useEffect(()=>{
        loadCursos();
    },[]);

    const handleDeleteImage = async(image: CursoImageProps)=>{
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);
        try{
            await deleteObject(imageRef);
        }catch(err){
            toast.error("Houve um erro ao tentar apagar a imagem.")
        }
    }

    const handleDeleteCurso = async(curso: CursoProp)=>{
        if(window.confirm('Deseja realmente excluir este registro?')){
            const docRef = doc(db, 'cursos', curso.id);
            try{
                await deleteDoc(docRef);
                await handleDeleteImage(curso.cursoIMage);
                toast.success('Curso excluído com sucesso.');
            }catch(err){
                toast.error('Houve um erro ao tentar excluir o curso.')
                console.log(err);
            }
        }
    }

    return(
        <div className="p-4 min-h-screen">
            <div>
                <Input placeholder="Pesquisar curso" autoFocus />
            </div>
            <h1 className="mt-4 text-3xl">Todos os cursos</h1>
            <div className="grid mt-8 gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
                {cursos && cursos.map( curso => (
                    <div className="flex flex-col">
                        <CardCurso key={curso.id} curso={curso} to={to} />
                        {user?.uid &&
                            <>
                            <div className="flex flex-col bg-white pb-4 px-2">
                                <span>Total de acessos: {curso.acessos ? curso.acessos:0}</span>
                            </div>
                            <button onClick={() => handleDeleteCurso(curso)} className="bg-red-600 rounded-md p-3 flex justify-center items-center text-white">
                                <FaTrash />
                            </button>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListaCursos;
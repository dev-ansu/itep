import { Link } from "react-router-dom";
import { CursoProp } from "../Features";
import { useAuthContext } from "../../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CardCursoProps{
    curso: CursoProp;
    to: string;
}

const CardCurso = ({curso, to}: CardCursoProps)=>{
    const {user} = useAuthContext();
    const handleClick = async()=>{
        if(!user?.uid){
            const docRef = doc(db, 'cursos', curso.id);
            const document = await getDoc(docRef);
            try{
                if(document.exists()){
                    if(document.data().acessos && document.data().acessos > 0){
                        await updateDoc(docRef, {
                            acessos: document.data().acessos + 1
                        })
                    }else{
                        await updateDoc(docRef, {
                            acessos: 1
                        })
                    }
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <Link onClick={handleClick} className="hover:scale-105 transition-all " to={`${to}${curso.id}`}>
            <div className="sm:w-full bg-white shadow-lg">
                <div className="w-full">
                    <img src={curso.cursoIMage.url} alt={curso.nome} className=""></img>
                </div>
                <div className="flex flex-col  p-8 justify-center items-center">
                    <p className="font-medium text-center">{curso.nome}</p>
                    <p className="mt-2 truncate">{curso.descricao}</p>
                </div>                        
            </div>
        </Link>
    )
}

export default CardCurso;
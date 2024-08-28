import { FaPlus, FaUpload } from "react-icons/fa";
import Input from "../../../components/Input";
import { useState, MouseEvent, ChangeEvent, useRef, KeyboardEvent, useEffect } from "react";
import { ButtonPadrao } from "../../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CursosData, cursosValidationSchema } from "../../../schemas/cursosValidationSchema";
import { db, storage } from "../../../services/firebaseConnection";
import {  doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidV4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FiTrash } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { CursoProp } from "../../../components/Features";
import { useSiteContext } from "../../../contexts/SiteContext";

export interface CursoImageProps{
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

const Curso = ()=>{
    const { data:{cursos} } = useSiteContext();
    const { id } = useParams<string>();
    const [curso, setCurso] = useState<CursoProp | null>(null);
    const inputTopico = useRef<HTMLInputElement>(null);
    const buttonSetTopico = useRef<HTMLButtonElement>(null);
    const {user} = useAuthContext();
    const [cursoIMage, setCursoImage] = useState<CursoImageProps | null>(null);
    const {handleSubmit, register, setValue,  formState:{errors}} = useForm<CursosData>({
        mode:"onChange",
        resolver: zodResolver(cursosValidationSchema),
    });
    const [topicoCurso, setTopicoCurso] = useState('');
    const [topicosCurso, setTopicosCursos] = useState<string[]>([]);

    const loadCurso = async()=>{
        const cursoIndex = cursos.findIndex( (curso: CursoProp) => curso.id == id);
        if(cursoIndex >= 0){
            const data = cursos[cursoIndex] as CursoProp;
            setCurso(data);
            setTopicosCursos(data.topicosCurso);
            setCursoImage(data.cursoIMage);
            for(let key in data){
                const chave = key as keyof CursosData;
                setValue(chave, data[chave]);
            }
        }
    }
  

    useEffect(()=>{
        loadCurso()
    },[])

 

    const handleSetTopico = (e: MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(topicoCurso.trim()){
            setTopicosCursos([...topicosCurso, topicoCurso])
            setTopicoCurso('');
        }
    }

    const handleDeleteItem = (i: number)=>{
        const newBeneficios = topicosCurso.filter( (_, index) => index != i)
        setTopicosCursos(newBeneficios)
    }

    const update = async(data: CursosData)=>{
        if(!cursoIMage){
            toast.error("É obrigatório passar uma imagem para o curso.");
            return;
        }
        if(id){
            const docRef = doc(db, 'cursos', id);
                try{
                    await updateDoc(docRef, {
                    ...data,
                    topicosCurso,
                    cursoIMage,
                });
                toast.success("Registro atualizado com sucesso.");
            }catch(err){
                toast.error("Houve um erro ao tentar salvar os dados.");
                console.log(err);
        }
    }
    }
    
    const handleFile = async (e: ChangeEvent<HTMLInputElement>)=>{
        if(cursoIMage != null){
            setCursoImage(null);
        }
        if(e.target.files && e.target.files[0]){
            const acceptedFiles = ['image/jpeg', 'image/png','image/jpg'];
            const image = e.target.files[0];
            if(acceptedFiles.includes(image.type)){
                // enviar para o banco de dados
                await handleUpload(image)
            }else{
                const message = "As imagens devem ser do tipo: " + String(acceptedFiles.join(", ")).replace(/image\//g, "");
                toast.warning(message);
                return;
            }
        }        
    }

    const handleUpload = async(image: File)=>{
        if(!user?.uid){
            return;
        }
        const current_uid = user.uid;
        const uid_image = uuidV4();
        const uploadRef = ref(storage, `images/${current_uid}/${uid_image}`);
        const snapshot = await uploadBytes(uploadRef, image); 
        const downloadUrl = await getDownloadURL(snapshot.ref)
        const imageItem: CursoImageProps = {
            uid: current_uid,
            name: uid_image,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
        };
        setCursoImage(imageItem);
    }
    const handleDeleteImage = async(image: CursoImageProps)=>{
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);
        try{
            await deleteObject(imageRef);
            setCursoImage(null);
        }catch(err){
            toast.error("Houve um erro ao tentar apagar a imagem.")
        }
    }

    const handlePressEnterOnTopicos = (e: KeyboardEvent)=>{
        if(e.key.toLowerCase() === 'enter'){
            e.preventDefault();
            if(inputTopico.current != undefined && buttonSetTopico.current != undefined){
                buttonSetTopico.current.click();
            }
        }
    }


    return(
        <div className="p-4">
            {curso && 
            <>
            <h1>Curso</h1>
            <form onSubmit={handleSubmit(update)} className="flex flex-col w-full gap-4 mt-8">
                <div className="flex gap-2 h-48">
                    <label htmlFor="imagem" className="flex justify-center items-center w-48 border rounded-md cursor-pointer border-black h-full">
                            <FaUpload size={30} />
                        <div className="flex justify-center items-center">
                            <input type="file" id="imagem" style={{visibility: "hidden", display:"none"}}  accept="image/*" onChange={handleFile}  />
                        </div>
                    </label>
                    {cursoIMage &&
                    <div className="h-48  w-full flex items-center justify-center">
                        <div className="w-64 h-64 relative">
                            <button title="Apagar imagem" className="absolute z-10 h-full w-full hover:bg-orange-600 opacity-50 flex items-center justify-center " onClick={() => handleDeleteImage(cursoIMage)}>
                                <FiTrash size={60} color="#000" className="text-4xl" />
                            </button>
                            <img className="h-full object-cover" src={cursoIMage.url    } />
                        </div>
                    </div>
                    }
                </div>
                <div className="w-full">
                    <label htmlFor="nome_curso">Nome do curso</label>
                    <Input
                        register={register("nome")} 
                        error={errors.nome?.message}
                        placeholder="Digite o nome do curso"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="carga_horaria">Carga horária do curso</label>
                    <Input
                        register={register("carga_horaria")} 
                        error={errors.carga_horaria?.message}
                        type="number"
                        placeholder="Digite a carga horária do curso"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="carga_horaria">Certificação</label>
                    <Input
                        register={register("certificacao")} 
                        error={errors.certificacao?.message}
                        placeholder="Digite as informações sobre a certificação"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="nome_curso">Descrição do curso</label>
                    <textarea
                        {...register('descricao')}
                        className="w-full p-2 outline-none border rounded-md border-orange-600"
                        rows={5}
                        placeholder="Digite a descrição do curso"
                    />
                    {errors.descricao?.message && <span className="text-sm text-red-600">{errors.descricao?.message}</span>}
                </div>

                <div className="flex w-full flex-col gap-2 items-start">
                    <label htmlFor="">O que vou aprender?</label>
                    <div className="flex gap-2 w-full items-center">
                        <Input
                            ref={inputTopico}
                            onKeyDown={handlePressEnterOnTopicos}
                            value={topicoCurso}
                            onChange={(e)=> setTopicoCurso(e.target.value)}
                            placeholder="Digite um tópico do curso"
                            />
                        <button type="button" ref={buttonSetTopico} onClick={handleSetTopico}>
                            <FaPlus  size={24} className="text-orange-600" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {topicosCurso && topicosCurso.map( (item, i) => (
                            <div key={i} className="flex justify-between items-center gap-2">
                                <span>- {item} </span><span onClick={()=> handleDeleteItem(i)} className="bg-red-600 text-white p-1 px-3 rounded-md cursor-pointer">X</span>
                            </div>
                        ))}
                    </div>
                </div>

                <ButtonPadrao
                    text="Cadastrar"
                />
            </form>
            </>
            }
        </div>
    )
}

export default Curso;
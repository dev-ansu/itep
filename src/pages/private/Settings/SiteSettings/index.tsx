import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link} from "react-router-dom";
import Input, { InputM } from "../../../../components/Input";
import { ButtonPadrao } from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { SiteData, siteSettingsSchema } from "../../../../schemas/siteSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "../../../../services/firebaseConnection";
import { doc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify";
import { KeyboardEvent, MouseEvent, useEffect,  useRef,  useState } from "react";
import { useSiteContext } from "../../../../contexts/SiteContext";


export interface ConfigData extends SiteData{
    beneficios: string[];
}

const SiteSettings = ()=>{
    const {data, revalidate} = useSiteContext();
    const beneficioRef = useRef<HTMLInputElement>(null);
    const buttonSetBeneficio = useRef<HTMLButtonElement>(null);
    const [beneficio, setBeneficio] = useState<string>('');
    const [beneficios, setBeneficios] = useState<string[]>([]);
    const {handleSubmit, register, setValue, formState:{errors}} = useForm<SiteData>({
        mode:"onChange",
        resolver: zodResolver(siteSettingsSchema)
    });


    const loadConfig = ()=>{
            if(data.beneficios){
                setBeneficios(data.beneficios)
            }

            for(let key in data.siteData){
                if(key != 'beneficios'){
                    const chave = key as keyof SiteData;
                    setValue(chave, data.siteData[chave]);
                }
            }
        
    }

    useEffect(()=>{
        loadConfig();
    },[data]);

    const save = async(data: SiteData)=>{
        try{
            await setDoc(doc(db, 'site_config', 'config'), {...data, beneficios, createdAt: new Date()})
            await revalidate();
            toast.success("Configurações salvas com sucesso.");
        }catch(error){
            toast.error("Erro ao tentar salvar as configurações.");
            console.log(error);
        }
    }
    const handleClickBeneficios = (e: MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(beneficio.trim()){
            setBeneficios([...beneficios, beneficio])
            setBeneficio('');
        }
    }

    const handleDeleteItem = (i: number)=>{
        const newBeneficios = beneficios.filter( (_, index) => index != i)
        setBeneficios(newBeneficios)
    }

    
    const handlePressEnterOnBeneficios = (e: KeyboardEvent)=>{
        if(e.key.toLowerCase() === 'enter'){
            e.preventDefault();
            if(beneficioRef.current != undefined && buttonSetBeneficio.current != undefined){
                buttonSetBeneficio.current.click();
            }
        }
    }



    return(
        <div className="p-4"> 
            <h1 className="flex gap-2 items-center">
                <Link className="flex gap-2 items-center" to="/app/settings">
                    <FaArrowLeft size={24} />Configurações do site
                </Link>
            </h1>
            
            <form onSubmit={handleSubmit(save)} className="flex flex-col w-full gap-4 mt-8">

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium">Informações de contato</h2>
                    <div className="flex w-full gap-2">
                        <div className="w-full">
                            <label htmlFor="">WhatsApp da escola</label>
                            <InputM
                                showMask={true}
                                mask="(__) ____-____" 
                                replacement={{ _: /\d/ }}                            
                                register={register('whatsapp')}
                                error={errors.whatsapp?.message}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">E-mail da escola</label>
                            <Input
                                register={register('email')}
                                error={errors.email?.message}
                                placeholder="Digite o WhatsApp da escola"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="">Texto do cabeçalho</label>
                    <Input 
                        register={register('text_cabecalho')}
                        error={errors.text_cabecalho?.message}
                        placeholder="Digite aqui o texto que deverá aparecer no cabeçalho"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="">Texto do 'Sobre nós'</label>
                    <Input 
                        register={register('sobre_nos')}
                        error={errors.sobre_nos?.message}
                        placeholder="Digite aqui o texto que deverá aparecer no sobre nós"
                    />
                </div>
                
                <div className="flex w-full gap-2 items-center">
                    <label htmlFor="Beneficios">Benefícios:</label>
                    <Input
                        ref={beneficioRef}
                        onKeyDown={handlePressEnterOnBeneficios}
                        value={beneficio}
                        onChange={(e)=> setBeneficio(e.target.value)}
                    
                    />

                    <button ref={buttonSetBeneficio} onClick={handleClickBeneficios}>
                        <FaPlus size={24} className="text-orange-600" />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {beneficios && beneficios.map( (item, i) => (
                        <div key={i} className="flex justify-between items-center gap-2">
                            <span>- {item} </span><span onClick={()=> handleDeleteItem(i)} className="bg-red-600 text-white p-1 px-3 rounded-md cursor-pointer">X</span>
                        </div>
                    ))}
                </div>
                
                

                <ButtonPadrao 
                    text="Salvar"                
                />
            </form>
        </div> 
    )
}

export default SiteSettings;
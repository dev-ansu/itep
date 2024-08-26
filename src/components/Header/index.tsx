import { FaWhatsapp } from "react-icons/fa";
import { useSiteContext } from "../../contexts/SiteContext";
import DOMPurify from 'isomorphic-dompurify';


const Header = ()=>{
    const {siteData} = useSiteContext();
    
    const removeSpecialChars = (text: string): string => {
        // Define a expressão regular para os caracteres "(" , ")" e "-"
        const regex = /[()\-|\s]/g;
        // Substitui os caracteres encontrados por uma string vazia
        return text.replace(regex, '');
    };

    return(
        <header className="w-full flex flex-col justify-center items-center  h-[calc(100vh-150px)] bg-orange-700">
            <h1 dangerouslySetInnerHTML={{__html: siteData?.text_cabecalho ?  DOMPurify.sanitize(siteData.text_cabecalho):''}} className="w-5/6  md:w-3/6 text-white sm:text-xl lg:text-4xl text-xl md:text-3xl  text-center">
            </h1>
            <a target="_blank" href={`https://api.whatsapp.com/send?phone=55${removeSpecialChars(String(siteData.whatsapp))}`} className="w-96 shadow-2xl p-4 rounded-lg justify-center items-center text-xl whatsapp cursor-pointer my-6 text-black transition-all font-medium hover:bg-green-500  gap-4 flex bg-whatsapp">Entre em contato conosco <FaWhatsapp size={30} color="#fff" /></a>
        </header>
    )
}

export default Header;
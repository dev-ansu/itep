import { FaWhatsapp } from "react-icons/fa";

const Header = ()=>{
    return(
        <header className="w-full flex flex-col justify-center items-center  h-[calc(100vh-150px)] bg-orange-700">
            <h1 className="w-5/6  md:w-3/6 text-white sm:text-xl lg:text-4xl text-xl md:text-3xl  text-center">

                Somos uma escola <strong>profissionalizante</strong> que tem como principal
                propósito ensinar uma nova profissão para nossos alunos e, com isso, ajudá-los a <br></br><strong>ENCONTRAR SUA MELHOR VERSÃO.</strong>

            </h1>
            <a className="w-96 shadow-2xl p-4 rounded-lg justify-center items-center text-xl whatsapp cursor-pointer my-6 text-black transition-all font-medium hover:bg-green-500  gap-4 flex bg-whatsapp">Entre em contato conosco <FaWhatsapp size={30} color="#fff" /></a>
        </header>
    )
}

export default Header;
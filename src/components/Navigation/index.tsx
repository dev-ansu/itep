import { Link } from "react-router-dom";
import Container from "../Container";
import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaGraduationCap, FaHome, FaPhone } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";




const Navigation = ()=>{

    const [menuMobile, setMenuMobile] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null); // Referência ao menu

    const loadMenu = ()=>{
        if(window.innerWidth <= 720){
            setMenuMobile(true);
        }else{
            setMenuMobile(false);
            setOpenMenu(true);
        }
    }

    useEffect(()=>{
        window.addEventListener('resize', loadMenu);
        return ()=> window.removeEventListener('resize', loadMenu)
    },[])
    
    const handleClick = ()=>{
        setOpenMenu(!openMenu)
    }


    useEffect(()=>{
        return window.onload = loadMenu;
    },[]);

    return(
        <Container>
            <nav className={`w-full px-2 flex justify-between ${menuMobile ? 'relative':''} items-center bg-white max-h-32`}>
                <div className="">
                    <img src="/img/logo.jpeg" alt="Logo da itep" className="w-48" />
                </div>
                {openMenu && 
                    <ul ref={menuRef} className={`flex gap-4 ${menuMobile ? 'flex-col absolute  bg-white py-8 pr-16  px-4 top-[100px] right-0 rounded-lg':'' }`}>
                        <li className="text-xl font-bold hover:text-orange-500 hover:border-b-orange-300 hover:border-b-4 border-b-4 border-white"><Link to="/" className="flex gap-2"><FaHome size={28} /> Página inicial</Link></li>
                        <li className="text-xl font-bold hover:text-orange-500 hover:border-b-orange-300 hover:border-b-4 border-b-4 border-white"><Link to="/" className="flex gap-2"><FaGraduationCap size={28} /> Cursos</Link></li>
                        <li className="text-xl font-bold hover:text-orange-500 hover:border-b-orange-300 hover:border-b-4 border-b-4 border-white"><Link to="/" className="flex gap-2"><FaPerson size={28} /> Sobre</Link></li>
                        <li className="text-xl font-bold hover:text-orange-500 hover:border-b-orange-300 hover:border-b-4 border-b-4 border-white"><Link to="/" className="flex gap-2"><FaPhone size={28} /> Contato</Link></li>
                    </ul>
                }
                {menuMobile &&
                    <IoMenu onClick={handleClick} size={50} className="text-orange-600 cursor-pointer"/>
                }

            </nav>
        </Container>
    )
}

export default Navigation;
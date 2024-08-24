import { Link } from "react-router-dom";


const Settings = ()=>{
    return(
        <div className="p-4"> 
            <h1>Configurações</h1>
            <ul className="flex w-full h-11 items-center mt-4">
                <li className="border border-blue-300 h-full flex items-center w-full px-2"><Link className="w-full h-full flex items-center" to="/app/settings/site">Site</Link></li>
                <li className="border border-blue-300 h-full flex items-center w-full px-2"><Link className="w-full h-full flex items-center" to="/app/settings/cursos">Cursos</Link></li>
            </ul>
        </div>        
    )
}

export default Settings;
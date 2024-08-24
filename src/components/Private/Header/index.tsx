import {Link} from "react-router-dom"
import { CiSettings } from "react-icons/ci";


const Header = ()=>{
    return(
        <nav className="w-full h-8 p-4 bg-orange-600 justify-between items-center flex">
            <ul className="flex gap-4">
                <li className="font-medium text-white"><Link to="/app">Home</Link></li>
            </ul>
            <div>
                <Link to="/app/settings">
                    <CiSettings size={28} color="#fff" />
                </Link>
            </div>
        </nav>
    )
}


export default Header;
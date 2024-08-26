import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import { useSiteContext } from "../../contexts/SiteContext";


const BottomFooter = ()=>{
    const {siteData} = useSiteContext();
    const data = siteData;

    return(
        <div className="w-full px-2 h-8 flex justify-center mx-auto items-center bg-orange-600">
            <div className="w-full max-w-7xl flex justify-between items-center h-full">
                <div className="flex gap-4">
                    <span className="flex text-sm gap-1 text-white items-center">
                        <FaWhatsapp color="#fff" /> {data.whatsapp}
                    </span>
                    <span className="flex text-sm gap-1 text-white items-center">
                        <MdEmail color="#fff" /> {data.email}
                    </span>
                </div>
                <div className="flex gap-2">
                    <a className="cursor-pointer"><FaFacebook size={22} color="#fff" /></a>                    
                    <a className="cursor-pointer"><FaInstagram size={22} color="#fff" /></a>                    
                </div>
            </div>                                
        </div>
    )
}

export default BottomFooter;

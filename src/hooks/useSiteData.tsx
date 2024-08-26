import { useState } from "react";
import { ConfigData } from "../pages/private/Settings/SiteSettings";
import { SiteData } from "../schemas/siteSettingsSchema";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

const useSiteData = ()=>{
    const [beneficios, setBeneficios] = useState<string[]>([]);
    const [siteData, setSiteData] = useState({} as SiteData);

    const loadConfig = async ()=>{
        const docRef = doc(db, 'site_config', 'config');
        try{
            const snapshot = await getDoc(docRef);
            const data = snapshot.data() as ConfigData;
            if(data){
                if(data.beneficios){
                    setBeneficios(data.beneficios)
                }
                for(let key in data){
                    const chave = key as keyof SiteData;
                    const obj = {[chave]: data[chave]} as SiteData;
                    setSiteData(obj);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    return {
        loadConfig,
        beneficios,
        siteData
    }

}

export default useSiteData;
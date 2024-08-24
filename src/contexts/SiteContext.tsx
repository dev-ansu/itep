import {createContext, useContext, ReactNode, useState, useEffect} from "react";
import { db } from "../services/firebaseConnection";
import {  doc, getDoc } from "firebase/firestore";
import {SiteData as SiteContextData}  from "../schemas/siteSettingsSchema";



interface SiteData extends SiteContextData{
    beneficios?: [] | null;
}

interface SiteProvider{
    children: ReactNode;
}

const SiteContext = createContext({} as SiteData);

export const SiteProvider = ({children}:SiteProvider)=>{
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    
    const loadConfig = async ()=>{
        const docRef = doc(db, 'site_config', 'config');
        try{
            const snapshot = await getDoc(docRef);
            const data = snapshot.data();
            setSiteData(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        loadConfig();
    },[]);


    return(
        <SiteContext.Provider value={{...siteData}}>
            {children}
        </SiteContext.Provider>
    )
}


export const useSiteContext = ()=>{
    const context = useContext(SiteContext);
    if(context === undefined){
        throw new Error('useSiteContext must be abled within a SiteProvider')
    }
    return context;
}
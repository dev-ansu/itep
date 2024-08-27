import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { ConfigData } from "../pages/private/Settings/SiteSettings";
import { SiteData } from "../schemas/siteSettingsSchema";
import { CursoProp } from "../components/Features";

export interface LoaderDataProps{
    beneficios?:string[];
    siteData: SiteData;
}

export interface LoaderCombinedProps{
    beneficios?:string[];
    siteData: SiteData;
    cursos: CursoProp[];
}

export async function loadSiteData():Promise<LoaderDataProps> {
    const docRef = doc(db, 'site_config', 'config');
    try {
        const snapshot = await getDoc(docRef);
        const data = snapshot.data() as ConfigData;
        if (!data) {
            throw new Error('No data found');
        }

        const beneficios = data.beneficios || [];
        let siteData = {} as SiteData;

        for (let key in data) {
            const chave = key as keyof SiteData;
            siteData = {...siteData, [chave]:data[chave]};
        }

        return { beneficios, siteData };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to load site data');
    }
}


export const fetchCursos = async()=>{
    const q = query(
        collection(db, 'cursos'),
        orderBy('nome'),
        limit(5)
    );
    try{
        const snapshot = await getDocs(q);
        
         if (!snapshot.docs) {
            throw new Error('No data found');
        }

        const cursos = snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        } as CursoProp))
        return cursos;
    }catch(error){
        console.log(error);
        throw new Error("Failed to load cursos data")
    }
}


export const combinedLoadSite = async()=>{
    try{
        const cursos = await fetchCursos();
        const { beneficios, siteData } = await loadSiteData();
        if(cursos && beneficios && siteData){
            return {cursos, beneficios, siteData};
        }
        throw new Error('Failed to load data');
    }catch(err){
        console.log(err)
        throw new Error("Failed to load data")
    }
}
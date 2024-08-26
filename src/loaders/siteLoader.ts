import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { ConfigData } from "../pages/private/Settings/SiteSettings";
import { SiteData } from "../schemas/siteSettingsSchema";

export interface LoaderDataProps{
    beneficios?:string[];
    siteData: SiteData;
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
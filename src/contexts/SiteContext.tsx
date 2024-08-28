import {createContext, useContext, ReactNode, useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import { combinedLoadSite, LoaderCombinedProps } from "../loaders/siteLoader";


interface SiteProvider{
    children: ReactNode;
}

interface SiteContextProps{
    data: LoaderCombinedProps;
    revalidate: ()=> Promise<void>;
}

const SiteContext = createContext({} as SiteContextProps);

export const SiteProvider = ({children}:SiteProvider)=>{
    const loaderData = useLoaderData() as LoaderCombinedProps;
    const [data, setData] = useState<LoaderCombinedProps>(loaderData);
    
    const revalidate = async()=>{
        const revalidated = await combinedLoadSite();
        setData(revalidated);
    }

    
    useEffect(()=>{
        setData(loaderData)
    },[loaderData]);


    return(
        <SiteContext.Provider value={{data, revalidate}}>
            { children }
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
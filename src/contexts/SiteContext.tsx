import {createContext, useContext, ReactNode, useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import { LoaderCombinedProps } from "../loaders/siteLoader";


interface SiteProvider{
    children: ReactNode;
}

const SiteContext = createContext({} as LoaderCombinedProps);

export const SiteProvider = ({children}:SiteProvider)=>{
    const loaderData = useLoaderData() as LoaderCombinedProps;
    const [data, setData] = useState<LoaderCombinedProps>(loaderData);
    
    
    useEffect(()=>{
        setData(loaderData)
    },[loaderData]);


    return(
        <SiteContext.Provider value={data}>
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
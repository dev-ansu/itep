import {createContext, useContext, ReactNode, useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import { LoaderDataProps } from "../loaders/siteLoader";


interface SiteProvider{
    children: ReactNode;
}

const SiteContext = createContext({} as LoaderDataProps);

export const SiteProvider = ({children}:SiteProvider)=>{
    const loaderData = useLoaderData() as LoaderDataProps;
    const [data, setData] = useState<LoaderDataProps>(loaderData);
    
    
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
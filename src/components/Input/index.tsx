import { InputMask, InputMaskProps } from "@react-input/mask";
import { InputHTMLAttributes, RefObject, forwardRef } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    register?: UseFormRegisterReturn;
    error?: string;
}

interface InputMProps extends InputMaskProps{
    register?: UseFormRegisterReturn;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({className, error, register, ...props}, ref)=>{
    className += ` w-full p-2 h-8 outline-none border rounded-md border-orange-600` 
    const {ref: registerRef, ...registerProps} = register || {};

    const combinedRef = (node: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref && 'current' in ref) {
            (ref as RefObject<HTMLInputElement>).current = node;
        }
        if (registerRef) {
            registerRef(node);
        }
    };
    
    return(
        <div className="w-full">
            <input className={className} {...props} {...registerProps} ref={combinedRef} />
            {error && <span>{error}</span>}
        </div>
    )
});

export const InputM = forwardRef<HTMLInputElement, InputMProps>(({className, error, register, ...props}, ref)=>{

    className += ` w-full p-2 h-8 outline-none border rounded-md border-orange-600` 

    const {ref: registerRef, ...registerProps} = register || {};


    const combinedRef = (node: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref && 'current' in ref) {
            (ref as RefObject<HTMLInputElement>).current = node;
        }
        if (registerRef) {
            registerRef(node);
        }
    };
    
    return(
        <div className="w-full">
            <InputMask className={className} {...props} {...registerProps} ref={combinedRef} />
            {error && <span>{error}</span>}
        </div>
    )
});

export default Input;
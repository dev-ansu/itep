import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?:string;
}

export const ButtonPadrao = ({text, className, ...props}: ButtonProps)=>{
    className+=` p-2 rounded-lg font-medium text-white text-md bg-orange-600`
    return(
        <button {...props} className={className}>{text && text}</button>
    )
} 
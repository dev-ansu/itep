import { InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    register?: UseFormRegisterReturn;
    error?: string;
}

const Input = ({className, error, register, ...props}: InputProps)=>{
    className += ` w-full p-2 h-8 outline-none border rounded-md border-orange-600` 
    return(
        <div>
            <input className={className} {...props} {...register} />
            {error && <span>{error}</span>}
        </div>
    )
}

export default Input;
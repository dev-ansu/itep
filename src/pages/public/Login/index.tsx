import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
import { ButtonPadrao } from "../../../components/Button/index";
import Input from "../../../components/Input/index";
import { LoginData, loginValidationSchema } from "../../../schemas/loginValidationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { auth, db } from "../../../services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"

const Login = ()=>{
    const [verSenha, setVerSenha] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm<LoginData>({
        mode:"onChange",
        resolver: zodResolver(loginValidationSchema),
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    


    const failedAttempts = async(email: string)=>{
        const userRef = doc(db, 'failedLogings', email);
        try{
            const userDoc = await getDoc(userRef);
            if(userDoc.exists()){
                const data = userDoc.data();
                const now: any= new Date();
                const timeSinceLastAttempt = now - data.lastAttempt.toDate();

                if(data.failedAttempts >= 5 && timeSinceLastAttempt < 10 * 60 * 1000){
                    const timeRamaining = Math.ceil((10 * 60 * 1000 - timeSinceLastAttempt) / 60000)
                    toast.error(`Conta bloqueada temporariamente. Tente novamente em ${timeRamaining} minutos.`);
                    return;
                }else if(timeSinceLastAttempt >= 10*60*1000){
                    // Resetar as tentativas após o período de 10 minutos
                    await setDoc(userRef, {failedAttempts: 1, lastAttempt: new Date()});
                }else{
                    await setDoc(userRef, {failedAttempts: data.failedAttempts + 1, lastAttempt: now})
                }
            }else{
                await setDoc(userRef, {failedAttempts: 1, lastAttempt: new Date()});
            }
        }catch(err){
            setLoading(false);
            console.log(err);
            return false;
        }
    }
    useEffect(()=>{
        const handleLogout = async()=>{
            await signOut(auth);
        }
        handleLogout();
    },[]);
    
    const authentication = async(data: LoginData)=>{
        setLoading(true);
        try{
            const failed = await failedAttempts(data.email);
            
            if(failed) return;

            const userRef = await signInWithEmailAndPassword(auth, data.email, data.password);
            if(userRef.user){
                const userRef = doc(db, 'failedLogings', data.email);
                await setDoc(userRef, {failedAttempts: 0, lastAttempt: ''})
                toast.success('Usuário logado com sucesso.');
                setLoading(false);
                return navigate('/app');
            }else{
                await failedAttempts(data.email);
                toast.error('Usuário não autenticado.');
                setLoading(false);
                return;
            }
        }catch(err){
            await failedAttempts(data.email);
            setLoading(false);
            toast.error('Usuário não autenticado.');
            console.log(err);
        }     
    }

    return(
        <div className="flex flex-col h-screen w-full bg-white justify-center items-center">
            <img src="/img/logo.jpeg" className="w-48" />
            <form onSubmit={handleSubmit(authentication)} className='flex gap-4 w-full max-w-md flex-col'>
                <div className="w-full">
                    <label className="text-xl font-medium">E-mail</label>
                    <Input 
                        register={register("email")}
                        error={errors.email?.message}
                        autoFocus
                        placeholder="Digite seu e-mail"
                    />
                </div>

                <div className="w-full">
                    <label className="text-xl font-medium">Senha</label>
                    <Input 
                        type={verSenha ? 'text':'password'}
                        register={register("password")}
                        error={errors.password?.message}
                        placeholder="Digite sua senha"
                    />
                    <div className="flex gap-2 items-center">
                        <input type="checkbox"  id="verSenha" onClick={()=> setVerSenha(!verSenha)} />
                        <label htmlFor="verSenha">Ver senha</label>
                    </div>
                </div>
                <ButtonPadrao 
                    disabled={loading ? true:false}
                    text={loading ? 'Aguarde...':'Acessar'} 
                />
            </form>
        </div>
    )
}


export default Login;
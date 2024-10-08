import {useNavigate, Link} from "react-router-dom"
import { useForm } from "react-hook-form";
import { ButtonPadrao } from "../../../components/Button/index";
import Input from "../../../components/Input/index";
import { LoginData, loginValidationSchema } from "../../../schemas/loginValidationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { auth, db } from "../../../services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import { doc, runTransaction, Timestamp } from "firebase/firestore"


interface FailedLoginData {
    failedAttempts: number;
    lastAttempt: Timestamp;
}

const Login = ()=>{
    const [verSenha, setVerSenha] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm<LoginData>({
        mode:"onChange",
        resolver: zodResolver(loginValidationSchema),
    });
    const [timeSinceLastAttempt, setTimeSinceLastAttempt] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const failedAttempts = async(email: string)=>{
        const userRef = doc(db, 'failedLogings', email);
            await runTransaction(db, async(transaction: any)=>{
                const userDoc = await transaction.get(userRef);
                const now: any= new Date();

                if(userDoc.exists()){
                    const data = userDoc.data() as FailedLoginData;
                    const now: any= new Date();
                    const timeSinceLastAttempt = data.lastAttempt ? now.getTime() - data.lastAttempt.toDate().getTime():0;
    
                    if(data.failedAttempts >= 5 && timeSinceLastAttempt < 10 * 60 * 1000){
                        setTimeSinceLastAttempt(timeSinceLastAttempt);
                        throw new Error('Account temporarily locked');
                    }

                    if(timeSinceLastAttempt >= 10*60*1000){
                        // Resetar as tentativas após o período de 10 minutos
                        transaction.set(userRef, {failedAttempts: 1, lastAttempt: now})
                        // await setDoc(userRef, {failedAttempts: 1, lastAttempt: new Date()});
                    }else{
                        transaction.update(userRef, {failedAttempts: data.failedAttempts + 1, lastAttempt: now})
                        // await setDoc(userRef, {failedAttempts: data.failedAttempts + 1, lastAttempt: now})
                    }
                }else{
                    transaction.set(userRef, { failedAttempts: 1, lastAttempt: now });
                    // await setDoc(userRef, {failedAttempts: 1, lastAttempt: new Date()});
                }

            })
            return false; // Not blocked
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
            try{
                await failedAttempts(data.email);
           }catch(err: any){
                if(err.message === "Account temporarily locked"){
                    const timeRamaining = Math.ceil((10 * 60 * 1000 - timeSinceLastAttempt) / 60000)
                    toast.error(`Conta bloqueada temporariamente. Tente novamente em ${timeRamaining} minutos.`);
                    setLoading(false);
                    return;
                }
            }
            const userRef = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userRef.user;

            if(user){
                const userRef = doc(db, 'failedLogings', data.email);
                await runTransaction(db, async (transaction) => {
                    transaction.update(userRef, { failedAttempts: 0, lastAttempt: new Date() });
                });
                toast.success('Usuário logado com sucesso.');
                setLoading(false);
                return navigate('/app');
            }
            throw new Error('error');
        }catch(error: any){  
            
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
                toast.error('Credenciais inválidas. Verifique seu e-mail e senha.');
            } else {
                toast.error('Erro ao autenticar. Tente novamente mais tarde.');
            }
            setLoading(false);
            console.log(error.message);
        }     
    }

    return(
        <div className="flex p-4 flex-col h-screen w-full bg-white justify-center items-center">

            <Link to="/">
                <img src="/img/logo.jpeg" className="w-48" />
            </Link>
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
                    <div className="flex mt-2 gap-2 items-center">
                        <input className="cursor-pointer" type="checkbox"  id="verSenha" onClick={()=> setVerSenha(!verSenha)} />
                        <label className="cursor-pointer" htmlFor="verSenha">Ver senha</label>
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
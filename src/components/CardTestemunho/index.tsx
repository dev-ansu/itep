interface CardTestemunhoProps{
    testemunho: TestemunhoProps;
}

export interface TestemunhoProps{
    id: string;
    aluno: string;
    testemunho: string;
}

const CardTestemunho = ({testemunho}:CardTestemunhoProps)=>{
    return(
        <div key={testemunho.id} className="p-4">
            <div className="backdrop-blur-md border relative border-white/10 flex text-left items-center justify-center p-4  rounded-lg bg-zinc-500/70">
                <p className="text-white">
                    {testemunho?.testemunho}
                </p>
                <div style={{clipPath:"polygon(50% 0%, 0% 100%, 100% 100%)"}} className="backdrop-blur-md   -bottom-[33px] rotate-180 left-5 flex text-left items-center justify-center p-4 h-2 w-16 absolute bg-zinc-500/70">
            </div>
            </div>
            <div className="my-8">
                <h2 className="font-medium text-xl">{testemunho?.aluno}</h2>
            </div>
        </div>
    )
}

export default CardTestemunho
import Container from "../Container";

const Testemunho = ()=>{
    return (
        <div style={{backgroundImage:"url(/img/sobre2.jpeg)", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
            <Container>
                <div className="text-center">
                    <h1 className="text-4xl text-center font-bold uppercase">Depoimentos <span className="text-orange-600">nossos alunos</span></h1>                
                    <p className="italic text-zinc-400 text-center">Conheça nossos principais cursos.</p>
                </div>
                <div className="w-full grid md:grid-cols-3 gap-8 grid-cols-1 my-16">
                    
                    {[...Array(3).keys()].map(i =>(
                            <div key={i} className="p-4">
                                <div className="backdrop-blur-md border relative border-white/10 flex text-left items-center justify-center p-4  rounded-lg bg-zinc-500/70">
                                    <p className="text-white">
                                        "Aprendi programação web com o professor Hugo e recomendo demais, atualmente tenho uma empresa de desenvolvimento e desenvolvo sistemas web e aplicativos mobile, excelente professor e um excelente suporte, sempre trocamos informações para o crescimento de ambos!!"
                                    </p>
                                    <div style={{clipPath:"polygon(50% 0%, 0% 100%, 100% 100%)"}} className="backdrop-blur-md   -bottom-[33px] rotate-180 left-5 flex text-left items-center justify-center p-4 h-2 w-16 absolute bg-zinc-500/70">
                                </div>
                                </div>
                                <div className="my-8">
                                    <h2 className="font-medium text-xl">Aluno ITEP</h2>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </Container>

        </div>
    )
}

export default Testemunho;
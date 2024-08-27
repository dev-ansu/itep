import { z } from "zod";

export const cursosValidationSchema = z.object({
    nome: z.string().min(1, 'Campo obrigatório'),
    carga_horaria: z.string().regex(/^[0-9]+$/,{message:"Digite apenas números."}),
    certificacao: z.string().min(1, 'Campo obrigatório.'),
    descricao: z.string().min(1, 'Campo obrigatório'),
})

export type CursosData = z.infer<typeof cursosValidationSchema>;
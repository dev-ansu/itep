import { z } from "zod"

export const loginValidationSchema = z.object({
    email: z.string().min(1, 'Campo obrigatório.').email('Digite um e-mail válido.'),
    password: z.string().min(1,'Campo obrigatório.')
});

export type LoginData = z.infer<typeof loginValidationSchema>;
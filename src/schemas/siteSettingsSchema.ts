import { z } from "zod";


const validatePhoneNumber = (value: string) => {
    // Expressão regular para os formatos (00) 99999-9999 e (00) 9999-9999
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(value);
  };

export const siteSettingsSchema = z.object({
    whatsapp: z.union([z.number(), z.string().min(1, 'O campo é obrigatório.')]).refine((value)=>{
      const stringValue = typeof value === 'number' ? value.toString() : value;
      return validatePhoneNumber(stringValue);
    },{message:"Digite um telefone válido."}),
    email: z.string().min(1, 'Campo obrigatório.').email('Digite um e-mail válido.'),
    text_cabecalho: z.string().min(1, 'Campo é obrigatório'),
    sobre_nos: z.string().min(1, 'Campo é obrigatório'),
})

export type SiteData = z.infer<typeof siteSettingsSchema>;
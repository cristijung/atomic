//arquivo de validação do formulário
// nome atribuído da validação, q vai ser o nome do campo, associado: ao tipo, ao tamanho, a mensagem
// de retorno e ao máximo.

import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }).max(100),
    email: z.string().email({ message: 'Por favor, insira um email válido' }),
    subject: z.string().min(5, { message: 'O assunto deve ter no mínimo 5 caracteres.' }).max(150),
    message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }).max(1000),
    consent: z.boolean().refine(val => val === true, {
        message: 'Você deve concordar com os termos de aceite.'
    })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
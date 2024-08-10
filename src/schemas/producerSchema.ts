import * as z from "zod";

export const producerSchema = z.object({
  cpfOrCnpj: z
    .string()
    .min(11, "CPF ou CNPJ inválido")
    .max(14, "CPF ou CNPJ inválido"),
  producerName: z.string().min(1, "Nome é obrigatório"),
  farmName: z.string().min(1, "Nome da fazenda é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório").max(2, "Estado inválido"),
  totalArea: z.number().positive("Área total deve ser positiva"),
  agriculturalArea: z.number().positive("Área agricultável deve ser positiva"),
  vegetationArea: z.number().positive("Área de vegetação deve ser positiva"),
  crops: z.array(
    z.enum(["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"])
  ),
});

export type ProducerType = z.infer<typeof producerSchema>;

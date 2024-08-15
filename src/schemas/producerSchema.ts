import { BaseObj } from "@/types/baseObj";
import * as z from "zod";
import { cropsSchema } from "./cropSchema";
import { validateCNPJ, validateCPF } from "@/utils";

export const producerSchema = z
  .object({
    id: z.string().optional(),
    cpfOrCnpj: z
      .string({
        required_error: "CPF/CNPJ é obrigatório.",
      })
      .refine(
        (doc) => {
          const cleanedDoc = doc.replace(/\D/g, "");
          return cleanedDoc.length === 11 || cleanedDoc.length === 14;
        },
        {
          message: "CPF/CNPJ deve conter 11 ou 14 números.",
        }
      )
      .refine((doc) => /^\d+$/.test(doc.replace(/\D/g, "")), {
        message: "CPF/CNPJ deve conter apenas números.",
      })
      .refine(
        (doc) => {
          const cleanedDoc = doc.replace(/\D/g, "");
          return cleanedDoc.length === 11 ? validateCPF(cleanedDoc) : true;
        },
        {
          message: "CPF inválido",
        }
      )
      .refine(
        (doc) => {
          const cleanedDoc = doc.replace(/\D/g, "");
          return cleanedDoc.length === 14 ? validateCNPJ(cleanedDoc) : true;
        },
        {
          message: "CNPJ inválido",
        }
      ),
    producerName: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(80, "O nome deve ter no máximo 80 caracteres"),
    farmName: z
      .string()
      .min(1, "Nome da fazenda é obrigatório")
      .max(100, "O nome da fazenda deve ter no máximo 100 caracteres"),
    city: z
      .string()
      .min(1, "Cidade é obrigatória")
      .max(50, "A cidade de ter no máximo 50 caracteres"),
    state: z
      .string()
      .min(2, "Estado é obrigatório")
      .max(2, "Estado inválido, informe a sigla com 2 dígitos ex: SP"),
    totalArea: z
      .number({
        invalid_type_error: "Área total deve ser um número, campo obrigatório",
        required_error: "Área total é obrigatória",
      })
      .positive("Área total deve ser positiva"),
    agriculturalArea: z
      .number({
        invalid_type_error:
          "Área agricultável deve ser um número, campo obrigatório",
        required_error: "Área agricultável é obrigatória",
      })
      .positive("Área agricultável deve ser positiva"),
    vegetationArea: z
      .number({
        invalid_type_error:
          "Área de vegetação deve ser um número, campo obrigatório",
        required_error: "Área de vegetação é obrigatória",
      })
      .positive("Área de vegetação deve ser positiva"),
    crops: cropsSchema
      .array()
      .min(1, { message: "Selecione ao menos uma cultura" }),
  })
  .superRefine((data, ctx) => {
    if (data.agriculturalArea + data.vegetationArea > data.totalArea) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A soma da área agrícultável e área de vegetação não deve ser maior que a área total.",
        path: ["agriculturalArea"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A soma da área agrícultável e área de vegetação não deve ser maior que a área total.",
        path: ["vegetationArea"],
      });
    }
  });

export type ProducerType = z.infer<typeof producerSchema> & BaseObj;

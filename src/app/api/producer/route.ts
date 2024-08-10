import { producerSchema } from "@/schemas/producerSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validar os dados do formulário usando Zod
    const result = producerSchema.parse(body);

    // Simular o armazenamento dos dados e retornar uma resposta de sucesso
    return NextResponse.json(
      { message: "Producer registered successfully", data: result },
      { status: 200 }
    );
  } catch (e: any) {
    // Retornar uma resposta de erro em caso de falha na validação
    return NextResponse.json({ error: e.errors }, { status: 400 });
  }
}

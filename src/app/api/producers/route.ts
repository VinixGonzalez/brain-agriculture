import { producerSchema } from "@/schemas/producerSchema";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const filePath = path.join(process.cwd(), "src", "mocks", "producers.json");

export async function POST(req: NextRequest) {
  try {
    const listPath = "/producers";
    revalidatePath(listPath);

    const body = await req.json();
    const result = producerSchema.parse(body);

    let producers = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      producers = JSON.parse(data);
    } else {
      producers = [result];
      fs.writeFileSync(filePath, JSON.stringify(producers, null, 2));

      return NextResponse.json(
        {
          message: "Produtor registrado com sucesso",
          success: true,
          data: result,
        },
        { status: 200 }
      );
    }

    producers.push(result);

    fs.writeFileSync(filePath, JSON.stringify(producers, null, 2));

    revalidatePath(listPath);

    return NextResponse.json(
      {
        message: "Produtor registrado com sucesso",
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);

    return NextResponse.json({ error: e.errors }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const producers = await JSON.parse(data);

      return NextResponse.json(producers, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (e: any) {
    console.log(e);

    return NextResponse.json(
      { error: "Falha ao ler lista de produtores" },
      { status: 500 }
    );
  }
}

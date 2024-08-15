import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { producerSchema, ProducerType } from "@/schemas/producerSchema";
import { revalidatePath } from "next/cache";

const filePath = path.join(process.cwd(), "src", "mocks", "producers.json");

const readProducers = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
  return [];
};

const writeProducers = (producers: ProducerType[]) => {
  fs.writeFileSync(filePath, JSON.stringify(producers, null, 2));
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const producers = JSON.parse(data);

      const producer = producers.find((p: any) => p.id === id);

      if (producer) {
        return NextResponse.json(producer, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Produtor não encontrado" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "O arquivo de produtores não pode ser carregado" },
        { status: 500 }
      );
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: "Falha ao ler a lista de produtores" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listPath = "/producers";
  revalidatePath(listPath);

  try {
    const id = params.id;
    const body = await req.json();

    const result = producerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(result.error.errors, { status: 400 });
    }

    let producers = readProducers() as Array<ProducerType>;
    const index = producers.findIndex((producer) => producer.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Produtor não encontrado", success: false },
        { status: 404 }
      );
    }

    producers[index] = { ...producers[index], ...body };

    writeProducers(producers);

    return NextResponse.json(
      { message: "Produtor atualizado com sucesso", success: true },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: "Falha ao atualizar o produtor", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listPath = "/producers";
  revalidatePath(listPath);

  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório", success: false },
        { status: 400 }
      );
    }

    let producers = readProducers();
    const initialLength = producers.length;
    producers = producers.filter(
      (producer: ProducerType) => producer.id !== id
    );

    if (producers.length === initialLength) {
      return NextResponse.json(
        { error: "Produtor não encontrado", success: false },
        { status: 404 }
      );
    }

    writeProducers(producers);

    return NextResponse.json(
      { message: "Produtor removido com sucesso", success: true },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: "Falha ao remover o produtor", success: false },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "mocks", "crops.json");

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
      { error: "Falha ao ler a lista de culturas" },
      { status: 500 }
    );
  }
}

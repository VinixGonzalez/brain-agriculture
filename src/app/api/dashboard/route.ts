import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ProducerType } from "@/schemas/producerSchema";
const filePath = path.join(process.cwd(), "src", "mocks", "producers.json");

interface LandUse {
  agriculturalArea: number;
  vegetationArea: number;
}

interface FarmsByState {
  [key: string]: number;
}

interface FarmsByCrop {
  [key: string]: number;
}

export async function GET(req: NextRequest) {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          totalFarms: 0,
          totalArea: 0,
          farmsByState: {},
          farmsByCrop: {},
          landUse: { agriculturalArea: 0, vegetationArea: 0 },
        },
        { status: 200 }
      );
    }

    const data = fs.readFileSync(filePath, "utf8");
    const producers: ProducerType[] = JSON.parse(data);

    const totalFarms = producers.length;
    const totalArea = producers.reduce(
      (acc, producer) => acc + producer.totalArea,
      0
    );

    const farmsByState = producers.reduce((acc: FarmsByState, producer) => {
      acc[producer.state] = (acc[producer.state] || 0) + 1;
      return acc;
    }, {});

    const farmsByCrop = producers.reduce((acc: FarmsByCrop, producer) => {
      producer.crops.forEach((crop) => {
        acc[crop.label] = (acc[crop.label] || 0) + 1;
      });
      return acc;
    }, {});

    const landUse = producers.reduce(
      (acc: LandUse, producer) => {
        acc.agriculturalArea += producer.agriculturalArea;
        acc.vegetationArea += producer.vegetationArea;
        return acc;
      },
      { agriculturalArea: 0, vegetationArea: 0 }
    );

    const dashboardData = {
      totalFarms,
      totalArea,
      farmsByState,
      farmsByCrop,
      landUse,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to read producers" },
      { status: 500 }
    );
  }
}

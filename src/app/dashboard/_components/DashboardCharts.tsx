"use client";

import { Card, Loader } from "@/components";
import { useToast } from "@/hooks";
import { DashboardService } from "@/service";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

interface DashboardDataResponse {
  farmsByCrop: {
    [key: string]: number | string;
  };
  farmsByState: {
    [key: string]: number | string;
  };
  landUse: {
    agriculturalArea: number;
    vegetationArea: number;
  };
  totalArea: number;
  totalFarms: number;
}

const DashboardCharts = () => {
  const toast = useToast();
  const [data, setData] = useState<DashboardDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [farmsByStateData, setFarmsByStateData] = useState<
    Array<[string, number | string]>
  >([]);
  const [farmsByCropData, setFarmsByCropData] = useState<
    Array<[string, number | string]>
  >([]);
  const [landUseData, setLandUseData] = useState<(string | number)[][]>([]);

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const response = await DashboardService.getDashboardData();
      setData(response);
    } catch (error) {
      console.log(error);
      toast.notify(
        "Ocorreu um erro ao buscar os dados do dashboard, tente novamente",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      const farmsByStateData: Array<[string, number | string]> = [
        ["Estado", "Quantidade"],
      ];
      for (const state in data.farmsByState) {
        farmsByStateData.push([state, data.farmsByState[state]]);
      }

      const farmsByCropData: Array<[string, number | string]> = [
        ["Cultura", "Quantidade"],
      ];
      for (const crop in data.farmsByCrop) {
        farmsByCropData.push([crop, data.farmsByCrop[crop]]);
      }

      const landUseData = [
        ["Uso do Solo", "Área (hectares)"],
        ["Área Agricultável", data?.landUse.agriculturalArea || 0],
        ["Área de Vegetação", data?.landUse.vegetationArea || 0],
      ];

      setFarmsByStateData(farmsByStateData);
      setFarmsByCropData(farmsByCropData);
      setLandUseData(landUseData);
    }
  }, [data]);

  const chartOptions = {
    is3D: true,
    backgroundColor: "#fff",
    titleTextStyle: {
      fontSize: 16,
    },
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        fontSize: 14,
      },
    },
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-8 mt-12">
      <div className="w-72 sm:w-96 hover:scale-105 transition-transform duration-300">
        <Card>
          <p className="text-center font-bold">Total de Fazendas</p>
          <p className="text-center font-semibold text-5xl mt-8">
            {data?.totalFarms}
          </p>
        </Card>
      </div>
      <div className="w-72 sm:w-96 hover:scale-105 transition-transform duration-300">
        <Card>
          <p className="text-center font-bold">Área Total</p>
          <p className="text-center font-semibold text-5xl mt-8">
            {data?.totalArea} <small className="text-xl">ha</small>
          </p>
        </Card>
      </div>
      <div className="w-72 sm:w-96 hover:scale-105 transition-transform duration-300">
        <Card>
          <p className="px-4 mt-2 text-center font-semibold">
            Fazendas por estado
          </p>
          <Chart
            chartType="PieChart"
            data={farmsByStateData}
            options={{ ...chartOptions }}
          />
        </Card>
      </div>

      <div className="w-72 sm:w-96 hover:scale-105 transition-transform duration-300">
        <Card>
          <p className="px-4 mt-2 text-center font-semibold">
            Fazendas por cultura
          </p>
          <Chart
            chartType="PieChart"
            data={farmsByCropData}
            options={{ ...chartOptions }}
          />
        </Card>
      </div>

      <div className="w-72 sm:w-96 hover:scale-105 transition-transform duration-300">
        <Card>
          <p className="px-4 mt-2 text-center font-semibold">Uso do solo</p>
          <Chart
            chartType="PieChart"
            data={landUseData}
            options={{ ...chartOptions }}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;

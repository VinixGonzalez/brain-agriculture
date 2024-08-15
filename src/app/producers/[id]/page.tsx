"use client";

import { Breadcrumb, Card, Loader } from "@/components";
import { ProducerType } from "@/schemas/producerSchema";
import { ProducerService } from "@/service/producerService";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaCogs } from "react-icons/fa";
import {
  GiCorn,
  GiCottonFlower,
  GiFarmer,
  GiGrainBundle,
  GiSugarCane,
} from "react-icons/gi";
import { PiCoffeeBeanDuotone } from "react-icons/pi";
import { TbGrain } from "react-icons/tb";
import { DetailProducerActions } from "./_components";
import { useToast } from "@/hooks";

const ProducerDetailPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const toast = useToast();
  const [producer, setProducer] = useState<ProducerType | null>(null);
  const [loading, setLoading] = useState(false);

  const getProducer = async () => {
    setLoading(true);

    try {
      const data = (await ProducerService.getProducer(
        params.id
      )) as ProducerType;
      setProducer(data);
    } catch (error) {
      console.log(error);
      toast.notify("Ocorreu um erro", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducer();
  }, []);

  const getCropIcon = (cropName: string) => {
    const mappedCropIds: { [key: string]: React.ReactNode } = {
      "1": <GiCottonFlower size={32} />,
      "2": <PiCoffeeBeanDuotone size={32} />,
      "3": <GiSugarCane size={32} />,
      "4": <GiCorn size={32} />,
      "5": <TbGrain size={32} />,
    };

    return mappedCropIds[cropName];
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-lg px-4 mx-auto text-green-800 ">
      <section
        id="producerHeader"
        className="flex border-b border-b-green-800 items-center py-2 justify-center gap-4"
      >
        <GiFarmer size={36} />
        <h1 className="text-3xl font-bold">Detalhe</h1>
      </section>

      <Breadcrumb
        crumbs={[
          { name: "Produtores", href: "/producers", isCurrentPage: false },
          { name: "Detalhe", href: "#", isCurrentPage: true },
        ]}
      />

      <section className="my-12 flex-wrap gap-6 flex flex-col w-full sm:flex-row">
        <Card
          className="w-full x"
          title={`${producer?.producerName} - ${producer?.farmName}`}
          titleIcon={<BiUser size={20} />}
        >
          <div className="flex-1 px-4 py-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <small className="text-xs">CIDADE</small>
                <p className="text-lg">{producer?.city}</p>
              </div>
              <div className="flex flex-col">
                <small className="text-xs">ESTADO</small>
                <p className="text-lg">{producer?.state}</p>
              </div>
              <div className="flex flex-col">
                <small className="text-xs sm:text-end">CPF/CNPJ</small>
                <p className="text-lg sm:text-end">{producer?.cpfOrCnpj}</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <small className="text-xs">ÁREA AGRICULTÁVEL</small>
                <p className="text-lg">
                  {producer?.agriculturalArea} <small>ha</small>
                </p>
              </div>
              <div className="flex flex-col">
                <small className="text-xs">ÁREA DE VEGETAÇÃO</small>
                <p className="text-lg">
                  {producer?.vegetationArea} <small>ha</small>
                </p>
              </div>
              <div className="flex flex-col">
                <small className="text-xs sm:text-end">ÁREA TOTAL</small>
                <p className="text-lg sm:text-end">
                  {producer?.totalArea} <small>ha</small>
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title="Plantações"
          className="w-full"
          titleIcon={<GiGrainBundle size={24} />}
        >
          {producer?.crops && producer.crops.length > 0 ? (
            <ul className="flex flex-wrap sm:items-center py-4">
              {producer?.crops.map((crop) => (
                <li key={crop.value} className="my-2 px-4">
                  <div className="flex flex-col items-center">
                    <small className="text-center font-bold">
                      {crop.label}
                    </small>
                    {getCropIcon(crop.value)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">Nenhum plantio encontrado</p>
          )}
        </Card>
        <Card title="Ações" className="w-full" titleIcon={<FaCogs size={22} />}>
          <DetailProducerActions id={producer?.id as string} />
        </Card>
      </section>
    </div>
  );
};

export default ProducerDetailPage;

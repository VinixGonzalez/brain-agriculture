"use client";

import React, { useEffect, useState } from "react";
import { GiFarmer } from "react-icons/gi";
import { RegisterProducerForm } from "../../_components";
import { ProducerService } from "@/service/producerService";
import { ProducerType } from "@/schemas/producerSchema";
import { CircularProgress } from "@chakra-ui/react";
import { Loader } from "@/components";
import { useToast } from "@/hooks";

const EditProducerPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const toast = useToast();
  const [data, setData] = useState<ProducerType>();
  const [loading, setLoading] = useState(false);

  const getProducer = async () => {
    try {
      const data = await ProducerService.getProducer(params.id);
      setData(data);
      console.log(data);
    } catch (error) {
      toast.notify("Erro ao tentar obter os dados do produtor", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducer();
  }, []);

  if (!data || loading) return <Loader />;

  return (
    <div className="flex-1 max-w-screen-lg px-4 mx-auto text-green-800">
      <section
        id="producerHeader"
        className="flex border-b border-b-green-800 items-center py-2 justify-center gap-4"
      >
        <GiFarmer size={36} />
        <h1 className="text-3xl font-bold">Editar Produtor</h1>
      </section>
      <section id="registerProducerForm">
        <RegisterProducerForm edit values={data} />
      </section>
    </div>
  );
};

export default EditProducerPage;

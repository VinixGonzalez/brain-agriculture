"use client";

import { Button, Loader } from "@/components";
import { ProducerService } from "@/service/producerService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgUserAdd } from "react-icons/cg";
import { GiFarmer } from "react-icons/gi";
import { ListProducerMobile, ListProducerTable } from "./_components";
import { useToast } from "@/hooks";
import { ProducerType } from "@/schemas/producerSchema";

const ProducerPage = () => {
  const [data, setData] = useState<Array<ProducerType>>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getProducers = async () => {
    setLoading(true);
    try {
      const data = await ProducerService.getProducersList();
      setData(data);
    } catch (error) {
      console.log(error);
      toast.notify("Ocorreu um erro ao buscar a lista de produtores.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducers();
  }, []);

  if (loading || !data.length) {
    return <Loader />;
  }

  return (
    <div className="flex-1 max-w-screen-lg px-4 mx-auto text-green-800">
      <section
        id="producerHeader"
        className="flex border-b border-b-green-800 items-center py-2 justify-center gap-4"
      >
        <GiFarmer size={36} />
        <h1 className="text-2xl sm:text-3xl font-bold">Produtores Rurais</h1>
      </section>
      <section id="addProducer" className="mb-4 mt-12 shadow-md w-fit">
        <Link href={"/producers/new"}>
          <Button type="button" btnText="Adicionar" size="medium">
            <CgUserAdd size={18} />
          </Button>
        </Link>
      </section>

      <section
        id="producerList"
        className="flex flex-col gap-2 mt-8 bg-slate-100 p-4 border rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold">Lista de produtores</h2>

        <div className="hidden sm:inline">
          <ListProducerTable list={data} />
        </div>

        <div className="sm:hidden">
          <ListProducerMobile list={data} />
        </div>
      </section>
    </div>
  );
};

export default ProducerPage;

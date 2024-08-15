import React from "react";
import { GiFarmer } from "react-icons/gi";
import { RegisterProducerForm } from "../_components";
import { Breadcrumb } from "@/components";

const NewProducerPage = () => {
  return (
    <div className="flex-1 max-w-screen-lg px-4 mx-auto text-green-800">
      <section
        id="producerHeader"
        className="flex border-b border-b-green-800 items-center py-2 justify-center gap-4"
      >
        <GiFarmer size={36} />
        <h1 className="text-3xl font-bold">Novo Produtor</h1>
      </section>

      <Breadcrumb
        crumbs={[
          { name: "Produtores", href: "/producers", isCurrentPage: false },
          { name: "Novo produtor", href: "#", isCurrentPage: true },
        ]}
      />

      <section id="registerProducerForm">
        <RegisterProducerForm />
      </section>
    </div>
  );
};

export default NewProducerPage;

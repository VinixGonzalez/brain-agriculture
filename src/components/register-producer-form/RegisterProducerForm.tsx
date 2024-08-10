"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProducerType, producerSchema } from "@/schemas/producerSchema";
import { Input } from "../";

export const RegisterProducerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProducerType>({
    resolver: zodResolver(producerSchema),
  });

  const onSubmit = async (data: ProducerType) => {
    try {
      const response = await fetch("/api/register-producer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Producer registered successfully:", result);
      } else {
        console.error("Error registering producer:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 px-6"
    >
      <Input
        register={{ ...register("cpfOrCnpj") }}
        label="CPF ou CNPJ"
        error={Boolean(errors.cpfOrCnpj)}
        errorMsg={errors.cpfOrCnpj?.message}
      />

      <Input
        register={{ ...register("producerName") }}
        label="Nome do Produtor"
        error={Boolean(errors.producerName)}
        errorMsg={errors.producerName?.message}
      />

      <Input
        register={{ ...register("farmName") }}
        label="Nome da Fazenda"
        error={Boolean(errors.farmName)}
        errorMsg={errors.farmName?.message}
      />

      <Input
        register={{ ...register("city") }}
        label="Cidade"
        error={Boolean(errors.city)}
        errorMsg={errors.city?.message}
      />

      <Input
        register={{ ...register("state") }}
        label="Estado"
        error={Boolean(errors.state)}
        errorMsg={errors.state?.message}
        placeholder="ex: MG"
      />

      <Input
        label="Área Total (hectares)"
        type="number"
        register={{ ...register("totalArea", { valueAsNumber: true }) }}
        error={Boolean(errors.totalArea)}
        errorMsg={errors.totalArea?.message}
        placeholder="Somente números"
      />

      <Input
        label="Área Agricultável (hectares)"
        type="number"
        register={{
          ...register("agriculturalArea", { valueAsNumber: true }),
        }}
        error={Boolean(errors.agriculturalArea)}
        errorMsg={errors.agriculturalArea?.message}
        placeholder="Somente números"
      />

      <Input
        label="Área de Vegetação (hectares)"
        type="number"
        register={{ ...register("vegetationArea", { valueAsNumber: true }) }}
        error={Boolean(errors.vegetationArea)}
        errorMsg={errors.vegetationArea?.message}
        placeholder="Somente números"
      />

      <div>
        <label>Culturas Plantadas</label>
        <select multiple {...register("crops")}>
          <option value="Soja">Soja</option>
          <option value="Milho">Milho</option>
          <option value="Algodão">Algodão</option>
          <option value="Café">Café</option>
          <option value="Cana de Açúcar">Cana de Açúcar</option>
        </select>
        {errors.crops && <p>{errors.crops.message}</p>}
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
};

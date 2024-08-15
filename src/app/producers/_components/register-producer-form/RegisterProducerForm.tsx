"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProducerType, producerSchema } from "@/schemas/producerSchema";
import { Button, Input } from "@/components";
import { v4 as uuidv4 } from "uuid";
import { CropsService } from "@/service/cropsService";
import { CropsSchemaType } from "@/schemas/cropSchema";
import { formatCpfCnpj } from "@/utils/cpfCnpjFormater";
import { MdOutlineAddCircle } from "react-icons/md";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import { BiCheckDouble, BiEdit } from "react-icons/bi";
import ControlledSelect from "@/components/select/Select";
import { ProducerService } from "@/service/producerService";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";

type GetCropListResponse = {
  cultures: Array<{ id: string; name: string }>;
};

type RegisterProducerFormProps = {
  values?: ProducerType;
  edit?: boolean;
};

export const RegisterProducerForm: React.FC<RegisterProducerFormProps> = ({
  values,
  edit,
}) => {
  const [crops, setCrops] = useState<Array<CropsSchemaType>>([
    {
      label: "",
      value: "",
    },
  ]);

  const toast = useToast();
  const modal = useModal();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProducerType>({
    resolver: zodResolver(producerSchema),
    defaultValues: { ...values },
  });

  const onSubmit = async (data: ProducerType) => {
    debugger;
    try {
      if (edit && data.id) {
        const response = await ProducerService.updateProducer(data.id, data);

        if (!response.success) {
          toast.notify(response.message, "error");
          return;
        }
        toast.notify(response.message, "success");

        router.push(`/producers/${data.id}`);
        return;
      }

      const id = uuidv4();
      data = { ...data, id };
      const response = await ProducerService.createProducer(data);

      debugger;
      if (!response.success) {
        toast.notify("Ocorreu um erro ao registrar o produtor", "error");
        return;
      }

      modal.openModal({
        title: "Produtor inserido com sucesso",
        content: (
          <div className="flex flex-col gap-4 pb-6">
            <div className="text-center mx-auto">
              <BiCheckDouble className="text-primary" size={48} />
            </div>
            <div className="flex flex-col gap-1">
              <p>O Produtor foi inserido com sucesso!</p>
              <p>Deseja adicionar um novo registro?</p>
            </div>
            <div className="flex items-center mt-8 gap-6">
              <Link href={"/producers"}>
                <Button
                  onClick={() => {
                    modal.onClose();
                  }}
                  variant="secondary"
                  btnText="Lista de produtores"
                />
              </Link>
              <Button
                btnText="Adicionar novo"
                onClick={() => {
                  modal.onClose();
                }}
              />
            </div>
          </div>
        ),
      });
    } catch (error) {
      toast.notify("Ocorreu um erro", "error");
    }
  };

  const fetchCrops = async () => {
    try {
      const response =
        (await CropsService.getCropsList()) as GetCropListResponse;
      if (!response.cultures) {
        return;
      }
      const crops = response.cultures.map((culture) => ({
        value: culture.id,
        label: culture.name,
      }));

      setCrops(crops);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          register={{
            ...register("cpfOrCnpj", {
              onChange: (e) => {
                const { value } = e.target;
                e.target.value = formatCpfCnpj(value);
              },
            }),
          }}
          label="CPF ou CNPJ"
          error={Boolean(errors.cpfOrCnpj)}
          errorMsg={errors.cpfOrCnpj?.message}
          maxLength={18}
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

        <ControlledSelect<ProducerType, CropsSchemaType, true>
          register={{ ...register("crops") }}
          isMulti
          name="crops"
          control={control}
          label="Culturas plantadas"
          placeholder="Selecione as culturas"
          options={crops}
          useBasicStyles
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

        <Input
          label="Área Total (hectares)"
          type="number"
          register={{ ...register("totalArea", { valueAsNumber: true }) }}
          error={Boolean(errors.totalArea)}
          errorMsg={errors.totalArea?.message}
          placeholder="Somente números"
        />
      </div>

      <hr className="my-8" />

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          btnText={edit ? "Editar" : "Adicionar"}
          size="large"
        >
          {edit ? <BiEdit /> : <MdOutlineAddCircle />}
        </Button>
      </div>
    </form>
  );
};

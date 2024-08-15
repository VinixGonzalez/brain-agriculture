"use client";

import React from "react";
import { Button } from "@/components";
import { BiEdit, BiTrash } from "react-icons/bi";
import Link from "next/link";
import { useModal, useToast } from "@/hooks";
import { ProducerService } from "@/service/producerService";
import { useRouter } from "next/navigation";

type DetailProducerActionsProps = {
  id: string;
};

export const DetailProducerActions: React.FC<DetailProducerActionsProps> = ({
  id,
}) => {
  const toast = useToast();
  const router = useRouter();
  const modal = useModal();
  const handleRemoveProducer = () => {
    modal.openModal({
      title: "Remover produtor",
      content: (
        <div>
          <p>Tem certeza que deseja remover o produtor?</p>
        </div>
      ),
      footer: (
        <div className="flex gap-4">
          <Button
            onClick={async () => {
              try {
                const res = await ProducerService.deleteProducer(id);
                if (!res.success) {
                  return;
                }
                console.log(res);
                toast.notify("Produtor removido com sucesso.", "success");
                router.push("/producers");
              } catch (error) {
                console.log(error);
                toast.notify(
                  "Ocorreu um erro ao tentar remover o produtor.",
                  "error"
                );
              } finally {
                modal.onClose();
              }
            }}
          >
            Remover
          </Button>
          <Button variant="secondary" onClick={() => modal.onClose()}>
            Cancelar
          </Button>
        </div>
      ),
    });
  };

  return (
    <div className="flex p-4 gap-12 items-center flex-wrap">
      <Button
        onClick={handleRemoveProducer}
        className="flex flex-col items-center justify-center cursor-pointer hover:text-red-700"
        title="Remover produtor"
      >
        <small className="text-center font-bold">Remover</small>
        <BiTrash size={26} />
      </Button>
      <Link
        href={`/producers/edit/${id}`}
        className="flex flex-col items-center cursor-pointer hover:text-green-700"
        title="Editar produtor"
      >
        <small className="text-center font-bold">Editar</small>
        <BiEdit size={26} />
      </Link>
    </div>
  );
};

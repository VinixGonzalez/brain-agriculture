import { ProducerType } from "@/schemas/producerSchema";
import { getBaseUrl } from "@/utils";

export const ProducerService = {
  getProducer: async (id: string) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/producers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar o produtor");
    }

    const data = await response.json();
    return data;
  },

  getProducersList: async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/producers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar a lista de produtores");
    }

    const data = await response.json();
    return data;
  },

  createProducer: async (producer: ProducerType) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/producers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producer),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar o produtor");
    }

    const result = await response.json();
    return result;
  },

  updateProducer: async (id: string, producer: ProducerType) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/producers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producer),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o produtor");
    }

    const result = await response.json();
    return result;
  },

  deleteProducer: async (id: string) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/producers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao remover o produtor");
    }

    const result = await response.json();
    return result;
  },
};

import { getBaseUrl } from "@/utils";

export const CropsService = {
  getCropsList: async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/crops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Ocorreu um erro ao buscar as culturas plantadas.");
    }

    const data = await response.json();
    return data;
  },
};
